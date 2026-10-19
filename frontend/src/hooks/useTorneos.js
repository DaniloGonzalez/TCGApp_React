import { useContext } from 'react'
import { TorneosContext } from '../context/torneosContext.js'

export default function useTorneos() {
  const context = useContext(TorneosContext)
  if (!context) throw new Error('useTorneos debe usarse dentro de TorneosProvider.')
  return context
}
