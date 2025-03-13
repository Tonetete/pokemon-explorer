import { useInfiniteQuery } from '@tanstack/react-query'
import { LIMIT_PER_PAGE, POKEMON_API_URL } from '@constants'
import { PokemonDetail, PokemonListResponse, QueryPokemonData } from '@types'

const fetchPokemonList = async (
  offset: number
): Promise<{ pokemonsDetails: PokemonDetail[]; nextOffset: number | null }> => {
  const response = await fetch(`${POKEMON_API_URL}pokemon?limit=${LIMIT_PER_PAGE}&offset=${offset}`)
  const data: PokemonListResponse = await response.json()

  const pokemonsDetails: PokemonDetail[] = await Promise.all(
    data.results.map(async pokemon => {
      const res = await fetch(pokemon.url)
      if (!res.ok) {
        throw new Error(`Failed to fetch ${pokemon.url}: ${res.status}`)
      }
      return res.json()
    })
  )

  const nextOffset = data.next ? offset + LIMIT_PER_PAGE : null

  return {
    pokemonsDetails,
    nextOffset,
  }
}

export const usePokemonFetch = (): QueryPokemonData => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: async ({ pageParam = 0 }) => fetchPokemonList(pageParam),
    getNextPageParam: lastPage => lastPage.nextOffset,
    initialPageParam: 0,
  })

  console.log(data)

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  }
}
