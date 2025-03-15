import { Link } from 'react-router'
import { capitalize } from '@utils'
import Card from '@components/atoms/Card/Card.tsx'
import Chip from '@components/atoms/Chip/Chip.tsx'
import { usePokemonStore } from '@hooks/usePokemonStore/usePokemonStore.ts'
import FavoriteStar from '@components/organisms/Favorite/Favorite.tsx'
import { PokemonDetail } from '@components/pages/PokemonDetailPage/PokemonDetailPage.tsx'

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
              <FavoriteStar data={pokemon.id} isFavorite={true} onToggle={handleUnfavorite}>
                {({ favoriteButton }) => {
                  return (
                    <Card>
                      <div className="flex justify-end">{favoriteButton}</div>
                      <Link
                        to={`/pokemon-explorer/pokemon-detail/${pokemon.id}`}
                        state={{ pokemon }}
                      >
                        <div className="flex flex-col items-center">
                          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                          <p className="text-gray-600 font-pokemon-gb text-[11px]">
                            #{pokemon.id} {capitalize(pokemon.name)}
                          </p>
                          <div className="flex flex-row mt-1">
                            {pokemon.types.map((type: PokemonDetail['types'][0], index: number) => (
                              <Chip
                                customClass={`bg-color-pokemon-${type.type.name.toLowerCase()} text-color-pokemon-${type.type.name.toLowerCase()}`}
                                name={type.type.name}
                                key={index}
                              />
                            ))}
                          </div>
                        </div>
                      </Link>
                    </Card>
                  )
                }}
              </FavoriteStar>
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
