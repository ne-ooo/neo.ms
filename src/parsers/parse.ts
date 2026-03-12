/**
 * Parse time strings to milliseconds
 *
 * @packageDocumentation
 */

import {
  MILLISECOND,
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  WEEK,
  YEAR,
} from '../utils/constants.js'

/**
 * Pre-compiled regex pattern for performance
 *
 * Matches: optional negative, number (int or float), optional whitespace, optional unit
 * Pattern is case-insensitive and compiled once at module load for optimal performance.
 *
 * Examples:
 * - "100" → 100ms
 * - "2 days" → 172800000ms
 * - "-1h" → -3600000ms
 * - "2.5h" → 9000000ms
 */
const PATTERN =
  /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i

/**
 * Unit to milliseconds lookup map
 *
 * Pre-computed lookup table for O(1) unit conversion.
 * Much faster than switch statements (O(n)) from the original ms package.
 */
const UNIT_MAP: Record<string, number> = {
  // Years
  years: YEAR,
  year: YEAR,
  yrs: YEAR,
  yr: YEAR,
  y: YEAR,

  // Weeks
  weeks: WEEK,
  week: WEEK,
  w: WEEK,

  // Days
  days: DAY,
  day: DAY,
  d: DAY,

  // Hours
  hours: HOUR,
  hour: HOUR,
  hrs: HOUR,
  hr: HOUR,
  h: HOUR,

  // Minutes
  minutes: MINUTE,
  minute: MINUTE,
  mins: MINUTE,
  min: MINUTE,
  m: MINUTE,

  // Seconds
  seconds: SECOND,
  second: SECOND,
  secs: SECOND,
  sec: SECOND,
  s: SECOND,

  // Milliseconds
  milliseconds: MILLISECOND,
  millisecond: MILLISECOND,
  msecs: MILLISECOND,
  msec: MILLISECOND,
  ms: MILLISECOND,
}

/**
 * Parse time string to milliseconds
 *
 * Converts human-readable time strings into milliseconds.
 * Case-insensitive and supports decimal values.
 *
 * @param str - Time string (e.g., "2 days", "1h", "100")
 * @returns Milliseconds or undefined if invalid
 *
 * @example
 * ```ts
 * parse('2 days')  // 172800000
 * parse('1h')      // 3600000
 * parse('2.5h')    // 9000000
 * parse('100')     // 100
 * parse('-1h')     // -3600000
 * parse('invalid') // undefined
 * ```
 *
 * Supported units:
 * - Years: years, year, yrs, yr, y
 * - Weeks: weeks, week, w
 * - Days: days, day, d
 * - Hours: hours, hour, hrs, hr, h
 * - Minutes: minutes, minute, mins, min, m
 * - Seconds: seconds, second, secs, sec, s
 * - Milliseconds: milliseconds, millisecond, msecs, msec, ms
 */
export function parse(str: string): number | undefined {
  // Validation: must be a non-empty string
  if (typeof str !== 'string' || str.length === 0) {
    return undefined
  }

  // Security: Prevent DOS attacks from very long strings
  if (str.length > 100) {
    return undefined
  }

  // Match pattern
  const match = PATTERN.exec(str)
  if (!match) {
    return undefined
  }

  // Extract number and unit
  const num = parseFloat(match[1]!)
  const unit = (match[2] || 'ms').toLowerCase()

  // Look up unit multiplier (O(1) lookup vs O(n) switch)
  const multiplier = UNIT_MAP[unit]

  return multiplier !== undefined ? num * multiplier : undefined
}
