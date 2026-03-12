/**
 * Millisecond conversion constants
 *
 * Pre-computed for performance and accuracy.
 * All time units are expressed in milliseconds.
 *
 * @packageDocumentation
 */

/**
 * Millisecond constant (1ms)
 */
export const MILLISECOND = 1

/**
 * Second constant (1000ms)
 */
export const SECOND = MILLISECOND * 1000

/**
 * Minute constant (60,000ms)
 */
export const MINUTE = SECOND * 60

/**
 * Hour constant (3,600,000ms)
 */
export const HOUR = MINUTE * 60

/**
 * Day constant (86,400,000ms)
 */
export const DAY = HOUR * 24

/**
 * Week constant (604,800,000ms)
 */
export const WEEK = DAY * 7

/**
 * Year constant (31,557,600,000ms)
 *
 * Uses 365.25 days to account for leap years, matching the original ms package.
 */
export const YEAR = DAY * 365.25
