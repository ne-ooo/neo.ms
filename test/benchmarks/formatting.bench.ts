import { afterAll, bench, describe } from 'vitest'
import { createRequire } from 'node:module'

interface MsFunction {
  (value: string): number | undefined
  (value: number, options?: { long?: boolean }): string
}

const require = createRequire(import.meta.url)
const neoMs = require('../..') as MsFunction
const originalMs = require('ms') as MsFunction

let benchmarkResult: unknown

afterAll(() => {
  if (benchmarkResult === undefined) {
    throw new Error('The formatting benchmarks did not produce a result')
  }
})

describe('Formatting Performance - Short Format', () => {
  bench('neo.ms format(60000)', () => {
    benchmarkResult = neoMs(60000)
  })

  bench('original ms(60000)', () => {
    benchmarkResult = originalMs(60000)
  })
})

describe('Formatting Performance - Long Format', () => {
  bench('neo.ms format(60000, { long: true })', () => {
    benchmarkResult = neoMs(60000, { long: true })
  })

  bench('original ms(60000, { long: true })', () => {
    benchmarkResult = originalMs(60000, { long: true })
  })
})

describe('Formatting Performance - Various Inputs', () => {
  const inputs = [100, 1000, 30000, 600000, 3600000, 172800000]

  for (const input of inputs) {
    bench(`neo.ms format(${input})`, () => {
      benchmarkResult = neoMs(input)
    })

    bench(`original ms(${input})`, () => {
      benchmarkResult = originalMs(input)
    })
  }
})

describe('Formatting Performance - Various Inputs (Long)', () => {
  const inputs = [100, 1000, 30000, 600000, 3600000, 172800000]

  for (const input of inputs) {
    bench(`neo.ms format(${input}, { long: true })`, () => {
      benchmarkResult = neoMs(input, { long: true })
    })

    bench(`original ms(${input}, { long: true })`, () => {
      benchmarkResult = originalMs(input, { long: true })
    })
  }
})
