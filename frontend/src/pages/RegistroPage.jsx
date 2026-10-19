import { useState } from 'react'
import { Link } from 'react-router'
import Hero from '../components/Hero.jsx'

export default function RegistroPage() {
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  function handleChange(event) {
    setDatos({ ...datos, [event.target.name]: event.target.value })
    setMensaje('')
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !datos.nombre.trim() ||
      !datos.email ||
      !datos.password ||
      !datos.confirmPassword
    ) {
      setError('Completa todos los campos.')
      return
    }

    if (datos.password !== datos.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setMensaje(
      'Validación correcta. Registro de demostración: no se ha creado una cuenta.',
    )
    setDatos({ nombre: '', email: '', password: '', confirmPassword: '' })
  }

  return (
    <>
      <Hero
        title="Crear una cuenta"
        description="Únete a la comunidad de TCG App."
      />
      <section className="form-content">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            required
            value={datos.nombre}
            onChange={handleChange}
          />
          <label htmlFor="registro-email">Correo electrónico</label>
          <input
            id="registro-email"
            name="email"
            type="email"
            required
            value={datos.email}
            onChange={handleChange}
          />
          <label htmlFor="registro-password">Contraseña</label>
          <input
            id="registro-password"
            name="password"
            type="password"
            required
            value={datos.password}
            onChange={handleChange}
          />
          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
            value={datos.confirmPassword}
            onChange={handleChange}
          />
          <button className="main-button" type="submit">
            Registrarse
          </button>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {mensaje && (
            <p className="form-success" role="status">
              {mensaje}
            </p>
          )}
        </form>
        <Link to="/login">Volver al inicio de sesión</Link>
      </section>
    </>
  )
}
