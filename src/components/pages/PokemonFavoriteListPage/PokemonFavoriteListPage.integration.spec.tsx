import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BrowserRouter } from 'react-router'
import { usePokemonStore } from '@hooks/usePokemonStore/usePokemonStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { pokemonDetailsMock } from '../../../test/__mocks__/pokemon-details.mock'
import { act } from 'react'
import PokemonFavoriteListPage from '@components/pages/PokemonFavoriteListPage/PokemonFavoriteListPage.tsx'

const renderComponent = () => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PokemonFavoriteListPage />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

describe('PokemonFavoriteListPage Integration Test', () => {
  let store: any

  beforeEach(() => {
    vi.resetAllMocks()
    store = usePokemonStore
  })

  it('renders pokemon list correctly', async () => {
    act(() => {
      store.getState().setFavoritesPokemonList(pokemonDetailsMock)
    })

    renderComponent()

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

  it('renders message to user when there are no favorites', async () => {
    act(() => {
      store.getState().setFavoritesPokemonList([])
    })

    renderComponent()

    await waitFor(() => {
      expect(screen.getByText(/No favorites yet!/i)).toBeInTheDocument()
    })
  })
  it('handles favorites correctly when is unfavorited', async () => {
    act(() => {
      store.getState().setFavoritesPokemonList(pokemonDetailsMock)
    })
    renderComponent()

    expect(store.getState().favoritesPokemonList.length).toBe(4)

    const favoriteButton = screen.getAllByTestId('favorite-button')[0]

    favoriteButton.click()

    expect(store.getState().favoritesPokemonList.length).toBe(3)
  })
})
