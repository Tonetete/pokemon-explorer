import { useEffect, useState } from 'react'
import { Link, useNavigationType } from 'react-router'
import { usePokemonFetch } from '@hooks'
import { capitalize } from '@utils'
import Card from '@components/atoms/Card/Card.tsx'
import Chip from '@components/atoms/Chip/Chip.tsx'
import PokeballLoader from '@components/atoms/PokeBallLoader/PokeBallLoader.tsx'
import { usePokemonStore } from '@hooks/usePokemonStore/usePokemonStore.ts'
import { MINIMUM_TIME_TO_SHOW_LOADER, SCROLL_BUFFER } from '@constants'
import FavoriteStar from '@components/organisms/Favorite/Favorite.tsx'
import { PokemonDetail } from '@components/pages/PokemonDetailPage/PokemonDetailPage.tsx'
import { useScrollToY } from '@hooks/useScrollToY/useScrollToY.ts'

export default function PokemonListPage() {
  const navigationType = useNavigationType()
  const scrollToY = useScrollToY(0, false)
  const [pressedBackButton, setPressedBackButton] = useState(false)
  const [pressedNavigationButton, setPressedNavigationButton] = useState(false)
  const { scrollYPosition, setScrollYPosition } = usePokemonStore()
  const { data, isLoading, error, fetchNextPage, hasNextPage } = usePokemonFetch()

  const {
    loadingData,
    setLoadingData,
    favoritesPokemonList,
    setFavoritesPokemonList,
    pokemonList,
  } = usePokemonStore()

  useEffect(() => {
    if (navigationType === 'POP') {
      setPressedBackButton(true)
    }
    if (navigationType === 'PUSH') {
      setPressedNavigationButton(true)
      scrollToY(scrollYPosition)
    }
  }, [navigationType])

  useEffect(() => {
    const checkAndLoadMoreContent = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      // Check if scrollHeight is less than or equal to clientHeight so that we can fetch more data
      // This case scenario happens usually at initialization of the page

      if (scrollHeight <= clientHeight && hasNextPage && !isLoading && !loadingData) {
        setLoadingData(true)
        setTimeout(() => {
          fetchNextPage()
        }, MINIMUM_TIME_TO_SHOW_LOADER)
      }

      if (!isLoading || error) {
        setLoadingData(false)
      }
    }
    checkAndLoadMoreContent()

    window.addEventListener('resize', checkAndLoadMoreContent)
    return () => window.removeEventListener('resize', checkAndLoadMoreContent)
  }, [hasNextPage, isLoading, fetchNextPage, error, pressedBackButton, pressedNavigationButton])

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight

      const isNearBottom = scrollTop + clientHeight >= scrollHeight - SCROLL_BUFFER

      if (isNearBottom && hasNextPage && !isLoading && !loadingData) {
        setLoadingData(true)
        setTimeout(() => {
          fetchNextPage()
        }, MINIMUM_TIME_TO_SHOW_LOADER)
      }
    }

    if (!isLoading || error) {
      setLoadingData(false)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      setScrollYPosition(window.scrollY)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasNextPage, isLoading, fetchNextPage, error, pressedBackButton, pressedNavigationButton])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>No data returned</div>
  }

  const handleFavorite = ({ isFavorite, data }: { isFavorite: boolean; data: unknown }) => {
    if (!isFavorite) {
      setFavoritesPokemonList(prev => [...prev, pokemonList.find(p => p.id === data)!])
    } else {
      setFavoritesPokemonList(prev => prev.filter(pokemon => pokemon.id !== data))
    }
  }

  const allPokemonDetails = data?.pages.flatMap(page => page.pokemonsDetails) || []

  return (
    <>
      <div className="items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {allPokemonDetails?.map((pokemon: PokemonDetail, index: number) => (
          <div key={index}>
            <FavoriteStar
              data={pokemon.id}
              isFavorite={!!favoritesPokemonList.find(p => p.id === pokemon.id)}
              onToggle={handleFavorite}
            >
              {({ favoriteButton }) => {
                return (
                  <Card>
                    <div className="flex justify-end">{favoriteButton}</div>
                    <Link to={`/pokemon-explorer/pokemon-detail/${pokemon.id}`} state={{ pokemon }}>
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
      {loadingData && <PokeballLoader splash={false} />}
    </>
  )
}
