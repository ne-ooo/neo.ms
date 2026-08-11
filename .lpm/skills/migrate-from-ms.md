---
name: migrate-from-ms
description: Migration guide from ms to neo.ms with compatible APIs, named exports, time constants, TypeScript declarations, and ESM support
version: "1.1.0"
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
| **Benchmarks** | Reference implementation | Results depend on the operation and runtime |
| **Output** | CommonJS | ESM and CommonJS |
| **TypeScript** | Requires `@types/ms` | Built-in, strict |
| **ESM** | CommonJS only | ESM + CJS |
| **Tree-shaking** | Not possible | Yes (parse/format separately) |
| **Constants** | Not exported | HOUR, DAY, WEEK, YEAR exported |
| **Dependencies** | Zero | Zero |
| **API** | Baseline | Matches the tested `ms@2.1.3` behavior |

## Replace the Default Import

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

The tested `ms@2.1.3` inputs and outputs are identical. Check application-specific cases before migration.

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
// Import only the functions that your application uses
import { parse } from '@lpm.dev/neo.ms'

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

Constants give names to time values and reduce repeated numeric values.

## New: TypeScript Types

```typescript
// ms requires a separate @types/ms dependency
// neo.ms: types are built-in

import ms, { parse, format } from '@lpm.dev/neo.ms'
import type { TimeUnit, FormatOptions } from '@lpm.dev/neo.ms'

// Overloaded signatures for ms()
ms('2h')                    // → number (valid StringValue)
ms(7200000)                 // → string
ms(7200000, { long: true }) // → string

let uncheckedInput: string = getUserInput()
ms(uncheckedInput)          // → number | undefined
```

## Search-and-Replace Migration

```typescript
// Step 1: Replace import
// FROM:
import ms from 'ms'
// TO:
import ms from '@lpm.dev/neo.ms'

// Step 2: Run your application tests

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
- [ ] Run application tests for inputs that are not in this guide
