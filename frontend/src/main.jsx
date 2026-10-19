import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { TorneosProvider } from './context/TorneosContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './styles/global.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import TorneosPage from './pages/TorneosPage.jsx'
import TorneoDetailPage from './pages/TorneoDetailPage.jsx'
import RankingPage from './pages/RankingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegistroPage from './pages/RegistroPage.jsx'
import JugadorPage from './pages/JugadorPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import NuevoTorneoPage from './pages/NuevoTorneoPage.jsx'
import EditarTorneoPage from './pages/EditarTorneoPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TorneosProvider>
          <Navbar />
          <main id="contenido-principal">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/torneos" element={<TorneosPage />} />
              <Route path="/torneos/:id" element={<TorneoDetailPage />} />
              <Route path="/ranking" element={<RankingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />
              <Route path="/jugador" element={<ProtectedRoute roles={['jugador']}><JugadorPage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminPage /></ProtectedRoute>} />
              <Route path="/admin/torneos/nuevo" element={<ProtectedRoute roles={['admin']}><NuevoTorneoPage /></ProtectedRoute>} />
              <Route path="/admin/torneos/:id/editar" element={<ProtectedRoute roles={['admin']}><EditarTorneoPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </TorneosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
