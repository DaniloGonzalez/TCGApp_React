import { torneos as torneosIniciales } from '../data/torneos.js'

const STORAGE_KEY = 'tcgapp.torneos'

function copiarTorneos(torneos) {
  return torneos.map((torneo) => ({ ...torneo }))
}

function guardar(torneos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(torneos))
    return true
  } catch {
    return false
  }
}

export function obtenerTorneos() {
  try {
    const guardados = localStorage.getItem(STORAGE_KEY)
    if (guardados === null) {
      const iniciales = copiarTorneos(torneosIniciales)
      guardar(iniciales)
      return iniciales
    }

    const torneos = JSON.parse(guardados)
    return Array.isArray(torneos) ? torneos : copiarTorneos(torneosIniciales)
  } catch {
    return copiarTorneos(torneosIniciales)
  }
}

export function crearTorneo(datos) {
  const torneos = obtenerTorneos()
  const nuevoTorneo = { ...datos, id: crypto.randomUUID() }
  if (!guardar([...torneos, nuevoTorneo])) return null
  return nuevoTorneo
}

export function actualizarTorneo(id, datos) {
  const torneos = obtenerTorneos()
  const existe = torneos.some((torneo) => torneo.id === id)
  if (!existe) return null

  const actualizados = torneos.map((torneo) => (torneo.id === id ? { ...datos, id } : torneo))
  return guardar(actualizados) ? actualizados.find((torneo) => torneo.id === id) : null
}

export function eliminarTorneo(id) {
  const torneos = obtenerTorneos()
  const actualizados = torneos.filter((torneo) => torneo.id !== id)
  if (actualizados.length === torneos.length) return false
  return guardar(actualizados)
}
