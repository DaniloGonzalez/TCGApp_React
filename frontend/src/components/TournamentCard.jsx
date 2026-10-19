import { Link } from 'react-router'

export default function TournamentCard({ torneo, destacado = false }) {
  return (
    <article className="tournament-card">
      {destacado && <img className="tournament-image" src={torneo.imagen} alt={torneo.imagenAlt} />}
      <h2 className="card-title">{torneo.nombre}</h2>
      <p className="main-text">{torneo.descripcion}</p>
      <ul className="main-list">
        {destacado ? <><li>Fecha: {torneo.fecha}</li><li>Ubicación: {torneo.ubicacion}</li><li>Premio: {torneo.premio}</li></> : <><li>Juego: {torneo.juego}</li><li>Fecha: {torneo.fecha}</li><li>Formato: {torneo.formato}</li><li>Jugadores: {torneo.inscritos} / {torneo.cupo}</li><li>Estado: {torneo.estado}</li></>}
      </ul>
      {!destacado && <Link to={`/torneos/${torneo.id}`} className="main-button">Ver detalles</Link>}
    </article>
  )
}
