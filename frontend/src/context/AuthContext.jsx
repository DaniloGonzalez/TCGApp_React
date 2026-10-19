import { useMemo, useState } from 'react'
import { AuthContext } from './authContext.js'

const STORAGE_KEY = 'tcgapp.demo.user'
function leerSesion() {
  try {
    const perfil = JSON.parse(sessionStorage.getItem(STORAGE_KEY))
    return perfil && ['admin', 'jugador'].includes(perfil.rol) ? perfil : null
  } catch { return null }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(leerSesion)
  function login(perfil) {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(perfil)) } catch { /* La sesión sigue funcionando mientras la pestaña esté abierta. */ }
    setUser(perfil)
  }
  function logout() {
    try { sessionStorage.removeItem(STORAGE_KEY) } catch { /* No hay almacenamiento disponible. */ }
    setUser(null)
  }
  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
