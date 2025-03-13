import { useEffect } from 'react'
import { usePokemonFetch } from '@hooks'
import { PokemonDetail } from '@types'
import { capitalize } from '@utils'
import Card from '@components/atoms/Card/Card.tsx'

function PokemonExplorerApp() {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = usePokemonFetch()

  useEffect(() => {
    const checkAndLoadMoreContent = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      // Check if scrollHeight is less than or equal to clientHeight so that we can fetch more data
      // This case scenario happens usually at initialization of the page

      if (scrollHeight <= clientHeight && hasNextPage && !isLoading) {
        fetchNextPage()
      }
    }
    checkAndLoadMoreContent()

    window.addEventListener('resize', checkAndLoadMoreContent)
    return () => window.removeEventListener('resize', checkAndLoadMoreContent)
  }, [hasNextPage, isLoading, fetchNextPage])

  useEffect(() => {
    const handleScroll = () => {
      // Check if we've scrolled to the bottom
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const clientHeight = document.documentElement.clientHeight

      // If we're near the bottom (within 200px), fetch more data
      const scrollBuffer = 30
      const isNearBottom = scrollTop + clientHeight >= scrollHeight - scrollBuffer

      if (isNearBottom && hasNextPage && !isLoading) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasNextPage, isLoading, fetchNextPage])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>No data returned</div>
  }

  const allPokemonDetails = data?.pages.flatMap(page => page.pokemonsDetails) || []
  console.log('allPokemonDetails length', allPokemonDetails.length)

  return (
    <>
      <h1>Pokemon Explorer</h1>
      <div className="items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {allPokemonDetails?.map((pokemon: PokemonDetail, index: number) => (
          <div key={index}>
            <Card>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <p className="text-gray-600">{capitalize(pokemon.name)}</p>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}

export default PokemonExplorerApp
