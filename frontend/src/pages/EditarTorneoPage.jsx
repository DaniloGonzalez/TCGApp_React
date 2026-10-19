import { Link, useNavigate, useParams } from 'react-router'
import Hero from '../components/Hero.jsx'
import TorneoForm from '../components/TorneoForm.jsx'
import useTorneos from '../hooks/useTorneos.js'

export default function EditarTorneoPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { torneos, actualizar } = useTorneos()
  const torneo = torneos.find((actual) => actual.id === id)

  if (!torneo) {
    return (
      <>
        <Hero
          title="Torneo no encontrado"
          description="No es posible editar un torneo inexistente."
        />
        <Link to="/admin" className="main-button">
          Volver al panel
        </Link>
      </>
    )
  }

  function guardar(datos) {
    if (actualizar(id, datos)) {
      navigate('/admin')
    }
  }

  return (
    <>
      <Hero
        title="Editar torneo"
        description={`Modifica los datos de ${torneo.nombre}.`}
      />
      <section className="form-content">
        <h2>Datos del torneo</h2>
        <TorneoForm
          torneoInicial={torneo}
          onSave={guardar}
          submitText="Guardar cambios"
        />
      </section>
    </>
  )
}
