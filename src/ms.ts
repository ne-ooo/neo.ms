/**
 * Main ms() function entry point
 *
 * API behavior tested against ms@2.1.3.
 *
 * @packageDocumentation
 */

import { parse } from './parsers/parse.js'
import { format } from './formatters/format.js'
import { createInvalidValueError } from './utils/errors.js'
import type { FormatOptions, StringValue } from './types.js'

/**
 * Parse or format time values
 *
 * This is the main ms() function that matches the original ms package API.
 * Its tested behavior matches ms@2.1.3.
 *
 * **String input**: Parses time string to milliseconds
 * **Number input**: Formats milliseconds to time string
 *
 * @param value - String to parse or number to format
 * @param options - Format options (for number inputs only)
 * @returns Milliseconds (if string input) or formatted string (if number input)
 * @throws {Error} If input is not a non-empty string or valid number
 *
 * @example
 * ```ts
 * // Parse string to milliseconds
 * ms('2 days')  // 172800000
 * ms('1h')      // 3600000
 * ms('100')     // 100
 * ms('-3 days') // -259200000
 *
 * // Format milliseconds to string
 * ms(60000)                    // "1m"
 * ms(60000, { long: true })    // "1 minute"
 * ms(-3 * 60000)               // "-3m"
 * ms(-3 * 60000, { long: true }) // "-3 minutes"
 * ```
 *
 * Supported units for parsing:
 * - Years: years, year, yrs, yr, y
 * - Weeks: weeks, week, w
 * - Days: days, day, d
 * - Hours: hours, hour, hrs, hr, h
 * - Minutes: minutes, minute, mins, min, m
 * - Seconds: seconds, second, secs, sec, s
 * - Milliseconds: milliseconds, millisecond, msecs, msec, ms
 */
export default function ms(value: StringValue): number
export default function ms(value: string): number | undefined
export default function ms(value: number, options?: FormatOptions): string
export default function ms(
  value: string | number,
  options?: FormatOptions
): number | string | undefined {
  const type = typeof value

  // String input: match ms@2.1.3 by rejecting empty strings at this boundary.
  if (type === 'string' && (value as string).length > 0) {
    return parse(value as string)
  }

  // Number input: format validates that the number is finite.
  if (type === 'number') {
    // ms@2.1.3 treats all falsy option values, including null, as defaults.
    return format(value as number, options || {})
  }

  // Invalid input
  throw createInvalidValueError(value)
}
