const INVALID_VALUE_MESSAGE =
  'val is not a non-empty string or a valid number'

function describeInvalidValue(value: unknown): string {
  if (value === null) {
    return 'null'
  }

  switch (typeof value) {
    case 'string':
      return value.length === 0 ? '""' : 'string'
    case 'number':
      if (Number.isNaN(value)) {
        return 'NaN'
      }
      if (value === Infinity) {
        return 'Infinity'
      }
      return value === -Infinity ? '-Infinity' : 'number'
    case 'undefined':
      return 'undefined'
    case 'boolean':
      return 'boolean'
    case 'bigint':
      return 'bigint'
    case 'symbol':
      return 'symbol'
    case 'function':
      return 'function'
    case 'object':
      return 'object'
  }

  return 'unknown'
}

export function createInvalidValueError(value: unknown): Error {
  return new Error(`${INVALID_VALUE_MESSAGE}. val=${describeInvalidValue(value)}`)
}

export function assertFiniteNumber(value: unknown): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw createInvalidValueError(value)
  }
}
