declare function ms(value: ms.StringValue): number
declare function ms(value: string): number | undefined
declare function ms(value: number, options?: ms.FormatOptions): string

declare namespace ms {
  interface FormatOptions {
    long?: boolean
  }

  interface Callable {
    (value: StringValue): number
    (value: string): number | undefined
    (value: number, options?: FormatOptions): string
  }

  type TimeUnit =
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

  type Unit =
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

  type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>

  type StringValue =
    | `${number}`
    | `${number}${UnitAnyCase}`
    | `${number} ${UnitAnyCase}`

  const ms: Callable

  function parse(value: StringValue): number
  function parse(value: string): number | undefined
  function format(value: number, options?: FormatOptions): string
  function formatShort(value: number): string
  function formatLong(value: number): string

  const MILLISECOND: 1
  const SECOND: number
  const MINUTE: number
  const HOUR: number
  const DAY: number
  const WEEK: number
  const YEAR: number
}

export = ms
