import { describe, expect, it } from 'vitest'
import originalMs from 'ms'
import neoMs from '../../src/ms.js'

describe('ms@2.1.3 runtime compatibility', () => {
  it('matches the empty-string error behavior', () => {
    expect(() => neoMs('')).toThrowError(
      'val is not a non-empty string or a valid number. val=""'
    )
    expect(() => originalMs('')).toThrowError(
      'val is not a non-empty string or a valid number. val=""'
    )
  })

  it('matches null option normalization', () => {
    expect(neoMs(60_000, null as any)).toBe(
      (originalMs as any)(60_000, null)
    )
  })
})
