import { useState } from 'react'

const vacio = {
  nombre: '',
  descripcion: '',
  juego: '',
  fecha: '',
  formato: 'Standard',
  inscritos: 0,
  cupo: 16,
  estado: 'Inscripciones abiertas'
}

export default function TorneoForm({ torneoInicial = vacio, onSave, submitText }) {
  const [datos, setDatos] = useState(torneoInicial)
  const [error, setError] = useState('')
  function change(event) {
    setDatos({ ...datos, [event.target.name]: event.target.value })
    setError('')
  }

  function submit(event) {
    event.preventDefault()
    const inscritos = Number(datos.inscritos)
    const cupo = Number(datos.cupo)

    if (
      !datos.nombre.trim() ||
      !datos.descripcion.trim() ||
      !datos.juego.trim() ||
      !datos.fecha ||
      !datos.formato.trim()
    ) {
      setError('Completa todos los campos del torneo.')
      return
    }

    if (
      !Number.isInteger(cupo) ||
      cupo < 1 ||
      !Number.isInteger(inscritos) ||
      inscritos < 0 ||
      inscritos > cupo
    ) {
      setError('El cupo debe ser mayor que cero y los inscritos deben estar entre cero y el cupo.')
      return
    }

    onSave({
      ...datos,
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      juego: datos.juego.trim(),
      formato: datos.formato.trim(),
      inscritos,
      cupo
    })
  }

  return (
    <form className="torneo-form" onSubmit={submit}>
      <label htmlFor="nombre-torneo">Nombre</label>
      <input
        id="nombre-torneo"
        name="nombre"
        value={datos.nombre}
        onChange={change}
        required
      />

      <label htmlFor="descripcion">Descripción</label>
      <textarea
        id="descripcion"
        name="descripcion"
        value={datos.descripcion}
        onChange={change}
        required
      />

      <label htmlFor="juego-torneo">Juego</label>
      <input
        id="juego-torneo"
        name="juego"
        value={datos.juego}
        onChange={change}
        required
      />

      <label htmlFor="fecha-torneo">Fecha</label>
      <input
        id="fecha-torneo"
        name="fecha"
        placeholder="DD/MM/AAAA"
        value={datos.fecha}
        onChange={change}
        required
      />

      <label htmlFor="formato">Formato</label>
      <input
        id="formato"
        name="formato"
        value={datos.formato}
        onChange={change}
        required
      />

      <label htmlFor="inscritos">Jugadores inscritos</label>
      <input
        id="inscritos"
        name="inscritos"
        type="number"
        min="0"
        value={datos.inscritos}
        onChange={change}
        required
      />

      <label htmlFor="cupo">Cupo</label>
      <input
        id="cupo"
        name="cupo"
        type="number"
        min="1"
        value={datos.cupo}
        onChange={change}
        required
      />

      <label htmlFor="estado">Estado</label>
      <select id="estado" name="estado" value={datos.estado} onChange={change}>
        <option>Inscripciones abiertas</option>
        <option>Próximamente</option>
        <option>Inscripciones cerradas</option>
      </select>

      <button className="main-button" type="submit">
        {submitText}
      </button>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
