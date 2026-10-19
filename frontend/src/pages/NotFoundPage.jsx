import { Link } from 'react-router'
import Hero from '../components/Hero.jsx'

export default function NotFoundPage() {
  return (
    <>
      <Hero
        title="Página no encontrada"
        description="La dirección que buscas no existe en TCG App."
      />
      <section className="main-content">
        <Link to="/" className="main-button">
          Volver al inicio
        </Link>
      </section>
    </>
  )
}
