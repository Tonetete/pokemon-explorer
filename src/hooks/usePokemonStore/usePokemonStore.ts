import { combine } from 'zustand/middleware'
import { create } from 'zustand/react'
import { PokemonDetail } from '@components/pages/PokemonDetailPage/PokemonDetailPage.tsx'

export interface State {
  pokemonList: PokemonDetail[]
  favoritesPokemonList: PokemonDetail[]
  loadingRoute: boolean
  loadingData: boolean
  scrollYPosition: number
}

export const usePokemonStore = create(
  combine(
    {
      pokemonList: [],
      favoritesPokemonList: localStorage.getItem('favoritesPokemonList')
        ? JSON.parse(localStorage.getItem('favoritesPokemonList')!)
        : [],
      loadingRoute: false,
      loadingData: false,
      scrollYPosition: 0,
    } as State,
    set => {
      return {
        setScrollYPosition: (nextScrollYPosition: number | ((scrollYPosition: number) => number)) =>
          set(
            (state: State): Pick<State, 'scrollYPosition'> => ({
              scrollYPosition:
                typeof nextScrollYPosition === 'function'
                  ? nextScrollYPosition(state.scrollYPosition)
                  : nextScrollYPosition,
            })
          ),
        setLoadingRoute: (nextLoadingRoute: boolean | ((loading: boolean) => boolean)) =>
          set(
            (state: State): Pick<State, 'loadingRoute'> => ({
              loadingRoute:
                typeof nextLoadingRoute === 'function'
                  ? nextLoadingRoute(state.loadingRoute)
                  : nextLoadingRoute,
            })
          ),
        setLoadingData: (nextLoadingData: boolean | ((loading: boolean) => boolean)) =>
          set(
            (state: State): Pick<State, 'loadingData'> => ({
              loadingData:
                typeof nextLoadingData === 'function'
                  ? nextLoadingData(state.loadingData)
                  : nextLoadingData,
            })
          ),
        setPokemonList: (
          nextPokemonList: PokemonDetail[] | ((pokemonList: PokemonDetail[]) => PokemonDetail[])
        ) =>
          set(
            (state: State): Pick<State, 'pokemonList'> => ({
              pokemonList:
                typeof nextPokemonList === 'function'
                  ? nextPokemonList(state.pokemonList)
                  : nextPokemonList,
            })
          ),
        setFavoritesPokemonList: (
          nextFavoritesPokemonList:
            | PokemonDetail[]
            | ((pokemonList: PokemonDetail[]) => PokemonDetail[])
        ) =>
          set((state: State): Pick<State, 'favoritesPokemonList'> => {
            const updatedFavorites =
              typeof nextFavoritesPokemonList === 'function'
                ? nextFavoritesPokemonList(state.favoritesPokemonList)
                : nextFavoritesPokemonList

            localStorage.setItem('favoritesPokemonList', JSON.stringify(updatedFavorites))
            return {
              favoritesPokemonList: updatedFavorites,
            }
          }),
      }
    }
  )
)
