---
name: anti-patterns
description: Common mistakes when using neo.ms — ms() throws for invalid numbers but parse returns undefined, multi-unit strings not supported, format rounds to single largest unit (precision loss), numeric strings default to milliseconds, year is 365.25 days, 100-char DOS limit, pluralization threshold is 1.5x
version: "1.1.0"
globs:
  - "**/*.ts"
  - "**/*.js"
  - "**/*.tsx"
  - "**/*.jsx"
---

# Anti-Patterns for @lpm.dev/neo.ms

### [CRITICAL] `ms()` throws for invalid numbers but `parse()` returns undefined

Wrong:

```typescript
// AI assumes ms() always returns a value or undefined
const duration = ms(userInput)  // May THROW if userInput is NaN, null, etc.
```

Correct:

```typescript
import ms from '@lpm.dev/neo.ms'

// ms() with string input → returns number | undefined (safe)
ms('invalid')   // undefined
ms('')          // throws! (empty string)

// ms() with number input → returns string (safe for finite numbers)
ms(60000)       // "1m"

// ms() with invalid input → THROWS
ms(NaN)         // throws Error
ms(Infinity)    // throws Error
ms(null as any) // throws Error
ms({} as any)   // throws Error

// Safer: use parse() directly — always returns number | undefined
import { parse } from '@lpm.dev/neo.ms'
parse('invalid')  // undefined (never throws)
parse('')         // undefined (never throws)
```

The default `ms()` function throws an Error for non-string, non-finite-number inputs. The named `parse()` function always returns `undefined` for invalid input. Use `parse()` when you can't guarantee input type.

Source: `src/ms.ts` — throws at line 70-72 for invalid input

### [CRITICAL] Multi-unit strings are NOT supported

Wrong:

```typescript
// AI tries to parse compound durations
parse('1h 30m')        // undefined — not "1 hour 30 minutes"!
parse('1d 2h 30m')     // undefined
parse('2 hours and 30 minutes')  // undefined
```

Correct:

```typescript
// Only single number + single unit
parse('1h')     // 3600000
parse('30m')    // 1800000
parse('90m')    // 5400000 — use 90 minutes instead of 1h 30m

// For multi-unit durations, parse individually and sum:
const total = (parse('1h') ?? 0) + (parse('30m') ?? 0)  // 5400000

// Or use constants for arithmetic:
import { HOUR, MINUTE } from '@lpm.dev/neo.ms'
const duration = 1 * HOUR + 30 * MINUTE  // 5400000
```

The parse regex matches exactly one number and one optional unit. Multi-unit strings, conjunctions ("and"), or compound formats are not parsed. This matches the original `ms` package behavior.

Source: `src/parsers/parse.ts` — single-match regex pattern at line 29-30

### [HIGH] Format rounds to the single largest unit — precision is lost

Wrong:

```typescript
// AI expects multi-unit output or precise conversion
import { formatShort, formatLong } from '@lpm.dev/neo.ms'

formatShort(90061000)   // "1d" — not "1d 1h 1m 1s"!
// 90061000ms = 1 day, 1 hour, 1 minute, 1 second
// But format only shows the largest unit, rounded

formatShort(89000)      // "1m" — 89 seconds rounds to 1 minute!
// 89000ms ≥ 60000ms (MINUTE), so MINUTE branch is used
// Math.round(89000 / 60000) = Math.round(1.48) = 1 → "1m"

formatShort(5400000)    // "2h" — 1.5 hours rounds to 2
```

Correct:

```typescript
// Format always picks the largest unit and rounds
formatShort(3600000)    // "1h"  (exactly 1 hour)
formatShort(5400000)    // "2h"  (1.5 hours rounds to 2)
formatShort(7200000)    // "2h"  (exactly 2 hours)

// For precise multi-unit output, build your own:
function formatPrecise(ms: number): string {
  const hours = Math.floor(ms / 3600000)
  const mins = Math.floor((ms % 3600000) / 60000)
  const secs = Math.floor((ms % 60000) / 1000)
  return `${hours}h ${mins}m ${secs}s`
}

// Or use @lpm.dev/neo.format's formatDuration for multi-unit output
```

This is by design — `ms` produces single-unit approximations, not precise breakdowns. For multi-unit formatting, use a duration formatter.

Source: `src/formatters/format.ts` — `Math.round(ms / unit)` at each branch

### [HIGH] Numeric strings default to milliseconds

Wrong:

