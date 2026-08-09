---
name: getting-started
description: How to use neo.ms — parse time strings to milliseconds (parse), format milliseconds to strings (format, formatShort, formatLong), backward-compatible ms() default export, time constants (MILLISECOND through YEAR), supported units and aliases, short vs long format, tree-shakeable named exports
version: "1.0.0"
globs:
  - "**/*.ts"
  - "**/*.js"
  - "**/*.tsx"
  - "**/*.jsx"
---

# Getting Started with @lpm.dev/neo.ms

## Overview

neo.ms is a zero-dependency time conversion library. It parses time strings and formats millisecond values.

The default export matches behaviors tested against `ms@2.1.3`. The package also provides TypeScript types and named ESM exports.

## Quick Start

```typescript
import ms from '@lpm.dev/neo.ms'

// Parse string → milliseconds
ms('2 days')   // 172800000
ms('1h')       // 3600000
ms('100')      // 100
ms('-3 days')  // -259200000

// Format milliseconds → string
ms(60000)                      // "1m"
ms(60000, { long: true })      // "1 minute"
ms(-3 * 60000, { long: true }) // "-3 minutes"
```

The default export is overloaded: string input → parse, number input → format. Its tested behavior matches `ms@2.1.3`.

## Named Exports (Tree-Shakeable)

```typescript
import { parse, format, formatShort, formatLong } from '@lpm.dev/neo.ms'

// parse — string to milliseconds
parse('2 days')    // 172800000
parse('1h')        // 3600000
parse('2.5h')      // 9000000
parse('-1h')       // -3600000
parse('100')       // 100 (no unit = milliseconds)
parse('invalid')   // undefined (not found)

// format — milliseconds to string (with options)
format(60000)                      // "1m"
format(60000, { long: true })      // "1 minute"

// formatShort — always short format
formatShort(172800000)  // "2d"
formatShort(3600000)    // "1h"
formatShort(60000)      // "1m"
formatShort(1000)       // "1s"
formatShort(100)        // "100ms"

// formatLong — always long format with pluralization
formatLong(172800000)   // "2 days"
formatLong(3600000)     // "1 hour"
formatLong(60000)       // "1 minute"
formatLong(1000)        // "1 second"
formatLong(100)         // "100 ms"
```

If the input is not a finite number, all formatter functions throw an `Error`.

Import only the functions that your application uses.

## Supported Units

| Unit | Short | Long | Aliases |
|------|-------|------|---------|
| Milliseconds | `ms` | `milliseconds` | `msec`, `msecs`, `millisecond` |
| Seconds | `s` | `seconds` | `sec`, `secs`, `second` |
| Minutes | `m` | `minutes` | `min`, `mins`, `minute` |
| Hours | `h` | `hours` | `hr`, `hrs`, `hour` |
| Days | `d` | `days` | `day` |
| Weeks | `w` | `weeks` | `week` |
| Years | `y` | `years` | `yr`, `yrs`, `year` |

All units are case-insensitive. Whitespace between number and unit is optional.

```typescript
parse('1h')          // 3600000
parse('1 hour')      // 3600000
parse('1 Hour')      // 3600000
parse('1  h')        // 3600000
parse('2.5 hours')   // 9000000
```

## Time Constants

```typescript
import { MILLISECOND, SECOND, MINUTE, HOUR, DAY, WEEK, YEAR } from '@lpm.dev/neo.ms'

MILLISECOND  // 1
SECOND       // 1_000
MINUTE       // 60_000
HOUR         // 3_600_000
DAY          // 86_400_000
WEEK         // 604_800_000
YEAR         // 31_557_600_000 (365.25 days)

// Useful for time math
setTimeout(cleanup, 2 * HOUR)
const maxAge = 30 * DAY
const tokenExpiry = Date.now() + 15 * MINUTE
```

## Short vs Long Format

```typescript
// Short: compact, no spaces
formatShort(172800000)  // "2d"
formatShort(5400000)    // "2h"   (rounds 1.5h → 2h)
formatShort(100)        // "100ms"

// Long: human-readable, pluralized
formatLong(172800000)   // "2 days"
formatLong(5400000)     // "2 hours"  (1.5h rounds to 2, pluralizes at ≥1.5x)
formatLong(3600000)     // "1 hour"   (singular)
formatLong(100)         // "100 ms"
```

Format picks the largest applicable unit. Only one unit is used — `90061000` formats as `"1d"`, not `"1d 1h 1m 1s"`.

## TypeScript Types

```typescript
import type { TimeUnit, FormatOptions } from '@lpm.dev/neo.ms'

// TimeUnit — all valid unit strings
type TimeUnit =
  | 'years' | 'year' | 'yrs' | 'yr' | 'y'
  | 'weeks' | 'week' | 'w'
  | 'days' | 'day' | 'd'
  | 'hours' | 'hour' | 'hrs' | 'hr' | 'h'
  | 'minutes' | 'minute' | 'mins' | 'min' | 'm'
  | 'seconds' | 'second' | 'secs' | 'sec' | 's'
  | 'milliseconds' | 'millisecond' | 'msecs' | 'msec' | 'ms'

// FormatOptions
interface FormatOptions {
  long?: boolean  // Use long format (default: false)
}
```

Valid duration strings use the `StringValue` type for compatibility with `@types/ms`:

```typescript
import ms from '@lpm.dev/neo.ms'
import type { StringValue, Unit, UnitAnyCase } from '@lpm.dev/neo.ms'

const duration: StringValue = '2 hours'
ms(duration)  // number

let uncheckedInput: string = getUserInput()
ms(uncheckedInput)  // number | undefined
```
