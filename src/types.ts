/**
 * Type definitions for @lpm.dev/neo.ms
 *
 * @packageDocumentation
 */

/**
 * Time unit literal types for strict type safety
 *
 * Represents all supported time unit abbreviations and full names.
 */
export type TimeUnit =
  | 'years'
  | 'year'
  | 'yrs'
  | 'yr'
  | 'y'
  | 'weeks'
  | 'week'
  | 'w'
  | 'days'
  | 'day'
  | 'd'
  | 'hours'
  | 'hour'
  | 'hrs'
  | 'hr'
  | 'h'
  | 'minutes'
  | 'minute'
  | 'mins'
  | 'min'
  | 'm'
  | 'seconds'
  | 'second'
  | 'secs'
  | 'sec'
  | 's'
  | 'milliseconds'
  | 'millisecond'
  | 'msecs'
  | 'msec'
  | 'ms'

/**
 * Format options for ms() function
 */
export interface FormatOptions {
  /**
   * Use long format (e.g., "1 minute" vs "1m")
   *
   * @default false
   * @example
   * ```ts
   * ms(60000)                 // "1m"
   * ms(60000, { long: true }) // "1 minute"
   * ```
   */
  long?: boolean
}
