import { describe, expect, it } from 'vitest'
import { autenticar } from '../services/authDemoService.js'

describe('autenticar', () => {
  it('reconoce la cuenta de administrador', () => {
    expect(autenticar('admin@tcgapp.cl', 'admin123')).toMatchObject({ rol: 'admin' })
  })

  it('reconoce la cuenta de jugador', () => {
    expect(autenticar('user@tcgapp.cl', 'user123')).toMatchObject({ rol: 'jugador' })
  })

  it('devuelve null con una contraseña incorrecta', () => {
    expect(autenticar('user@tcgapp.cl', 'error')).toBeNull()
  })
})
