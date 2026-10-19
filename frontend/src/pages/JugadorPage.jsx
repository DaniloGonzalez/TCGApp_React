import { Link } from 'react-router'
import Hero from '../components/Hero.jsx'
import useAuth from '../hooks/useAuth.js'

export default function JugadorPage() {
  const { user } = useAuth()

  return (
    <>
      <Hero
        title="Perfil del jugador"
        description="Bienvenido a tu cuenta de TCG App."
      />
      <section className="main-content">
        <h2 className="main-title">Información del jugador</h2>
        <p className="main-text">Nombre: {user.nombre}</p>
        <p className="main-text">Correo: {user.email}</p>
        <p className="main-text">Rol: Jugador</p>
      </section>
      <section className="main-content">
        <h2 className="main-title">Mis opciones</h2>
        <Link to="/torneos" className="main-button">
          Ver torneos
        </Link>
        <Link to="/ranking" className="main-button">
          Ver ranking
        </Link>
      </section>
    </>
  )
}
