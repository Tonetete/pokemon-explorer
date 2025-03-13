import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query'

export interface QueryPokemonData {
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

export interface PokemonDetail {
  num: number
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
export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}
