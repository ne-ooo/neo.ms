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
 * Unit names compatible with the type definitions for ms@2.1.3.
 */
export type Unit =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms'

/** A supported unit in the canonical, uppercase, or lowercase form. */
export type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>

/** A duration string accepted by ms@2.1.3's public TypeScript API. */
export type StringValue =
  | `${number}`
  | `${number}${UnitAnyCase}`
  | `${number} ${UnitAnyCase}`

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
