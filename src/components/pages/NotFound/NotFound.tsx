import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      {/* Funny Pokémon Image */}
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
        alt="Psyduck Confused"
        className="w-48 h-48"
      />

      <h2 className="text-lg font-bold font-pokemon-gb mt-4">Oops! 404 - Page Not Found</h2>

      <p className="font-pokemon-gb text-md mt-2 mb-2">
        Looks like Psyduck is as confused as we are!
      </p>

      {/* Return Home Button */}
      <Link
        to="/pokemon-explorer"
        className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-bold rounded-full shadow-md hover:bg-blue-600 transition"
      >
        Return to Pokémon Explorer
      </Link>
    </div>
  )
}
