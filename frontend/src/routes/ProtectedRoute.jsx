import { Navigate } from 'react-router'
import useAuth from '../hooks/useAuth.js'

export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!roles.includes(user.rol)) return <Navigate to={user.rol === 'admin' ? '/admin' : '/jugador'} replace />
  return children
}
