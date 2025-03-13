const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#8B5CF6',
        danger: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        success: '#10B981',

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
    'bg-pokemon-normal',
    'bg-pokemon-fighting',
    'bg-pokemon-flying',
    'bg-pokemon-poison',
    'bg-pokemon-ground',
    'bg-pokemon-rock',
    'bg-pokemon-bug',
    'bg-pokemon-ghost',
    'bg-pokemon-steel',
    'bg-pokemon-fire',
    'bg-pokemon-water',
    'bg-pokemon-grass',
    'bg-pokemon-electric',
    'bg-pokemon-psychic',
    'bg-pokemon-ice',
    'bg-pokemon-dragon',
    'bg-pokemon-dark',
    'bg-pokemon-fairy',
    'bg-pokemon-stellar',
    'bg-pokemon-unknown',
    'bg-pokemon-shadow',
  ],
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const pokemonColors = theme('colors.pokemon')
      const newUtilities = {}

      Object.entries(pokemonColors).forEach(([type, color]) => {
        newUtilities[`.bg-pokemon-${type}`] = {
          backgroundColor: color,
        }
      })

      addUtilities(newUtilities)
    }),
  ],
}
