import { describe, bench } from 'vitest'
import neoMs from '../../src/ms.js'
import originalMs from 'ms'

describe('Parsing Performance - Short Strings', () => {
  bench('neo.ms parse("1h")', () => {
    neoMs('1h')
  })

  bench('original ms("1h")', () => {
    originalMs('1h')
  })
})

describe('Parsing Performance - Long Strings', () => {
  bench('neo.ms parse("2 days")', () => {
    neoMs('2 days')
  })

  bench('original ms("2 days")', () => {
    originalMs('2 days')
  })
})

describe('Parsing Performance - Multiple Units', () => {
  const inputs = ['10m', '30s', '100ms', '1h', '2 days', '1 week']

  for (const input of inputs) {
    bench(`neo.ms parse("${input}")`, () => {
      neoMs(input)
    })

    bench(`original ms("${input}")`, () => {
      originalMs(input)
    })
  }
})
