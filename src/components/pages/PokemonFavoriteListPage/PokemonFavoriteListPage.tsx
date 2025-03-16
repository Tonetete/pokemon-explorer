import { Link } from 'react-router'
import { usePokemonStore } from '@hooks/usePokemonStore/usePokemonStore.ts'
import { PokemonDetail } from '@components/pages/PokemonDetailPage/PokemonDetailPage.tsx'
import PokemonFavoriteDetail from '@components/organisms/PokemonFavoriteDetail/PokemonFavoriteDetail.tsx'

export default function PokemonFavoriteListPage() {
  const { favoritesPokemonList, setFavoritesPokemonList } = usePokemonStore()

  const handleUnfavorite = ({ data }: { data: unknown }) => {
    setFavoritesPokemonList(prev => prev.filter(pokemon => pokemon.id !== data))
  }

  return (
    <>
      {favoritesPokemonList.length > 0 ? (
        <div className="items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {favoritesPokemonList?.map((pokemon: PokemonDetail, index: number) => (
            <div key={index}>
              <PokemonFavoriteDetail
                isFavorite={true}
                onToggle={handleUnfavorite}
                pokemon={pokemon}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h2 className="flex items-center justify-center font-pokemon-gb text-lg">
            No favorites yet!
          </h2>
          <span className="flex items-center justify-center font-pokemon-gb text-sm mt-2">
            Go to the
            <Link className="ml-2 mr-2 text-blue-500" to="/pokemon-explorer">
              Pokemon Explorer
            </Link>{' '}
            to start adding them.
          </span>
        </div>
      )}
    </>
  )
}
