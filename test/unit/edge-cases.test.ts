import { describe, it, expect } from 'vitest'
import ms from '../../src/ms.js'

describe('ms() main function', () => {
  describe('string input (parsing)', () => {
    it('should parse time strings', () => {
      expect(ms('1h')).toBe(3600000)
      expect(ms('2 days')).toBe(172800000)
      expect(ms('5m')).toBe(300000)
    })

    it('should return undefined for invalid strings', () => {
      expect(ms('invalid')).toBeUndefined()
      expect(ms('foo')).toBeUndefined()
    })

    it('should return undefined for empty string', () => {
      expect(ms('')).toBeUndefined()
    })
  })

  describe('number input (formatting)', () => {
    it('should format to short string by default', () => {
      expect(ms(60000)).toBe('1m')
      expect(ms(172800000)).toBe('2d')
      expect(ms(3600000)).toBe('1h')
    })

    it('should format to long string with option', () => {
      expect(ms(60000, { long: true })).toBe('1 minute')
      expect(ms(120000, { long: true })).toBe('2 minutes')
      expect(ms(3600000, { long: true })).toBe('1 hour')
    })

    it('should handle zero', () => {
      expect(ms(0)).toBe('0ms')
      expect(ms(0, { long: true })).toBe('0 ms')
    })

    it('should handle negative values', () => {
      expect(ms(-60000)).toBe('-1m')
      expect(ms(-3600000, { long: true })).toBe('-1 hour')
    })
  })

  describe('error cases', () => {
    it('should throw error for null', () => {
      expect(() => ms(null as any)).toThrow(
        'val is not a non-empty string or a valid number'
      )
    })

    it('should throw error for undefined', () => {
      expect(() => ms(undefined as any)).toThrow(
        'val is not a non-empty string or a valid number'
      )
    })

    it('should throw error for NaN', () => {
      expect(() => ms(NaN)).toThrow(
        'val is not a non-empty string or a valid number'
      )
    })

    it('should throw error for Infinity', () => {
      expect(() => ms(Infinity)).toThrow(
        'val is not a non-empty string or a valid number'
      )
    })

    it('should throw error for -Infinity', () => {
      expect(() => ms(-Infinity)).toThrow(
        'val is not a non-empty string or a valid number'
      )
    })

    it('should throw error for object', () => {
      expect(() => ms({} as any)).toThrow(
        'val is not a non-empty string or a valid number'
      )
    })

    it('should throw error for array', () => {
      expect(() => ms([] as any)).toThrow(
        'val is not a non-empty string or a valid number'
      )
    })
  })

  describe('round-trip conversion', () => {
    it('should maintain value through parse → format → parse', () => {
      const original = '10 hours'
      const ms1 = ms(original)
      const formatted = ms(ms1!)
      const ms2 = ms(formatted)

      expect(ms1).toBe(ms2)  // Should maintain value
      expect(ms1).toBe(36000000)
    })

    it('should work with days', () => {
      const original = '2 days'
      const parsed = ms(original)
      const formatted = ms(parsed!)
      const reparsed = ms(formatted)

      expect(parsed).toBe(reparsed)
      expect(parsed).toBe(172800000)
    })
  })

  describe('type behavior', () => {
    it('should handle string numbers (parsed as ms)', () => {
      expect(ms('100')).toBe(100)
      expect(ms('1000')).toBe(1000)
      expect(ms('-500')).toBe(-500)
    })
  })
})
