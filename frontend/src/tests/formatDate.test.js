import { describe, expect, it } from 'vitest'
import { formatDate } from '../utils/formatDate.js'

describe('formatDate', () => {
  it('cambia una fecha ISO a formato día/mes/año', () => {
    expect(formatDate('2026-09-15')).toBe('15/09/2026')
  })

  it('devuelve el texto original si no es una fecha ISO', () => {
    expect(formatDate('15/09/2026')).toBe('15/09/2026')
  })
})
