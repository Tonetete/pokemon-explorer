import React from 'react'
import { combine } from 'zustand/middleware'
import { create } from 'zustand/react'
import { PokemonDetail } from '@types'

export interface State {
  pokemonList: PokemonDetail[]
  favoritesPokemonList: PokemonDetail[]
  loadingRoute: boolean
  loadingData: boolean
}

export const usePokemonStore = create(
  combine(
    {
      pokemonList: [],
      favoritesPokemonList: [],
      loadingRoute: false,
      loadingData: false,
    } as State,
    set => {
      return {
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
          set(
            (state: State): Pick<State, 'favoritesPokemonList'> => ({
              favoritesPokemonList:
                typeof nextFavoritesPokemonList === 'function'
                  ? nextFavoritesPokemonList(state.favoritesPokemonList)
                  : nextFavoritesPokemonList,
            })
          ),
      }
    }
  )
)
