import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import TournamentCard from '../components/TournamentCard.jsx'

const torneo = { id: 'prueba', nombre: 'Copa React', descripcion: 'Torneo de ejemplo', juego: 'Pokemon TCG', fecha: '20/10/2026', formato: 'Standard', inscritos: 8, cupo: 16, estado: 'Inscripciones abiertas' }

describe('TournamentCard', () => {
  it('muestra los datos recibidos por props', () => {
    render(<MemoryRouter><TournamentCard torneo={torneo} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'Copa React' })).toBeInTheDocument()
    expect(screen.getByText('Fecha: 20/10/2026')).toBeInTheDocument()
  })

  it('muestra imagen cuando el torneo es destacado', () => {
    const destacado = { ...torneo, imagen: 'imagen.png', imagenAlt: 'Carta destacada', ubicacion: 'Santiago', premio: '$1000' }
    render(<MemoryRouter><TournamentCard torneo={destacado} destacado /></MemoryRouter>)
    expect(screen.getByAltText('Carta destacada')).toBeInTheDocument()
  })
})
