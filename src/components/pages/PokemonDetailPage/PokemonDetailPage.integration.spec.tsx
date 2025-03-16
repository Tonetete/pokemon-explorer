import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BrowserRouter, useLocation, useParams } from 'react-router'
import { usePokemonStore } from '@hooks/usePokemonStore/usePokemonStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { pokemonDetailsMock } from '../../../test/__mocks__/pokemon-details.mock'
import { act } from 'react'
import PokemonDetailPage from '@components/pages/PokemonDetailPage/PokemonDetailPage.tsx'
import { usePokemonFetchDetail } from '@hooks/usePokemonFetch/usePokemonFetch.ts'

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router')

  return {
    ...actual,
    useLocation: vi.fn(),
    useParams: vi.fn(),
  }
})

vi.mock('@hooks/usePokemonFetch/usePokemonFetch', async () => ({
  usePokemonFetchDetail: vi.fn(),
}))

const renderComponent = () => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PokemonDetailPage />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('PokemonDetailPage Integration Test', () => {
  let store: any

  beforeEach(() => {
    vi.resetAllMocks()
    window.scrollTo = vi.fn()
    store = usePokemonStore

    useLocation.mockReturnValue({ state: { pokemon: pokemonDetailsMock[0] } })
    useParams.mockReturnValue({ id: '1' })

    usePokemonFetchDetail.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      isSuccess: true,
    })
  })

  it('renders pokemon detail correctly', async () => {
    act(() => {
      store.getState().setFavoritesPokemonList(pokemonDetailsMock)
    })

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText(/#1 Bulbasaur/i)).toBeInTheDocument()

      expect(screen.getAllByText(/poison/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/grass/i)[0]).toBeInTheDocument()

      expect(screen.getByText(/stats/i)).toBeInTheDocument()

      expect(screen.getByText(/hp/i)).toBeInTheDocument()
      expect(screen.getByText(/^attk\:$/i)).toBeInTheDocument()

      expect(screen.getByText(/^def\:$/i)).toBeInTheDocument()
      expect(screen.getByText(/sp\.attk/i)).toBeInTheDocument()

      expect(screen.getByText(/sp\.def/i)).toBeInTheDocument()
      expect(screen.getByText(/spd/i)).toBeInTheDocument()

      expect(screen.getByText(/moves/i)).toBeInTheDocument()
      expect(screen.getByText(/Razor wind/i)).toBeInTheDocument()

      expect(screen.getByRole('button', { name: '▶ Cries' })).toBeInTheDocument()
    })
  })

  it("handles when pokemon is not found and the id is passed so it'll fetch the pokemon", async () => {
    useLocation.mockReturnValue({ state: { pokemon: null } })

    usePokemonFetchDetail.mockReturnValue({
      data: pokemonDetailsMock[0],
      isLoading: false,
      error: null,
    })

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText(/#1 Bulbasaur/i)).toBeInTheDocument()

      expect(screen.getAllByText(/poison/i)[0]).toBeInTheDocument()
      expect(screen.getAllByText(/grass/i)[0]).toBeInTheDocument()

      expect(screen.getByText(/stats/i)).toBeInTheDocument()

      expect(screen.getByText(/hp/i)).toBeInTheDocument()
      expect(screen.getByText(/^attk\:$/i)).toBeInTheDocument()

      expect(screen.getByText(/^def\:$/i)).toBeInTheDocument()
      expect(screen.getByText(/sp\.attk/i)).toBeInTheDocument()

      expect(screen.getByText(/sp\.def/i)).toBeInTheDocument()
      expect(screen.getByText(/spd/i)).toBeInTheDocument()

      expect(screen.getByText(/moves/i)).toBeInTheDocument()
      expect(screen.getByText(/Razor wind/i)).toBeInTheDocument()

      expect(screen.getByRole('button', { name: '▶ Cries' })).toBeInTheDocument()
    })
  })

  it('handles unfavorited correctly when is favorited', async () => {
    act(() => {
      store.getState().setFavoritesPokemonList([])
    })
    renderComponent()

    expect(store.getState().favoritesPokemonList.length).toBe(0)

    const favoriteButton = screen.getAllByTestId('favorite-button')[0]

    favoriteButton.click()

    expect(store.getState().favoritesPokemonList.length).toBe(1)
    expect(store.getState().favoritesPokemonList[0].name).toBe('bulbasaur')
  })

  it('handles favorited correctly when is unfavorited', async () => {
    act(() => {
      store.getState().setFavoritesPokemonList([pokemonDetailsMock[0]])
    })
    renderComponent()

    expect(store.getState().favoritesPokemonList.length).toBe(1)

    const favoriteButton = screen.getAllByTestId('favorite-button')[0]

    favoriteButton.click()

    expect(store.getState().favoritesPokemonList.length).toBe(0)
  })
})
