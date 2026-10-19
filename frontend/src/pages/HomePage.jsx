import { Link } from 'react-router'
import Hero from '../components/Hero.jsx'
import TournamentCard from '../components/TournamentCard.jsx'
import { torneosDestacados } from '../data/torneos.js'

export default function HomePage() {
  return <>
    <Hero title="Bienvenido a TCG App" description="La aplicación definitiva para los amantes de los juegos de cartas coleccionables." />
    <section className="main-content"><h2 className="main-title">Explora nuestros torneos</h2><p className="main-text">Descubre torneos, rankings y mucho más en nuestra aplicación.</p><Link to="/torneos" className="main-button">Ver torneos</Link></section>
    <section className="main-content"><h2 className="main-title">Consulta el ranking</h2><p className="main-text">Mantente al día con los mejores jugadores y sus posiciones en el ranking.</p><Link to="/ranking" className="main-button">Ver ranking</Link></section>
    <section className="main-content"><h2 className="main-title">Únete a nuestra comunidad</h2><p className="main-text">El registro y el inicio de sesión se migrarán en la siguiente etapa.</p></section>
    <section className="main-grid" aria-labelledby="destacados-title"><h2 id="destacados-title" className="main-title">Torneos destacados</h2><div className="tournament-list">{torneosDestacados.map((torneo) => <TournamentCard key={torneo.id} torneo={torneo} destacado />)}</div></section>
  </>
}
