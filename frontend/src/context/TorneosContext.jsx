import { useMemo, useState } from 'react'
import { actualizarTorneo, crearTorneo, eliminarTorneo, obtenerTorneos } from '../services/torneosService.js'
import { TorneosContext } from './torneosContext.js'

export function TorneosProvider({ children }) {
  const [torneos, setTorneos] = useState(obtenerTorneos)

  function crear(datos) {
    const torneo = crearTorneo(datos)
    if (torneo) setTorneos((actuales) => [...actuales, torneo])
    return torneo
  }

  function actualizar(id, datos) {
    const torneo = actualizarTorneo(id, datos)
    if (torneo) setTorneos((actuales) => actuales.map((actual) => (actual.id === id ? torneo : actual)))
    return torneo
  }

  function eliminar(id) {
    if (!eliminarTorneo(id)) return false
    setTorneos((actuales) => actuales.filter((torneo) => torneo.id !== id))
    return true
  }

  const value = useMemo(() => ({ torneos, crear, actualizar, eliminar }), [torneos])
  return <TorneosContext.Provider value={value}>{children}</TorneosContext.Provider>
}
