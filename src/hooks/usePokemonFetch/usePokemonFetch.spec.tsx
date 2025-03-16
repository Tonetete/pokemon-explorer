import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { usePokemonFetch, usePokemonFetchDetail } from './usePokemonFetch'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
})

global.fetch = vi.fn()

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('usePokemonFetchDetail Test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches a Pokémon detail successfully', async () => {
    const mockPokemonDetail = { id: 1, name: 'Bulbasaur' }
    ;(fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemonDetail,
    })

    const { result } = renderHook(() => usePokemonFetchDetail(1), { wrapper })

    await waitFor(() => expect(result.current.isLoading).toBeFalsy())

    expect(result.current.data).toEqual(mockPokemonDetail)
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1')
  })

  it('returns an error when the fetch fails', async () => {
    ;(fetch as vi.Mock).mockRejectedValueOnce(new Error('API Error'))

    const { result } = renderHook(() => usePokemonFetchDetail(1), { wrapper })

    await waitFor(() => expect(result.current.error).toBeTruthy())

    expect(result.current.error).toEqual(new Error('API Error'))
  })
})

describe('usePokemonFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches Pokémon list successfully', async () => {
    const mockPokemonList = {
      results: [{ name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' }],
      next: 'https://pokeapi.co/api/v2/pokemon?offset=20',
    }

    const mockPokemonDetail = { id: 1, name: 'Bulbasaur' }

    ;(fetch as vi.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonList,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetail,
      })

    const { result } = renderHook(() => usePokemonFetch(), { wrapper })

    await waitFor(() => expect(result.current.isLoading).toBeFalsy())

    expect(result.current.data).toBeDefined()
    expect(fetch).toHaveBeenCalledTimes(2)
  })

  it('handles fetch errors', async () => {
    ;(fetch as vi.Mock).mockRejectedValueOnce(new Error('API Error'))

    const { result } = renderHook(() => usePokemonFetch(), { wrapper })

    await waitFor(() => expect(result.current.error).toBeTruthy())

    expect(result.current.error).toEqual(new Error('API Error'))
  })
})
