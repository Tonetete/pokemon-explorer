import { useEffect } from 'react'
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query'
import { LIMIT_PER_PAGE, POKEMON_API_URL } from '@constants'
import { PokemonListResponse } from '@types'
import { usePokemonStore } from '@hooks/usePokemonStore/usePokemonStore.ts'
import { PokemonDetail } from '@components/pages/PokemonDetailPage/PokemonDetailPage.tsx'

export interface QueryPokemonDataList {
  data?: {
    pages: {
      pokemonsDetails: PokemonDetail[]
      nextOffset: number | null
    }[]
  }
  isLoading: boolean
  error: Error | null
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<InfiniteQueryObserverResult<any, Error>>
  hasNextPage: boolean
}

export interface QueryPokemonDataDetail {
  data?: PokemonDetail
  isLoading: boolean
  error: Error | null
  isSuccess: boolean
}

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

const fetchPokemonDetail = async (id: number | null): Promise<PokemonDetail> => {
  const response = await fetch(`${POKEMON_API_URL}pokemon/${id}`)
  return response.json()
}

export const usePokemonFetchDetail = (id: number | null): QueryPokemonDataDetail => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonDetail(id),
    enabled: !!id,
  })

  return {
    data,
    isLoading,
    error,
    isSuccess,
  }
}

export const usePokemonFetch = (): QueryPokemonDataList => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: async ({ pageParam = 0 }) => fetchPokemonList(pageParam),
    getNextPageParam: lastPage => lastPage.nextOffset,
    initialPageParam: 0,
  })

  const { setPokemonList } = usePokemonStore()

  useEffect(() => {
    if (data) {
      setPokemonList(
        data.pages.flatMap((page: { pokemonsDetails: PokemonDetail[] }) => page.pokemonsDetails)
      )
    }
  }, [data, setPokemonList])

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
  }
}
