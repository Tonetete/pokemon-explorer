import { useParams, useLocation } from 'react-router'
import { KeyValue } from '@types'
import { capitalize, replaceHyphenWithSpace } from '@utils'
import Card from '@components/atoms/Card/Card.tsx'
import Chip from '@components/atoms/Chip/Chip.tsx'
import ScrollToTop from '@components/atoms/ScrollToTop/ScrollToTop.tsx'
import PokeballLoader from '@components/atoms/PokeBallLoader/PokeBallLoader.tsx'
import { usePokemonFetchDetail } from '@hooks/usePokemonFetch/usePokemonFetch.ts'
import AudioPlayer from '@components/molecules/AudioPlayer/AudioPlayer.tsx'
import FavoriteStar from '@components/organisms/Favorite/Favorite.tsx'
import { usePokemonStore } from '@hooks/usePokemonStore/usePokemonStore.ts'
import { useEffect, useState } from 'react'

export interface PokemonDetail {
  id: number
  cries: {
    latest: string
    legacy: string
  }
  name: string
  sprites: {
    front_default: string
  }
  moves: {
    move: {
      name: string
      url: string
    }
  }[]
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[]
}

const getDisplayName: KeyValue = {
  hp: 'HP',
  attack: 'ATTK',
  defense: 'DEF',
  'special-attack': 'SP.ATTK',
  'special-defense': 'SP.DEF',
  speed: 'SPD',
}

export default function PokemonDetailPage() {
  const { id } = useParams()
  const location = useLocation()
  const { favoritesPokemonList, setFavoritesPokemonList } = usePokemonStore()
  const pokemon = location.state?.pokemon
  const { data, isLoading, error } = usePokemonFetchDetail(pokemon ? null : Number(id))
  const [pokemonDetail, setPokemonDetail] = useState(pokemon || data)

  useEffect(() => {
    if (data) {
      setPokemonDetail(data)
    }
  }, [data])

  if (isLoading) {
    return <PokeballLoader />
  }

  if (!pokemonDetail) {
    return <p className="pokemon-text-gray">Pokémon not found</p>
  }

  if (error) {
    return <p className="pokemon-text-gray">There was an unexpected error</p>
  }

  const handleFavorite = ({ isFavorite, data }: { isFavorite: boolean; data: unknown }) => {
    if (!isFavorite) {
      setFavoritesPokemonList(prev => [...prev, pokemon])
    } else {
      setFavoritesPokemonList(prev => prev.filter(pokemon => pokemon.id !== data))
    }
  }

  const { name: typeName } = pokemonDetail.types[0].type

  return (
    <div>
      <ScrollToTop />
      <FavoriteStar
        data={pokemonDetail.id}
        isFavorite={!!favoritesPokemonList.find(p => p.id === pokemonDetail.id)}
        onToggle={handleFavorite}
      >
        {({ favoriteButton }) => (
          <section className="mt-8">
            <Card dimensions="md:w-80 sm:w-80">
              <div className="flex justify-end">{favoriteButton}</div>
              <section className="flex flex-col items-center">
                <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
                <div>
                  <p className="text-gray-600 mt-2 col-span-1 font-pokemon-gb">
                    #{pokemonDetail.id} {capitalize(pokemonDetail.name)}
                  </p>
                </div>
                <div className="mt-2">
                  <AudioPlayer
                    text="Cries"
                    src={pokemonDetail.cries.legacy || pokemonDetail.cries.latest}
                  />
                </div>
              </section>
              <section className="flex flex-row mt-4 w-full">
                <span className="text-gray-600 mr-2">Types: </span>
                {pokemonDetail.types.map((type: PokemonDetail['types'][0], index: number) => (
                  <Chip
                    customClass={`bg-color-pokemon-${type.type.name.toLowerCase()} text-color-pokemon-${type.type.name}`}
                    name={type.type.name}
                    key={index}
                  />
                ))}
              </section>
              <section className="w-full">
                <header className="mt-2 flex align-start">
                  <p className="text-gray-600">Stats</p>
                </header>
                <div
                  className={`flex flex-col mt-2 justify-start w-full bg-color-pokemon-${typeName} rounded-md border-2 border-stone-600 p-4`}
                >
                  {pokemonDetail?.stats.map((stat: PokemonDetail['stats'][0], index: number) => (
                    <div
                      className={`grid grid-cols-3 font-pokemon-gb text-color-pokemon-${typeName} text-xs`}
                      key={index}
                    >
                      <span className="col-span-2">{getDisplayName[stat.stat.name]}:</span>
                      <span className="col-span-1">{stat.base_stat}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section className="w-full">
                <header className="mt-2 flex align-start">
                  <p className="text-gray-600">Moves</p>
                </header>
                <div
                  className={`flex flex-col mt-2 justify-start w-full text-xs font-pokemon-gb text-color-pokemon-${typeName} bg-color-pokemon-${typeName} rounded-md border-2 border-stone-600 pl-6 pt-2 pb-2`}
                >
                  <ul className="list-square">
                    {pokemonDetail?.moves.map((move: PokemonDetail['moves'][0], index: number) => (
                      <li key={index} className="col-li-2 mt-1">
                        {capitalize(replaceHyphenWithSpace(move.move.name))}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </Card>
          </section>
        )}
      </FavoriteStar>
    </div>
  )
}
