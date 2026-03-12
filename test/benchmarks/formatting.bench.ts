import { describe, bench } from 'vitest'
import neoMs from '../../src/ms.js'
import originalMs from 'ms'

describe('Formatting Performance - Short Format', () => {
  bench('neo.ms format(60000)', () => {
    neoMs(60000)
  })

  bench('original ms(60000)', () => {
    originalMs(60000)
  })
})

describe('Formatting Performance - Long Format', () => {
  bench('neo.ms format(60000, { long: true })', () => {
    neoMs(60000, { long: true })
  })

  bench('original ms(60000, { long: true })', () => {
    originalMs(60000, { long: true })
  })
})

describe('Formatting Performance - Various Inputs', () => {
  const inputs = [100, 1000, 30000, 600000, 3600000, 172800000]

  for (const input of inputs) {
    bench(`neo.ms format(${input})`, () => {
      neoMs(input)
    })

    bench(`original ms(${input})`, () => {
      originalMs(input)
    })
  }
})

describe('Formatting Performance - Various Inputs (Long)', () => {
  const inputs = [100, 1000, 30000, 600000, 3600000, 172800000]

  for (const input of inputs) {
    bench(`neo.ms format(${input}, { long: true })`, () => {
      neoMs(input, { long: true })
    })

    bench(`original ms(${input}, { long: true })`, () => {
      originalMs(input, { long: true })
    })
  }
})
