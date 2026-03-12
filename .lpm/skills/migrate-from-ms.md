---
name: migrate-from-ms
description: Migration guide from ms to neo.ms — 100% API compatible drop-in replacement, identical default export signature, same format strings and units, new tree-shakeable named exports (parse, format, formatShort, formatLong), exported time constants, TypeScript native (no @types/ms), 1.27x faster, ESM support
version: "1.0.0"
globs:
  - "**/*.ts"
  - "**/*.js"
  - "**/*.tsx"
  - "**/*.jsx"
---

# Migrating from ms to @lpm.dev/neo.ms

## Why Migrate

| | ms | neo.ms |
|---|---|--------|
| **Performance** | 9.7M ops/sec | 12.3M ops/sec (1.27x faster) |
| **Bundle** | ~2 KB | ~1 KB gzipped (48% smaller) |
| **TypeScript** | Requires `@types/ms` | Built-in, strict |
| **ESM** | CommonJS only | ESM + CJS |
| **Tree-shaking** | Not possible | Yes (parse/format separately) |
| **Constants** | Not exported | HOUR, DAY, WEEK, YEAR exported |
| **Dependencies** | Zero | Zero |
| **API** | Baseline | 100% compatible |

## Drop-In Replacement

```typescript
// Before
import ms from 'ms'

ms('2 days')                    // 172800000
ms(60000)                       // "1m"
ms(60000, { long: true })       // "1 minute"

// After — identical behavior, just change the import
import ms from '@lpm.dev/neo.ms'

ms('2 days')                    // 172800000
ms(60000)                       // "1m"
ms(60000, { long: true })       // "1 minute"
```

Every input/output is identical. No code changes needed beyond the import path.

## All Formats — Identical

```typescript
// Parsing — identical
ms('100')          // 100
ms('1s')           // 1000
ms('1m')           // 60000
ms('1h')           // 3600000
ms('1d')           // 86400000
ms('1w')           // 604800000
ms('1y')           // 31557600000
ms('2.5h')         // 9000000
ms('-3 days')      // -259200000
ms('1 hour')       // 3600000
ms('2 minutes')    // 120000

// Formatting — identical
ms(100)            // "100ms"
ms(1000)           // "1s"
ms(60000)          // "1m"
ms(3600000)        // "1h"
ms(86400000)       // "1d"

// Long format — identical
ms(100, { long: true })      // "100 ms"
ms(60000, { long: true })    // "1 minute"
ms(172800000, { long: true }) // "2 days"

// Error behavior — identical
ms('invalid')      // undefined
ms(NaN)            // throws Error
ms(Infinity)       // throws Error
```

## New: Tree-Shakeable Named Exports

```typescript
// Import only what you need — smaller bundles
import { parse } from '@lpm.dev/neo.ms'
// ~0.8 KB gzipped (parse only)

parse('2 days')    // 172800000
parse('1h')        // 3600000
parse('invalid')   // undefined

import { format, formatShort, formatLong } from '@lpm.dev/neo.ms'

format(60000)                      // "1m"
format(60000, { long: true })      // "1 minute"
formatShort(60000)                 // "1m" (skip options overhead)
formatLong(60000)                  // "1 minute" (skip options overhead)
```

## New: Time Constants

```typescript
import { MILLISECOND, SECOND, MINUTE, HOUR, DAY, WEEK, YEAR } from '@lpm.dev/neo.ms'

// Use for readable time math
const SESSION_TTL = 30 * MINUTE        // 1800000
const CACHE_MAX_AGE = 7 * DAY          // 604800000
const TOKEN_EXPIRY = Date.now() + HOUR // 1 hour from now

setTimeout(cleanup, 2 * HOUR)
setInterval(healthCheck, 30 * SECOND)
```

No more magic numbers — constants are self-documenting and typo-proof.

## New: TypeScript Types

```typescript
// ms package requires: npm install @types/ms
// neo.ms: types are built-in

import ms, { parse, format } from '@lpm.dev/neo.ms'
import type { TimeUnit, FormatOptions } from '@lpm.dev/neo.ms'

// Overloaded signatures for ms()
ms('2h')                    // → number | undefined
ms(7200000)                 // → string
ms(7200000, { long: true }) // → string
```

## Search-and-Replace Migration

```typescript
// Step 1: Replace import
// FROM:
import ms from 'ms'
// TO:
import ms from '@lpm.dev/neo.ms'

// Step 2: No other changes needed — API is 100% compatible

// Step 3 (optional): Use named exports for tree-shaking
// FROM:
const duration = ms('2h')
const label = ms(duration)
// TO:
import { parse, formatShort } from '@lpm.dev/neo.ms'
const duration = parse('2h')
const label = formatShort(duration!)
```

## Checklist

- [ ] Replace `ms` import with `@lpm.dev/neo.ms`
- [ ] Remove `@types/ms` from devDependencies (types are built-in)
- [ ] Remove `ms` from dependencies
- [ ] Consider using named exports (`parse`, `format`) for tree-shaking
- [ ] Consider using constants (`HOUR`, `DAY`) instead of magic numbers
- [ ] All existing code works unchanged — no API differences
