import { describe, it, expect } from 'vitest'
import { assertNever } from './assertNever'

describe('assertNever', () => {
  it('should throw an error with the expected message', () => {
    expect(() => assertNever('test' as never)).toThrowError('Unexpected object: test')
  })

  it('should throw an error for any value passed', () => {
    expect(() => assertNever(42 as never)).toThrowError('Unexpected object: 42')
    expect(() => assertNever(null as never)).toThrowError('Unexpected object: null')
    expect(() => assertNever(undefined as never)).toThrowError('Unexpected object: undefined')
  })
})