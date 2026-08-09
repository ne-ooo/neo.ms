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
    throw new Error('The parsing benchmarks did not produce a result')
  }
})

describe('Parsing Performance - Short Strings', () => {
  bench('neo.ms parse("1h")', () => {
    benchmarkResult = neoMs('1h')
  })

  bench('original ms("1h")', () => {
    benchmarkResult = originalMs('1h')
  })
})

describe('Parsing Performance - Long Strings', () => {
  bench('neo.ms parse("2 days")', () => {
    benchmarkResult = neoMs('2 days')
  })

  bench('original ms("2 days")', () => {
    benchmarkResult = originalMs('2 days')
  })
})

describe('Parsing Performance - Multiple Units', () => {
  const inputs = ['10m', '30s', '100ms', '1h', '2 days', '1 week']

  for (const input of inputs) {
    bench(`neo.ms parse("${input}")`, () => {
      benchmarkResult = neoMs(input)
    })

    bench(`original ms("${input}")`, () => {
      benchmarkResult = originalMs(input)
    })
  }
})
