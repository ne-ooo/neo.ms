import { describe, it, expect } from 'vitest'
import { formatShort, formatLong, format } from '../../../src/formatters/format.js'

describe('formatShort', () => {
  describe('days', () => {
    it('should format days', () => {
      expect(formatShort(86400000)).toBe('1d')
      expect(formatShort(172800000)).toBe('2d')
      expect(formatShort(259200000)).toBe('3d')
    })

    it('should use days for values >= 1 day', () => {
      expect(formatShort(93784000)).toBe('1d')  // 26h rounds to 1d
    })
  })

  describe('hours', () => {
    it('should format hours', () => {
      expect(formatShort(3600000)).toBe('1h')
      expect(formatShort(7200000)).toBe('2h')
      expect(formatShort(36000000)).toBe('10h')
    })

    it('should use hours for values >= 1 hour', () => {
      expect(formatShort(5400000)).toBe('2h')  // 1.5h rounds to 2h
    })
  })

  describe('minutes', () => {
    it('should format minutes', () => {
      expect(formatShort(60000)).toBe('1m')
      expect(formatShort(120000)).toBe('2m')
      expect(formatShort(600000)).toBe('10m')
    })

    it('should use minutes for values >= 1 minute', () => {
      expect(formatShort(90000)).toBe('2m')  // 1.5m rounds to 2m
    })
  })

  describe('seconds', () => {
    it('should format seconds', () => {
      expect(formatShort(1000)).toBe('1s')
      expect(formatShort(2000)).toBe('2s')
      expect(formatShort(30000)).toBe('30s')
    })

    it('should use seconds for values >= 1 second', () => {
      expect(formatShort(1500)).toBe('2s')  // 1.5s rounds to 2s
    })
  })

  describe('milliseconds', () => {
    it('should format milliseconds', () => {
      expect(formatShort(1)).toBe('1ms')
      expect(formatShort(100)).toBe('100ms')
      expect(formatShort(500)).toBe('500ms')
      expect(formatShort(999)).toBe('999ms')
    })
  })

  describe('negative values', () => {
    it('should handle negative days', () => {
      expect(formatShort(-86400000)).toBe('-1d')
      expect(formatShort(-259200000)).toBe('-3d')
    })

    it('should handle negative hours', () => {
      expect(formatShort(-3600000)).toBe('-1h')
      expect(formatShort(-7200000)).toBe('-2h')
    })

    it('should handle negative minutes', () => {
      expect(formatShort(-60000)).toBe('-1m')
      expect(formatShort(-180000)).toBe('-3m')
    })

    it('should handle negative seconds', () => {
      expect(formatShort(-1000)).toBe('-1s')
      expect(formatShort(-5000)).toBe('-5s')
    })

    it('should handle negative milliseconds', () => {
      expect(formatShort(-200)).toBe('-200ms')
    })
  })

  describe('edge cases', () => {
    it('should handle zero', () => {
      expect(formatShort(0)).toBe('0ms')
    })
  })
})

describe('formatLong', () => {
  describe('days', () => {
    it('should format singular day', () => {
      expect(formatLong(86400000)).toBe('1 day')
    })

    it('should format plural days', () => {
      expect(formatLong(172800000)).toBe('2 days')
      expect(formatLong(259200000)).toBe('3 days')
    })

    it('should handle pluralization threshold (1.5x)', () => {
      expect(formatLong(86400000)).toBe('1 day')      // 1d = singular
      expect(formatLong(129600000)).toBe('2 days')    // 1.5d rounds to 2 = plural
    })
  })

  describe('hours', () => {
    it('should format singular hour', () => {
      expect(formatLong(3600000)).toBe('1 hour')
    })

    it('should format plural hours', () => {
      expect(formatLong(7200000)).toBe('2 hours')
      expect(formatLong(36000000)).toBe('10 hours')
    })

    it('should handle pluralization threshold', () => {
      expect(formatLong(3600000)).toBe('1 hour')      // 1h = singular
      expect(formatLong(5400000)).toBe('2 hours')     // 1.5h rounds to 2 = plural
    })
  })

  describe('minutes', () => {
    it('should format singular minute', () => {
      expect(formatLong(60000)).toBe('1 minute')
    })

    it('should format plural minutes', () => {
      expect(formatLong(120000)).toBe('2 minutes')
      expect(formatLong(600000)).toBe('10 minutes')
    })

    it('should handle pluralization threshold', () => {
      expect(formatLong(60000)).toBe('1 minute')      // 1m = singular
      expect(formatLong(90000)).toBe('2 minutes')     // 1.5m rounds to 2 = plural
    })
  })

  describe('seconds', () => {
    it('should format singular second', () => {
      expect(formatLong(1000)).toBe('1 second')
    })

    it('should format plural seconds', () => {
      expect(formatLong(2000)).toBe('2 seconds')
      expect(formatLong(30000)).toBe('30 seconds')
    })

    it('should handle pluralization threshold', () => {
      expect(formatLong(1000)).toBe('1 second')       // 1s = singular
      expect(formatLong(1500)).toBe('2 seconds')      // 1.5s rounds to 2 = plural
    })
  })

  describe('milliseconds', () => {
    it('should format milliseconds', () => {
      expect(formatLong(100)).toBe('100 ms')
      expect(formatLong(500)).toBe('500 ms')
      expect(formatLong(1)).toBe('1 ms')
      expect(formatLong(999)).toBe('999 ms')
    })
  })

  describe('negative values', () => {
    it('should handle negative days', () => {
      expect(formatLong(-86400000)).toBe('-1 day')
      expect(formatLong(-259200000)).toBe('-3 days')
    })

    it('should handle negative hours', () => {
      expect(formatLong(-3600000)).toBe('-1 hour')
      expect(formatLong(-7200000)).toBe('-2 hours')
    })

    it('should handle negative minutes', () => {
      expect(formatLong(-60000)).toBe('-1 minute')
      expect(formatLong(-180000)).toBe('-3 minutes')
    })

    it('should handle negative seconds', () => {
      expect(formatLong(-1000)).toBe('-1 second')
      expect(formatLong(-5000)).toBe('-5 seconds')
    })

    it('should handle negative milliseconds', () => {
      expect(formatLong(-200)).toBe('-200 ms')
    })
  })

  describe('edge cases', () => {
    it('should handle zero', () => {
      expect(formatLong(0)).toBe('0 ms')
    })
  })
})

describe('format', () => {
  it('should default to short format', () => {
    expect(format(60000)).toBe('1m')
    expect(format(3600000)).toBe('1h')
  })

  it('should use long format when specified', () => {
    expect(format(60000, { long: true })).toBe('1 minute')
    expect(format(3600000, { long: true })).toBe('1 hour')
  })

  it('should handle empty options object', () => {
    expect(format(60000, {})).toBe('1m')
  })
})

describe.each([
  ['formatShort', formatShort],
  ['formatLong', formatLong],
  ['format', format],
] as const)('%s invalid input handling', (_name, formatter) => {
  it.each([
    [NaN, 'NaN'],
    [Infinity, 'Infinity'],
    [-Infinity, '-Infinity'],
  ])('should reject %s', (value, description) => {
    expect(() => formatter(value)).toThrow(
      `val is not a non-empty string or a valid number. val=${description}`
    )
  })
})
