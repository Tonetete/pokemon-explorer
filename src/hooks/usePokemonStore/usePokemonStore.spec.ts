import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { usePokemonStore } from './usePokemonStore'
import { act } from 'react-dom/test-utils'

beforeEach(() => {
  vi.spyOn(Storage.prototype, 'setItem')
  vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify([]))
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('usePokemonStore Zustand Store', () => {
  it('should initialize with default state', () => {
    const state = usePokemonStore.getState()
    expect(state.pokemonList).toEqual([])
    expect(state.favoritesPokemonList).toEqual([])
    expect(state.loadingRoute).toBe(false)
    expect(state.loadingData).toBe(false)
    expect(state.scrollYPosition).toBe(0)
  })

  it('should update `scrollYPosition`', () => {
    act(() => {
      usePokemonStore.getState().setScrollYPosition(100)
    })
    expect(usePokemonStore.getState().scrollYPosition).toBe(100)
  })

  it('should update `loadingRoute`', () => {
    act(() => {
      usePokemonStore.getState().setLoadingRoute(true)
    })
    expect(usePokemonStore.getState().loadingRoute).toBe(true)
  })

  it('should update `loadingData`', () => {
    act(() => {
      usePokemonStore.getState().setLoadingData(true)
    })
    expect(usePokemonStore.getState().loadingData).toBe(true)
  })

  it('should update `pokemonList`', () => {
    const mockPokemon = [{ id: 1, name: 'Bulbasaur' }]
    act(() => {
      usePokemonStore.getState().setPokemonList(mockPokemon)
    })
    expect(usePokemonStore.getState().pokemonList).toEqual(mockPokemon)
  })

  it('should update `favoritesPokemonList` and store in localStorage', () => {
    const mockFavorite = [{ id: 1, name: 'Bulbasaur' }]
    act(() => {
      usePokemonStore.getState().setFavoritesPokemonList(mockFavorite)
    })

    expect(usePokemonStore.getState().favoritesPokemonList).toEqual(mockFavorite)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favoritesPokemonList',
      JSON.stringify(mockFavorite)
    )
  })
})
