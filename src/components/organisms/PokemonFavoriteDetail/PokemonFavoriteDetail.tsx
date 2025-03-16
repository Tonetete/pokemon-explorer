import Card from '@components/atoms/Card/Card.tsx'
import { Link } from 'react-router'
import { capitalize } from '@utils'
import { PokemonDetail } from '@components/pages/PokemonDetailPage/PokemonDetailPage.tsx'
import Chip from '@components/atoms/Chip/Chip.tsx'
import FavoriteStar from '@components/organisms/Favorite/Favorite.tsx'

interface PokemonFavoriteDetailProps {
  onToggle: ({ data, isFavorite }: { data: unknown; isFavorite: boolean }) => void
  isFavorite: boolean
  pokemon: PokemonDetail
}

export default function PokemonFavoriteDetail({
  pokemon,
  onToggle,
  isFavorite,
}: PokemonFavoriteDetailProps) {
  return (
    <FavoriteStar data={pokemon.id} isFavorite={isFavorite} onToggle={onToggle}>
      {({ favoriteButton }: { favoriteButton: React.ReactNode }) => {
        return (
          <Card>
            <div className="pokemon-card flex justify-end">{favoriteButton}</div>
            <Link
              className="pokemon-detail-link"
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
  )
}
