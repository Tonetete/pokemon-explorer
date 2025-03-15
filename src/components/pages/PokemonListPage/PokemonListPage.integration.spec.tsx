import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router'
import PokemonListPage from '@components/pages/PokemonListPage/PokemonListPage'
import { usePokemonFetch } from '@hooks'
import { usePokemonStore } from '@hooks/usePokemonStore/usePokemonStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { pokemonDetailsMock } from '../../../test/__mocks__/pokemon-details.mock'
import { act } from 'react'

vi.mock('@hooks', () => ({
  usePokemonFetch: vi.fn(),
}))

const renderComponent = () => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PokemonListPage />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('PokemonListPage Integration Test', () => {
  let spyStoreSetPokemonList: any
  let spyStoreSetLoadingData: any
  let spyStoreSetFavoritesPokemonList: any
  let spyStoreSetScrollYPosition: any

  let store: any

  beforeEach(() => {
    vi.resetAllMocks()

    store = usePokemonStore
    spyStoreSetPokemonList = vi.spyOn(store.getState(), 'setPokemonList')
    spyStoreSetLoadingData = vi.spyOn(store.getState(), 'setLoadingData')
    spyStoreSetFavoritesPokemonList = vi.spyOn(store.getState(), 'setFavoritesPokemonList')
    spyStoreSetScrollYPosition = vi.spyOn(store.getState(), 'setScrollYPosition')

    usePokemonFetch.mockReturnValue({
      isLoading: false,
      data: { pages: [{ pokemonsDetails: pokemonDetailsMock }] },
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })
  })

  it('renders pokemon list correctly', async () => {
    act(() => {
      store.getState().setPokemonList(pokemonDetailsMock)
    })

    const component = renderComponent()

    await waitFor(() => {
      expect(screen.getByText(/#1 Bulbasaur/i)).toBeInTheDocument()
      expect(screen.getByText(/#2 Ivysaur/i)).toBeInTheDocument()
      expect(screen.getByText(/#3 Venusaur/i)).toBeInTheDocument()
      expect(screen.getByText(/#4 Charmander/i)).toBeInTheDocument()

      expect(screen.getAllByText(/poison/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/grass/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/fire/i)[0]).toBeInTheDocument()

      expect(screen.queryByTestId('pokeball-loader')).not.toBeInTheDocument()
    })
  })

  it('handles loading correctly', async () => {
    usePokemonFetch.mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    act(() => {
      store.getState().setLoadingData(true)
    })

    const component = renderComponent()

    expect(screen.queryByTestId('pokeball-loader')).not.toBeInTheDocument()
  })

  it('handles favorites correctly when is unfavorited', async () => {
    usePokemonFetch.mockReturnValue({
      isLoading: false,
      data: { pages: [{ pokemonsDetails: pokemonDetailsMock }] },
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    act(() => {
      store.getState().setPokemonList(pokemonDetailsMock)
    })

    const component = renderComponent()

    const favoriteButton = screen.getAllByTestId('favorite-button')[0]

    favoriteButton.click()

    expect(store.getState().favoritesPokemonList.length).toBe(1)
  })

  it('handles unfavorite correctly when is favorited', async () => {
    usePokemonFetch.mockReturnValue({
      isLoading: false,
      data: { pages: [{ pokemonsDetails: pokemonDetailsMock }] },
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    act(() => {
      store.getState().setPokemonList(pokemonDetailsMock)
      store.getState().setFavoritesPokemonList(pokemonDetailsMock)
    })

    expect(store.getState().favoritesPokemonList.length).toBe(4)

    const component = renderComponent()

    const favoriteButton = screen.getAllByTestId('favorite-button')[0]

    favoriteButton.click()

    expect(store.getState().favoritesPokemonList.length).toBe(3)
  })

  it('handles no data correctly', async () => {
    usePokemonFetch.mockReturnValue({
      isLoading: false,
      data: null,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    const component = renderComponent()

    expect(screen.getByText(/no data returned/i)).toBeInTheDocument()
  })

  it('handles errors correctly', () => {
    usePokemonFetch.mockReturnValue({
      isLoading: false,
      data: null,
      error: { message: 'Failed to fetch' },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    })

    const component = renderComponent()

    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument()
  })
})
