import ms, { HOUR, format, parse } from '@lpm.dev/neo.ms'
import type {
  FormatOptions,
  StringValue,
  TimeUnit,
  Unit,
  UnitAnyCase,
} from '@lpm.dev/neo.ms'

const duration: StringValue = '2 HOURS'
const canonicalUnit: Unit = 'Hours'
const lowercaseUnit: TimeUnit = 'hours'
const anyCaseUnit: UnitAnyCase = 'HOURS'
const options: FormatOptions = { long: true }

const parsedLiteral: number = ms('2h')
const parsedDuration: number = ms(duration)
const parsedNamed: number = parse('2 days')
const formatted: string = ms(HOUR, options)
const formattedNamed: string = format(HOUR)

let uncheckedInput: string = 'not a duration'
const maybeParsed: number | undefined = ms(uncheckedInput)
const maybeParsedNamed: number | undefined = parse(uncheckedInput)

void [
  canonicalUnit,
  lowercaseUnit,
  anyCaseUnit,
  parsedLiteral,
  parsedDuration,
  parsedNamed,
  formatted,
  formattedNamed,
  maybeParsed,
  maybeParsedNamed,
]
