import { NavLink } from 'react-router'
import logo from '../assets/tcgapp_logo.png'
import { useNavigate } from 'react-router'
import useAuth from '../hooks/useAuth.js'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  function cerrarSesion() { logout(); navigate('/login') }
  return (
    <header>
      <nav className="navbar" aria-label="Navegación principal">
        <NavLink to="/" className="brand-link" aria-label="TCG App, inicio">
          <img className="logo" src={logo} alt="TCG App" />
        </NavLink>
        <ul className="nav-links">
          <li><NavLink to="/">Inicio</NavLink></li>
          <li><NavLink to="/torneos">Torneos</NavLink></li>
          <li><NavLink to="/ranking">Ranking</NavLink></li>
          {user ? <><li><NavLink to={user.rol === 'admin' ? '/admin' : '/jugador'}>Mi panel</NavLink></li><li><button className="nav-button" type="button" onClick={cerrarSesion}>Cerrar sesión</button></li></> : <><li><NavLink to="/login">Iniciar sesión</NavLink></li><li><NavLink to="/registro">Registrarse</NavLink></li></>}
        </ul>
      </nav>
    </header>
  )
}
