import { useState } from 'react'
import Hero from '../components/Hero.jsx'
import TournamentCard from '../components/TournamentCard.jsx'
import useTorneos from '../hooks/useTorneos.js'

export default function TorneosPage() {
  const { torneos } = useTorneos()
  const [busqueda, setBusqueda] = useState('')
  const [juego, setJuego] = useState('Todos')
  const juegos = ['Todos', ...new Set(torneos.map((torneo) => torneo.juego))]
  const resultados = torneos.filter(
    (torneo) =>
      torneo.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (juego === 'Todos' || torneo.juego === juego),
  )

  return (
    <>
      <Hero
        title="Torneos"
        description="Encuentra torneos disponibles y participa con tus juegos de cartas favoritos."
      />
      <section className="filters" aria-label="Filtros de torneos">
        <label htmlFor="busqueda">Buscar torneo</label>
        <input
          id="busqueda"
          value={busqueda}
          onChange={(event) => setBusqueda(event.target.value)}
          placeholder="Nombre del torneo"
        />
        <label htmlFor="juego">Juego</label>
        <select
          id="juego"
          value={juego}
          onChange={(event) => setJuego(event.target.value)}
        >
          {juegos.map((nombre) => (
            <option key={nombre}>{nombre}</option>
          ))}
        </select>
      </section>
      <section className="main-grid" aria-labelledby="torneos-title">
        <h2 id="torneos-title" className="main-title">
          Torneos disponibles
        </h2>
        {resultados.length === 0 ? (
          <p className="main-text">No se encontraron torneos con esos filtros.</p>
        ) : (
          <div className="tournament-list">
            {resultados.map((torneo) => (
              <TournamentCard key={torneo.id} torneo={torneo} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
