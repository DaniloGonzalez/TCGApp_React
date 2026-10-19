import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AuthProvider } from '../context/AuthContext.jsx'
import LoginPage from '../pages/LoginPage.jsx'

describe('LoginPage', () => {
  it('muestra un error si las credenciales no existen', () => {
    render(<MemoryRouter><AuthProvider><LoginPage /></AuthProvider></MemoryRouter>)
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'correo@ejemplo.cl' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'incorrecta' } })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Correo o contraseña incorrectos.')
  })
})
