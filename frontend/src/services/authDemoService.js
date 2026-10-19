import { usuariosDemo } from '../data/usuariosDemo.js'

export function autenticar(email, password) {
  const usuario = usuariosDemo.find((actual) => actual.email === email && actual.password === password)
  if (!usuario) return null
  const { password: _, ...perfil } = usuario
  return perfil
}
