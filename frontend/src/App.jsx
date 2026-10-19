import { Route, Routes } from 'react-router'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import RankingPage from './pages/RankingPage.jsx'
import TorneosPage from './pages/TorneosPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegistroPage from './pages/RegistroPage.jsx'
import JugadorPage from './pages/JugadorPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import TorneoDetailPage from './pages/TorneoDetailPage.jsx'
import NuevoTorneoPage from './pages/NuevoTorneoPage.jsx'
import EditarTorneoPage from './pages/EditarTorneoPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="torneos" element={<TorneosPage />} />
        <Route path="torneos/:id" element={<TorneoDetailPage />} />
        <Route path="ranking" element={<RankingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegistroPage />} />
        <Route path="jugador" element={<ProtectedRoute roles={['jugador']}><JugadorPage /></ProtectedRoute>} />
        <Route path="admin" element={<ProtectedRoute roles={['admin']}><AdminPage /></ProtectedRoute>} />
        <Route path="admin/torneos/nuevo" element={<ProtectedRoute roles={['admin']}><NuevoTorneoPage /></ProtectedRoute>} />
        <Route path="admin/torneos/:id/editar" element={<ProtectedRoute roles={['admin']}><EditarTorneoPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
