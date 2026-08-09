/**
 * @lpm.dev/neo.ms
 *
 * Zero-dependency time conversion library
 * Modern, tree-shakeable alternative to ms package
 *
 * Features:
 * - Parse time strings to milliseconds
 * - Format milliseconds to time strings
 * - Short and long format options
 * - Tree-shakeable exports (import only what you need)
 * - TypeScript-first with strict types
 * - Zero runtime dependencies
 * - API behavior tested against ms@2.1.3
 *
 * @packageDocumentation
 */

// Default export (backward compatible with ms package)
export { default, default as ms } from './ms.js'

// Named exports (tree-shakeable)
export { parse } from './parsers/parse.js'
export { format, formatShort, formatLong } from './formatters/format.js'

// Type exports
export type {
  TimeUnit,
  Unit,
  UnitAnyCase,
  StringValue,
  FormatOptions,
} from './types.js'

// Constants (tree-shakeable)
export {
  MILLISECOND,
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  WEEK,
  YEAR,
} from './utils/constants.js'
