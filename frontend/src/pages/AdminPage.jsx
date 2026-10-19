import { Link } from 'react-router'
import Hero from '../components/Hero.jsx'
import useAuth from '../hooks/useAuth.js'
import useTorneos from '../hooks/useTorneos.js'
import { formatDate } from '../utils/formatDate.js'

export default function AdminPage() {
  const { user } = useAuth()
  const { torneos, eliminar } = useTorneos()
  function handleEliminar(torneo) {
    if (window.confirm(`¿Eliminar el torneo ${torneo.nombre}?`)) eliminar(torneo.id)
  }
  return <><Hero title="Panel de administración" description="Gestiona los torneos de TCG App." /><section className="main-content"><h2 className="main-title">{user.nombre}</h2><p className="main-text">Correo: {user.email}</p><p className="main-text">Rol: Administrador</p></section><section className="main-content"><h2 className="main-title">Torneos</h2><Link to="/admin/torneos/nuevo" className="main-button">Crear torneo</Link><div className="admin-list">{torneos.map((torneo) => <article key={torneo.id} className="admin-tournament"><div><strong>{torneo.nombre}</strong><span>{torneo.juego} · {formatDate(torneo.fecha)}</span></div><div><Link to={`/admin/torneos/${torneo.id}/editar`} className="text-button">Editar</Link><button className="text-button danger-button" type="button" onClick={() => handleEliminar(torneo)}>Eliminar</button></div></article>)}</div></section></>
}
