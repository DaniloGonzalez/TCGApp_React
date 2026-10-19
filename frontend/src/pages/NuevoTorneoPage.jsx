import { useNavigate } from 'react-router'
import Hero from '../components/Hero.jsx'
import TorneoForm from '../components/TorneoForm.jsx'
import useTorneos from '../hooks/useTorneos.js'

export default function NuevoTorneoPage() {
  const { crear } = useTorneos()
  const navigate = useNavigate()

  function guardar(datos) {
    const torneo = crear(datos)
    if (torneo) navigate('/admin')
  }

  return (
    <>
      <Hero
        title="Crear torneo"
        description="Agrega un torneo a la lista local de TCG App."
      />
      <section className="form-content">
        <h2>Datos del torneo</h2>
        <TorneoForm onSave={guardar} submitText="Crear torneo" />
      </section>
    </>
  )
}
