import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import TorneoForm from '../components/TorneoForm.jsx'

function completarFormulario() {
  fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Torneo Vitest' } })
  fireEvent.change(screen.getByLabelText('Descripción'), { target: { value: 'Descripción simple' } })
  fireEvent.change(screen.getByLabelText('Juego'), { target: { value: 'Gundam' } })
  fireEvent.change(screen.getByLabelText('Fecha'), { target: { value: '2026-12-01' } })
}

describe('TorneoForm', () => {
  it('muestra un error si los inscritos superan el cupo', () => {
    render(<TorneoForm onSave={vi.fn()} submitText="Guardar" />)
    completarFormulario()
    fireEvent.change(screen.getByLabelText('Jugadores inscritos'), { target: { value: '20' } })
    fireEvent.change(screen.getByLabelText('Cupo'), { target: { value: '10' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(screen.getByRole('alert')).toHaveTextContent('El cupo debe ser mayor que cero')
  })

  it('envía los datos cuando el formulario es válido', () => {
    const guardar = vi.fn()
    render(<TorneoForm onSave={guardar} submitText="Guardar" />)
    completarFormulario()
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(guardar).toHaveBeenCalledWith(expect.objectContaining({ nombre: 'Torneo Vitest', cupo: 16 }))
  })
})
