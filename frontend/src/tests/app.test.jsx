import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TournamentCard from '../components/TournamentCard.jsx'
import TorneoForm from '../components/TorneoForm.jsx'
import { AuthProvider } from '../context/AuthContext.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import { autenticar } from '../services/authDemoService.js'
import {
  actualizarTorneo,
  crearTorneo,
  eliminarTorneo,
  obtenerTorneos
} from '../services/torneosService.js'

const torneo = {
  id: 'prueba',
  nombre: 'Copa React',
  descripcion: 'Torneo de ejemplo',
  juego: 'Pokemon TCG',
  fecha: '20/10/2026',
  formato: 'Standard',
  inscritos: 8,
  cupo: 16,
  estado: 'Inscripciones abiertas'
}

const torneoNuevo = {
  nombre: 'Torneo de prueba',
  descripcion: 'Descripción de prueba',
  juego: 'Pokemon TCG',
  fecha: '01/12/2026',
  formato: 'Standard',
  inscritos: 0,
  cupo: 16,
  estado: 'Próximamente'
}

function completarFormulario() {
  fireEvent.change(screen.getByLabelText('Nombre'), {
    target: { value: 'Torneo Vitest' }
  })
  fireEvent.change(screen.getByLabelText('Descripción'), {
    target: { value: 'Descripción simple' }
  })
  fireEvent.change(screen.getByLabelText('Juego'), {
    target: { value: 'Gundam' }
  })
  fireEvent.change(screen.getByLabelText('Fecha'), {
    target: { value: '01/12/2026' }
  })
}

describe('TournamentCard', () => {
  // Comprueba que la tarjeta muestre la información enviada mediante la prop torneo.
  it('muestra los datos recibidos por props', () => {
    render(
      <MemoryRouter>
        <TournamentCard torneo={torneo} />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'Copa React' })).toBeInTheDocument()
    expect(screen.getByText('Fecha: 20/10/2026')).toBeInTheDocument()
  })

  // Comprueba que un torneo destacado muestre su imagen.
  it('muestra imagen cuando el torneo es destacado', () => {
    const destacado = {
      ...torneo,
      imagen: 'imagen.png',
      imagenAlt: 'Carta destacada',
      ubicacion: 'Santiago',
      premio: '$1000'
    }

    render(
      <MemoryRouter>
        <TournamentCard torneo={destacado} destacado />
      </MemoryRouter>
    )

    expect(screen.getByAltText('Carta destacada')).toBeInTheDocument()
  })
})

describe('TorneoForm', () => {
  // Comprueba que no se puedan guardar más inscritos que los permitidos por el cupo.
  it('muestra un error si los inscritos superan el cupo', () => {
    render(<TorneoForm onSave={vi.fn()} submitText="Guardar" />)
    completarFormulario()

    fireEvent.change(screen.getByLabelText('Jugadores inscritos'), {
      target: { value: '20' }
    })
    fireEvent.change(screen.getByLabelText('Cupo'), { target: { value: '10' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.getByRole('alert')).toHaveTextContent('El cupo debe ser mayor que cero')
  })

  // Comprueba que el formulario envíe los datos al guardar un torneo válido.
  it('envía los datos cuando el formulario es válido', () => {
    const guardar = vi.fn()
    render(<TorneoForm onSave={guardar} submitText="Guardar" />)
    completarFormulario()
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(guardar).toHaveBeenCalledWith(
      expect.objectContaining({ nombre: 'Torneo Vitest', cupo: 16 })
    )
  })
})

describe('LoginPage', () => {
  // Comprueba que el login informe un error cuando las credenciales son incorrectas.
  it('muestra un error si las credenciales no existen', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'correo@ejemplo.cl' }
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'incorrecta' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
  })
})

describe('torneosService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('id-de-prueba')
  })

  afterEach(() => vi.restoreAllMocks())

  // Comprueba que se carguen los tres torneos fake al iniciar sin datos guardados.
  it('carga los torneos iniciales si el almacenamiento está vacío', () => {
    expect(obtenerTorneos()).toHaveLength(3)
  })

  // Comprueba que crearTorneo agregue y guarde un torneo en localStorage.
  it('crea un torneo y lo guarda localmente', () => {
    crearTorneo(torneoNuevo)

    expect(obtenerTorneos()).toContainEqual(
      expect.objectContaining({ id: 'id-de-prueba', nombre: 'Torneo de prueba' })
    )
  })

  // Comprueba que actualizarTorneo cambie los datos de un torneo que ya existe.
  it('actualiza un torneo existente', () => {
    const creado = crearTorneo(torneoNuevo)
    actualizarTorneo(creado.id, { ...creado, nombre: 'Torneo actualizado' })

    expect(obtenerTorneos()).toContainEqual(
      expect.objectContaining({ id: creado.id, nombre: 'Torneo actualizado' })
    )
  })

  // Comprueba que eliminarTorneo borre un torneo usando su identificador.
  it('elimina un torneo existente', () => {
    const creado = crearTorneo(torneoNuevo)
    eliminarTorneo(creado.id)

    expect(obtenerTorneos()).not.toContainEqual(
      expect.objectContaining({ id: creado.id })
    )
  })
})

describe('autenticar', () => {
  // Comprueba que las credenciales demo del administrador sean válidas.
  it('reconoce la cuenta de administrador', () => {
    expect(autenticar('admin@tcgapp.cl', 'admin123')).toMatchObject({ rol: 'admin' })
  })

  // Comprueba que las credenciales demo del jugador sean válidas.
  it('reconoce la cuenta de jugador', () => {
    expect(autenticar('user@tcgapp.cl', 'user123')).toMatchObject({ rol: 'jugador' })
  })

  // Comprueba que una contraseña equivocada no permita iniciar sesión.
  it('devuelve null con una contraseña incorrecta', () => {
    expect(autenticar('user@tcgapp.cl', 'error')).toBeNull()
  })
})
