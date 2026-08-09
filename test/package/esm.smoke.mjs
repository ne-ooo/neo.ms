import assert from 'node:assert/strict'
import ms, {
  HOUR,
  format,
  formatLong,
  formatShort,
  parse,
} from '@lpm.dev/neo.ms'

assert.equal(ms('2h'), 2 * HOUR)
assert.equal(parse('30m'), 1_800_000)
assert.equal(format(HOUR), '1h')
assert.equal(formatLong(HOUR), '1 hour')
assert.equal(formatShort(HOUR), '1h')

assert.throws(() => format(NaN), /val=NaN/)
assert.throws(() => formatLong(Infinity), /val=Infinity/)
assert.throws(() => formatShort(-Infinity), /val=-Infinity/)

const unsafeValue = {
  token: 'do-not-disclose',
  toJSON() {
    throw new Error('toJSON was called')
  },
}

let invalidValueError
try {
  ms(unsafeValue)
} catch (error) {
  invalidValueError = error
}

assert.ok(invalidValueError instanceof Error)
assert.match(invalidValueError.message, /val=object/)
assert.doesNotMatch(invalidValueError.message, /do-not-disclose/)
