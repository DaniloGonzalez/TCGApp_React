import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { actualizarTorneo, crearTorneo, eliminarTorneo, obtenerTorneos } from '../services/torneosService.js'

const torneoNuevo = { nombre: 'Torneo de prueba', descripcion: 'Descripción de prueba', juego: 'Pokemon TCG', fecha: '2026-12-01', formato: 'Standard', inscritos: 0, cupo: 16, estado: 'Próximamente' }

describe('torneosService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('id-de-prueba')
  })

  afterEach(() => vi.restoreAllMocks())

  it('carga los torneos iniciales si el almacenamiento está vacío', () => {
    expect(obtenerTorneos()).toHaveLength(3)
  })

  it('crea un torneo y lo guarda localmente', () => {
    crearTorneo(torneoNuevo)
    expect(obtenerTorneos()).toContainEqual(expect.objectContaining({ id: 'id-de-prueba', nombre: 'Torneo de prueba' }))
  })

  it('actualiza un torneo existente', () => {
    const creado = crearTorneo(torneoNuevo)
    actualizarTorneo(creado.id, { ...creado, nombre: 'Torneo actualizado' })
    expect(obtenerTorneos()).toContainEqual(expect.objectContaining({ id: creado.id, nombre: 'Torneo actualizado' }))
  })

  it('elimina un torneo existente', () => {
    const creado = crearTorneo(torneoNuevo)
    eliminarTorneo(creado.id)
    expect(obtenerTorneos()).not.toContainEqual(expect.objectContaining({ id: creado.id }))
  })
})
