export default function RankingTable({ jugadores }) {
  return (
    <div className="table-container">
      <table className="ranking-table">
        <caption>Clasificación general de jugadores</caption>
        <thead>
          <tr>
            <th scope="col">Posición</th>
            <th scope="col">Jugador</th>
            <th scope="col">Victorias</th>
            <th scope="col">Derrotas</th>
            <th scope="col">Puntos</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((jugador) => (
            <tr key={jugador.id}>
              <th scope="row">{jugador.posicion}</th>
              <td>{jugador.nombre}</td>
              <td>{jugador.victorias}</td>
              <td>{jugador.derrotas}</td>
              <td>{jugador.puntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
