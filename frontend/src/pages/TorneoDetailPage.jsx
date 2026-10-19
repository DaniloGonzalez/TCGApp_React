import { Link, useParams } from 'react-router'
import Hero from '../components/Hero.jsx'
import useTorneos from '../hooks/useTorneos.js'

export default function TorneoDetailPage() {
  const { id } = useParams()
  const { torneos } = useTorneos()
  const torneo = torneos.find((actual) => actual.id === id)

  if (!torneo) {
    return (
      <>
        <Hero
          title="Torneo no encontrado"
          description="El torneo solicitado no existe o fue eliminado."
        />
        <Link to="/torneos" className="main-button">
          Volver a torneos
        </Link>
      </>
    )
  }

  return (
    <>
      <Hero title={torneo.nombre} description={torneo.descripcion} />
      <section className="main-content">
        <h2 className="main-title">Información del torneo</h2>
        <ul className="main-list">
          <li>Juego: {torneo.juego}</li>
          <li>Fecha: {torneo.fecha}</li>
          <li>Formato: {torneo.formato}</li>
          <li>
            Jugadores: {torneo.inscritos} / {torneo.cupo}
          </li>
          <li>Estado: {torneo.estado}</li>
        </ul>
        <Link to="/torneos" className="main-button">
          Volver a torneos
        </Link>
      </section>
    </>
  )
}
