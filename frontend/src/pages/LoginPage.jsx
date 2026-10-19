import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Hero from '../components/Hero.jsx'
import useAuth from '../hooks/useAuth.js'
import { autenticar } from '../services/authDemoService.js'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  function handleSubmit(event) {
    event.preventDefault()
    const user = autenticar(email, password)
    if (!user) { setError('Correo o contraseña incorrectos.'); return }
    login(user)
    navigate(user.rol === 'admin' ? '/admin' : '/jugador')
  }
  return <><Hero title="Iniciar sesión" description="Accede con una de las cuentas de demostración." /><section className="form-content"><h2>Acceso de demostración</h2><form onSubmit={handleSubmit}><label htmlFor="login-email">Correo electrónico</label><input id="login-email" type="email" required value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} /><label htmlFor="login-password">Contraseña</label><input id="login-password" type="password" required value={password} onChange={(event) => { setPassword(event.target.value); setError('') }} /><button className="main-button" type="submit">Ingresar</button>{error && <p className="form-error" role="alert">{error}</p>}</form><p className="main-text">Administrador: admin@tcgapp.cl / admin123</p><p className="main-text">Jugador: user@tcgapp.cl / user123</p><Link to="/registro">Ir al registro</Link></section></>
}
