import { describe, expect, it } from 'vitest'
import ms from '../../../src/ms.js'
import { formatShort } from '../../../src/formatters/format.js'

describe('safe invalid-value errors', () => {
  it('does not serialize object contents', () => {
    const input = { token: 'do-not-disclose' }

    expect(() => ms(input as any)).toThrow('val=object')

    try {
      ms(input as any)
    } catch (error) {
      expect((error as Error).message).not.toContain(input.token)
    }
  })

  it('does not call toJSON or property getters', () => {
    let propertyRead = false
    const input = {
      toJSON(): never {
        throw new Error('toJSON was called')
      },
      get secret(): never {
        propertyRead = true
        throw new Error('secret was read')
      },
    }

    expect(() => ms(input as any)).toThrow('val=object')
    expect(() => formatShort(input as any)).toThrow('val=object')
    expect(propertyRead).toBe(false)
  })

  it('handles circular objects, revoked proxies, and BigInts', () => {
    const circular: Record<string, unknown> = {}
    circular.self = circular

    const { proxy, revoke } = Proxy.revocable({}, {})
    revoke()

    expect(() => ms(circular as any)).toThrow('val=object')
    expect(() => ms(proxy as any)).toThrow('val=object')
    expect(() => ms(1n as any)).toThrow('val=bigint')
  })
})
