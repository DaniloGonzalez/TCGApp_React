import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { TorneosProvider } from './context/TorneosContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider><TorneosProvider><App /></TorneosProvider></AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
