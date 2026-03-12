/**
 * Format milliseconds to time strings
 *
 * @packageDocumentation
 */

import { SECOND, MINUTE, HOUR, DAY } from '../utils/constants.js'
import type { FormatOptions } from '../types.js'

/**
 * Format milliseconds to short string
 *
 * Returns the largest applicable unit with rounding.
 * Uses absolute value for comparison, preserves sign in output.
 *
 * @param ms - Milliseconds
 * @returns Short format string (e.g., "2d", "1h", "30m")
 *
 * @example
 * ```ts
 * formatShort(172800000)  // "2d"
 * formatShort(3600000)    // "1h"
 * formatShort(60000)      // "1m"
 * formatShort(1000)       // "1s"
 * formatShort(100)        // "100ms"
 * formatShort(-3600000)   // "-1h"
 * ```
 */
export function formatShort(ms: number): string {
  const msAbs = Math.abs(ms)

  // Check units from largest to smallest
  if (msAbs >= DAY) {
    return `${Math.round(ms / DAY)}d`
  }
  if (msAbs >= HOUR) {
    return `${Math.round(ms / HOUR)}h`
  }
  if (msAbs >= MINUTE) {
    return `${Math.round(ms / MINUTE)}m`
  }
  if (msAbs >= SECOND) {
    return `${Math.round(ms / SECOND)}s`
  }
  return `${ms}ms`
}

/**
 * Format milliseconds to long string
 *
 * Returns the largest applicable unit with pluralization.
 * Pluralization threshold is 1.5x (matches original ms package).
 *
 * @param ms - Milliseconds
 * @returns Long format string (e.g., "2 days", "1 hour", "30 minutes")
 *
 * @example
 * ```ts
 * formatLong(172800000)  // "2 days"
 * formatLong(3600000)    // "1 hour"
 * formatLong(60000)      // "1 minute"
 * formatLong(1000)       // "1 second"
 * formatLong(100)        // "100 ms"
 * formatLong(-3600000)   // "-1 hour"
 * ```
 */
export function formatLong(ms: number): string {
  const msAbs = Math.abs(ms)

  /**
   * Helper for pluralization
   * Pluralizes if absolute value >= 1.5x the unit
   */
  const plural = (
    ms: number,
    msAbs: number,
    n: number,
    name: string
  ): string => {
    const isPlural = msAbs >= n * 1.5
    return `${Math.round(ms / n)} ${name}${isPlural ? 's' : ''}`
  }

  // Check units from largest to smallest
  if (msAbs >= DAY) {
    return plural(ms, msAbs, DAY, 'day')
  }
  if (msAbs >= HOUR) {
    return plural(ms, msAbs, HOUR, 'hour')
  }
  if (msAbs >= MINUTE) {
    return plural(ms, msAbs, MINUTE, 'minute')
  }
  if (msAbs >= SECOND) {
    return plural(ms, msAbs, SECOND, 'second')
  }
  return `${ms} ms`
}

/**
 * Format milliseconds with options
 *
 * Main format function with configurable options.
 * Delegates to formatShort or formatLong based on options.
 *
 * @param ms - Milliseconds
 * @param options - Format options
 * @returns Formatted string
 *
 * @example
 * ```ts
 * format(60000)                 // "1m"
 * format(60000, { long: true }) // "1 minute"
 * format(-3600000)              // "-1h"
 * ```
 */
export function format(ms: number, options: FormatOptions = {}): string {
  return options.long ? formatLong(ms) : formatShort(ms)
}
