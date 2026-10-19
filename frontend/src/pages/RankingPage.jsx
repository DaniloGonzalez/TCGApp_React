import Hero from '../components/Hero.jsx'
import RankingTable from '../components/RankingTable.jsx'
import { ranking } from '../data/ranking.js'

export default function RankingPage() {
  return <><Hero title="Ranking de jugadores" description="Consulta las posiciones de los mejores jugadores de TCG App." /><section className="main-content"><h2 className="main-title">Ranking general</h2><RankingTable jugadores={ranking} /></section></>
}
