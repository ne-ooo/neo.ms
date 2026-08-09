import ms = require('@lpm.dev/neo.ms')

const duration: ms.StringValue = '2 HOURS'
const options: ms.FormatOptions = { long: true }

const parsedLiteral: number = ms('2h')
const parsedDuration: number = ms(duration)
const parsedNamed: number = ms.parse('2 days')
const formatted: string = ms(ms.HOUR, options)
const formattedNamed: string = ms.format(ms.HOUR)
const parsedAlias: number = ms.ms('2h')

let uncheckedInput: string = 'not a duration'
const maybeParsed: number | undefined = ms(uncheckedInput)
const maybeParsedNamed: number | undefined = ms.parse(uncheckedInput)

void [
  parsedLiteral,
  parsedDuration,
  parsedNamed,
  formatted,
  formattedNamed,
  parsedAlias,
  maybeParsed,
  maybeParsedNamed,
]
