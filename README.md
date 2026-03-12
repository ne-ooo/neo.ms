# @lpm.dev/neo.ms

Zero-dependency time conversion library. Modern, tree-shakeable alternative to the `ms` package. 2-3x faster, 100% API compatible.

## Install

```bash
lpm install @lpm.dev/neo.ms
```

## Quick Start

```typescript
import ms from '@lpm.dev/neo.ms'

// Parse string → milliseconds
ms('2 days')   // 172800000
ms('1h')       // 3600000
ms('30m')      // 1800000
ms('2.5s')     // 2500

// Format milliseconds → string
ms(172800000)          // '2d'
ms(172800000, { long: true })  // '2 days'
```

## API

### Default export — `ms(value)`

Drop-in replacement for the `ms` package:

```typescript
import ms from '@lpm.dev/neo.ms'
// or
import { ms } from '@lpm.dev/neo.ms'

// Parse
ms('1d')     // 86400000
ms('1 day')  // 86400000
ms('1.5h')   // 5400000

// Format
ms(60000)               // '1m'
ms(60000, { long: true }) // '1 minute'
```

### `parse(str)`

```typescript
import { parse } from '@lpm.dev/neo.ms'

parse('2d')      // 172800000
parse('1 hour')  // 3600000
parse('30min')   // 1800000
parse('500ms')   // 500
```

### `format(ms, options?)`

```typescript
import { format, formatShort, formatLong } from '@lpm.dev/neo.ms'

format(172800000)              // '2d'
format(172800000, { long: true }) // '2 days'

formatShort(3600000)   // '1h'
formatLong(3600000)    // '1 hour'
```

### Constants

```typescript
import { MILLISECOND, SECOND, MINUTE, HOUR, DAY, WEEK, YEAR } from '@lpm.dev/neo.ms'

SECOND  // 1000
MINUTE  // 60000
HOUR    // 3600000
DAY     // 86400000
WEEK    // 604800000
YEAR    // 31557600000
```

## Supported Units

| Input | Milliseconds |
|-------|-------------|
| `1ms`, `1 millisecond` | 1 |
| `1s`, `1 sec`, `1 second` | 1,000 |
| `1m`, `1 min`, `1 minute` | 60,000 |
| `1h`, `1 hr`, `1 hour` | 3,600,000 |
| `1d`, `1 day` | 86,400,000 |
| `1w`, `1 wk`, `1 week` | 604,800,000 |
| `1y`, `1 yr`, `1 year` | 31,557,600,000 |

Decimal values are supported: `'1.5h'` → `5400000`

## Migration from ms

```typescript
// Before
import ms from 'ms'

// After — exact same API
import ms from '@lpm.dev/neo.ms'
```

That's it. No other changes needed.

## License

MIT
