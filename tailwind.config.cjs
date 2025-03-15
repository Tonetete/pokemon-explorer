const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    listStyleType: {
      square: 'square',
    },
    extend: {
      fontFamily: {
        'pokemon-gb': ['PokemonGbFont'],
      },
      colors: {
        pokemon: {
          normal: '#dcdcdc',
          fighting: '#e8847e',
          flying: '#f0ad90',
          poison: '#A040A0',
          ground: '#E0C068',
          rock: '#4b4a45',
          bug: '#A8B820',
          ghost: '#705898',
          steel: '#B8B8D0',
          fire: '#b90235',
          water: '#6890F0',
          grass: '#78C850',
          electric: '#F8D030',
          psychic: '#F85888',
          ice: '#98D8D8',
          dragon: '#38f8db',
          dark: '#332a22',
          fairy: '#EE99AC',
          stellar: '#7AC7C5',
          unknown: '#68A090',
          shadow: '#403246',
        },
      },
    },
  },
  safeList: [
    'bg-color-pokemon-normal',
    'bg-color-pokemon-fighting',
    'bg-color-pokemon-flying',
    'bg-color-pokemon-poison',
    'bg-color-pokemon-ground',
    'bg-color-pokemon-rock',
    'bg-color-pokemon-bug',
    'bg-color-pokemon-ghost',
    'bg-color-pokemon-steel',
    'bg-color-pokemon-fire',
    'bg-color-pokemon-water',
    'bg-color-pokemon-grass',
    'bg-color-pokemon-electric',
    'bg-color-pokemon-psychic',
    'bg-color-pokemon-ice',
    'bg-color-pokemon-dragon',
    'bg-color-pokemon-dark',
    'bg-color-pokemon-fairy',
    'bg-color-pokemon-stellar',
    'bg-color-pokemon-unknown',
    'bg-color-pokemon-shadow',
    'text-color-pokemon-normal',
    'text-color-pokemon-fighting',
    'text-color-pokemon-flying',
    'text-color-pokemon-poison',
    'text-color-pokemon-ground',
    'text-color-pokemon-rock',
    'text-color-pokemon-bug',
    'text-color-pokemon-ghost',
    'text-color-pokemon-steel',
    'text-color-pokemon-fire',
    'text-color-pokemon-water',
    'text-color-pokemon-grass',
    'text-color-pokemon-electric',
    'text-color-pokemon-psychic',
    'text-color-pokemon-ice',
    'text-color-pokemon-dragon',
    'text-color-pokemon-dark',
    'text-color-pokemon-fairy',
    'text-color-pokemon-stellar',
    'text-color-pokemon-unknown',
    'text-color-pokemon-shadow',
  ],
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const pokemonColors = theme('colors.pokemon')
      const newUtilities = {}

      const getContrastTextColor = hex => {
        const r = parseInt(hex.substring(1, 3), 16)
        const g = parseInt(hex.substring(3, 5), 16)
        const b = parseInt(hex.substring(5, 7), 16)

        const brightness = (r * 299 + g * 587 + b * 114) / 1000

        return brightness > 200 ? '#4B5563' : '#f9fafb'
      }

      Object.entries(pokemonColors).forEach(([type, color]) => {
        const textColor = getContrastTextColor(color)

        newUtilities[`.bg-color-pokemon-${type}`] = {
          backgroundColor: color,
        }
        newUtilities[`.text-color-pokemon-${type}`] = { color: textColor }
      })

      addUtilities(newUtilities)
    }),
  ],
}
