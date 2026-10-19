import { Outlet } from 'react-router'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main id="contenido-principal"><Outlet /></main>
      <Footer />
    </>
  )
}
