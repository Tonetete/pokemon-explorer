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
        <span className="flex items-center justify-center text-amber-50 font-pokemon-gb">
          No favorites yet. Got to the
          <Link className="ml-2 mr-2 text-blue-500" to="/pokemon-explorer">
            Pokemon Explorer
          </Link>{' '}
          to start adding them.
        </span>
      )}
    </>
  )
}
