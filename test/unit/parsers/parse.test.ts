import { describe, it, expect } from 'vitest'
import { parse } from '../../../src/parsers/parse.js'

describe('parse', () => {
  describe('valid inputs', () => {
    it('should parse milliseconds', () => {
      expect(parse('100ms')).toBe(100)
      expect(parse('100')).toBe(100)
    })

    it('should parse seconds - short forms', () => {
      expect(parse('1s')).toBe(1000)
      expect(parse('1sec')).toBe(1000)
      expect(parse('1secs')).toBe(1000)
    })

    it('should parse seconds - long forms', () => {
      expect(parse('1 second')).toBe(1000)
      expect(parse('1 seconds')).toBe(1000)
      expect(parse('5 seconds')).toBe(5000)
    })

    it('should parse minutes - short forms', () => {
      expect(parse('1m')).toBe(60000)
      expect(parse('1min')).toBe(60000)
      expect(parse('1mins')).toBe(60000)
    })

    it('should parse minutes - long forms', () => {
      expect(parse('1 minute')).toBe(60000)
      expect(parse('1 minutes')).toBe(60000)
      expect(parse('5 minutes')).toBe(300000)
    })

    it('should parse hours - short forms', () => {
      expect(parse('1h')).toBe(3600000)
      expect(parse('1hr')).toBe(3600000)
      expect(parse('1hrs')).toBe(3600000)
    })

    it('should parse hours - long forms', () => {
      expect(parse('1 hour')).toBe(3600000)
      expect(parse('1 hours')).toBe(3600000)
      expect(parse('10h')).toBe(36000000)
    })

    it('should parse days - short forms', () => {
      expect(parse('1d')).toBe(86400000)
      expect(parse('1day')).toBe(86400000)
      expect(parse('1days')).toBe(86400000)
    })

    it('should parse days - long forms', () => {
      expect(parse('2 days')).toBe(172800000)
      expect(parse('3 days')).toBe(259200000)
    })

    it('should parse weeks', () => {
      expect(parse('1w')).toBe(604800000)
      expect(parse('1week')).toBe(604800000)
      expect(parse('2 weeks')).toBe(1209600000)
    })

    it('should parse years', () => {
      expect(parse('1y')).toBe(31557600000)
      expect(parse('1yr')).toBe(31557600000)
      expect(parse('1yrs')).toBe(31557600000)
      expect(parse('1 year')).toBe(31557600000)
      expect(parse('1 years')).toBe(31557600000)
    })

    it('should handle negative values', () => {
      expect(parse('-1h')).toBe(-3600000)
      expect(parse('-3 days')).toBe(-259200000)
      expect(parse('-200')).toBe(-200)
      expect(parse('-1m')).toBe(-60000)
    })

    it('should handle decimal values', () => {
      expect(parse('2.5h')).toBe(9000000)
      expect(parse('2.5 hrs')).toBe(9000000)
      expect(parse('0.5d')).toBe(43200000)
      expect(parse('1.5 days')).toBe(129600000)
    })

    it('should handle case insensitivity', () => {
      expect(parse('1H')).toBe(3600000)
      expect(parse('1 HOUR')).toBe(3600000)
      expect(parse('2 DAYS')).toBe(172800000)
      expect(parse('1M')).toBe(60000)
    })

    it('should handle whitespace variations', () => {
      expect(parse('1 h')).toBe(3600000)
      expect(parse('2  days')).toBe(172800000)
      expect(parse('1  m')).toBe(60000)
    })

    it('should handle no unit (defaults to milliseconds)', () => {
      expect(parse('100')).toBe(100)
      expect(parse('1000')).toBe(1000)
      expect(parse('-500')).toBe(-500)
    })
  })

  describe('invalid inputs', () => {
    it('should return undefined for empty string', () => {
      expect(parse('')).toBeUndefined()
    })

    it('should return undefined for non-string input', () => {
      expect(parse(123 as any)).toBeUndefined()
      expect(parse(null as any)).toBeUndefined()
      expect(parse(undefined as any)).toBeUndefined()
      expect(parse({} as any)).toBeUndefined()
      expect(parse([] as any)).toBeUndefined()
    })

    it('should return undefined for invalid format', () => {
      expect(parse('invalid')).toBeUndefined()
      expect(parse('1x')).toBeUndefined()
      expect(parse('foo')).toBeUndefined()
      expect(parse('hello world')).toBeUndefined()
    })

    it('should return undefined for strings > 100 chars', () => {
      const longString = '1'.repeat(101) + 'ms'
      expect(parse(longString)).toBeUndefined()
    })

    it('should return undefined for invalid unit', () => {
      expect(parse('1 fortnight')).toBeUndefined()
      expect(parse('1 millisec')).toBeUndefined()  // Not a recognized abbreviation
    })
  })

  describe('edge cases', () => {
    it('should handle zero', () => {
      expect(parse('0')).toBe(0)
      expect(parse('0ms')).toBe(0)
      expect(parse('0s')).toBe(0)
    })

    it('should handle very small decimals', () => {
      expect(parse('0.1s')).toBe(100)
      expect(parse('0.5m')).toBe(30000)
    })

    it('should handle very large values', () => {
      expect(parse('100y')).toBe(3155760000000)
      expect(parse('1000d')).toBe(86400000000)
    })
  })
})