```typescript
// AI passes a numeric string expecting seconds or other units
parse('100')    // 100 — milliseconds, not seconds!
parse('5000')   // 5000 — milliseconds
ms('1000')      // 1000 — milliseconds, not 1 second

// Common mistake: passing a stringified timestamp
const delay = ms(String(seconds))  // Wrong! Treats as milliseconds
```

Correct:

```typescript
// Numeric strings without a unit are treated as milliseconds
parse('100')      // 100ms
parse('100ms')    // 100ms (explicit — same result)
parse('100s')     // 100000ms (100 seconds)

// Always include the unit when the value isn't in milliseconds
parse('5s')       // 5000
parse('5000ms')   // 5000

// If you have seconds as a number, multiply:
const ms = seconds * 1000
```

When the regex matches a number without a unit, it defaults to milliseconds. This matches the original `ms` package behavior. Always include the unit suffix to avoid ambiguity.

Source: `src/parsers/parse.ts` — `const unit = (match[2] || 'ms').toLowerCase()` at line 132

### [MEDIUM] Year constant uses 365.25 days — not exactly 365

Wrong:

```typescript
// AI assumes 1 year = 365 days exactly
parse('1y')  // 31557600000 — NOT 31536000000 (365 * 86400000)
// Difference: 21600000ms = 6 hours

import { YEAR, DAY } from '@lpm.dev/neo.ms'
YEAR / DAY  // 365.25 — not 365!
```

Correct:

```typescript
// Year uses 365.25 days to account for leap years
import { YEAR } from '@lpm.dev/neo.ms'
YEAR  // 31557600000 (365.25 * 24 * 60 * 60 * 1000)

// For exact calendar year calculations, use date arithmetic:
const oneCalendarYear = new Date(2025, 0, 1).getTime() - new Date(2024, 0, 1).getTime()
// 31622400000 for leap year 2024 (366 days)
// 31536000000 for non-leap year 2025 (365 days)

// neo.ms years are for approximate durations, not calendar precision
```

The 365.25-day year matches the original `ms` package. This is the average Gregorian year accounting for leap years. For calendar-precise calculations, use `Date` objects.

Source: `src/utils/constants.ts` — `YEAR = DAY * 365.25`

### [MEDIUM] Long format pluralizes at 1.5x threshold

Wrong:

```typescript
// AI expects standard singular/plural boundary at 2
formatLong(86400000)     // "1 day" — as expected
formatLong(86400000 * 1.4)  // "1 day" — still singular! (1.4 < 1.5)
formatLong(86400000 * 1.5)  // "2 days" — pluralizes AND rounds up!
```

Correct:

```typescript
// Pluralization triggers at >= 1.5x the unit value
formatLong(3600000)           // "1 hour"
formatLong(3600000 * 1.49)    // "1 hour"  (rounds to 1, singular)
formatLong(3600000 * 1.5)     // "2 hours" (rounds to 2, plural)
formatLong(3600000 * 2)       // "2 hours"

// The threshold affects both the number (Math.round) and plural suffix
// 1.5 hours → Math.round(1.5) = 2 → "2 hours" (plural because >= 1.5x)
// 1.4 hours → Math.round(1.4) = 1 → "1 hour" (singular because < 1.5x)
```

The `formatLong` function uses `msAbs >= n * 1.5` to decide pluralization. This means values between 1.0x and 1.49x show as singular even though `Math.round` might round them to 1. This matches the original `ms` package behavior.

Source: `src/formatters/format.ts` — `const isPlural = msAbs >= n * 1.5` at line 80

### [MEDIUM] Strings longer than 100 characters return undefined (DOS protection)

Wrong:

```typescript
// AI generates a very long time string
const longUnit = '1 ' + 'milliseconds'.repeat(10)
parse(longUnit)  // undefined — silently rejected!
```

Correct:

```typescript
// Strings > 100 characters are rejected as a DOS protection
parse('1 hour')        // 3600000 (fine)
parse('a'.repeat(101)) // undefined (too long)

// This is a security measure — the regex could be slow on very long strings
// In practice, valid time strings are always short
// If you need to validate, check length first:
if (input.length <= 100) {
  const ms = parse(input)
}
```

The 100-character limit prevents regex denial-of-service attacks. All valid time strings are well under this limit. The rejection is silent (returns `undefined`), not an error.

Source: `src/parsers/parse.ts` — `if (str.length > 100) return undefined` at line 120-122
