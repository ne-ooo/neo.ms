'use strict'

const assert = require('node:assert/strict')

const ms = require('@lpm.dev/neo.ms')

assert.equal(typeof ms, 'function')
assert.equal(ms('1h'), 3_600_000)
assert.equal(ms(60_000), '1m')
assert.equal(ms(60_000, null), '1m')
assert.throws(
  () => ms(''),
  /val is not a non-empty string or a valid number\. val=""/
)

assert.equal(ms.default, ms)
assert.equal(ms.ms, ms)
assert.equal(ms.parse('2 days'), 172_800_000)
assert.equal(ms.format(3_600_000), '1h')
assert.equal(ms.HOUR, 3_600_000)
assert.throws(() => ms.format(NaN), /val=NaN/)
assert.throws(() => ms.formatShort(Infinity), /val=Infinity/)

const unsafeValue = {
  token: 'do-not-disclose',
  toJSON() {
    throw new Error('toJSON was called')
  },
}

assert.throws(() => ms(unsafeValue), /val=object/)

const msFromMain = require('../..')

assert.equal(msFromMain, ms)
