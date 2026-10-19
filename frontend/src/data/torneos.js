import torneo1 from '../assets/torneo1.png'
import torneo2 from '../assets/torneo2.png'
import torneo3 from '../assets/torneo3.png'

export const torneosDestacados = [
    { 
      id: 'destacado-1', 
      nombre: 'Torneo Destacado 1', 
      descripcion: 'Descripción del torneo destacado 1.', 
      fecha: '15/01/2026', 
      ubicacion: 'Ciudad 2', 
      premio: '$2000', 
      imagen: torneo1, 
      imagenAlt: 'Torneo Gundam' 
    },
    { 
      id: 'destacado-2', 
      nombre: 'Torneo Destacado 2', 
      descripcion: 'Descripción del torneo destacado 2.', 
      fecha: '20/02/2026', 
      ubicacion: 'Ciudad 3', 
      premio: '$3000', 
      imagen: torneo2, 
      imagenAlt: 'Torneo Pokémon' 
    },
    { id: 'destacado-3', 
      nombre: 'Torneo Destacado 3', 
      descripcion: 'Descripción del torneo destacado 3.', 
      fecha: '10/03/2026', 
      ubicacion: 'Ciudad 4', 
      premio: '$4000', 
      imagen: torneo3, 
      imagenAlt: 'Torneo One Piece' 
    },
  ]

export const torneos = [
    { id: 'gundam-santiago-cup', 
      nombre: 'Gundam Santiago Cup', 
      descripcion: 'Torneo competitivo de Gundam Card Game.', 
      juego: 'Gundam Card Game', 
      fecha: '15/09/2026', 
      formato: 'Standard', 
      inscritos: 18, 
      cupo: 32, 
      estado: 'Inscripciones abiertas' 
    },
    { id: 'pokemon-league-challenge', 
      nombre: 'Pokémon League Challenge', 
      descripcion: 'Torneo para jugadores de Pokémon Trading Card Game.', 
      juego: 'Pokémon TCG', 
      fecha: '22/09/2026', 
      formato: 'Standard', 
      inscritos: 12, 
      cupo: 16, 
      estado: 'Inscripciones abiertas' 
    },
    { id: 'grand-line-tournament', 
      nombre: 'Grand Line Tournament',
      descripcion: 'Torneo competitivo de One Piece Card Game.', 
      juego: 'One Piece Card Game', 
      fecha: '28/09/2026', 
      formato: 'Standard', 
      inscritos: 8, 
      cupo: 24, 
      estado: 'Próximamente' 
    },
]
