import PokemonListPage from '@components/pages/PokemonListPage/PokemonListPage.tsx'
import PokemonDetailPage from '@components/pages/PokemonDetailPage/PokemonDetailPage.tsx'
import NotFound from '@components/pages/NotFound/NotFound'

import { Navigate, RouteObject } from 'react-router'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/pokemon-explorer" />,
  },
  {
    path: '/pokemon-explorer',
    element: <PokemonListPage />,
    handle: { crumb: () => 'Pokémon List' },
  },
  {
    path: '/pokemon-explorer/pokemon-detail/:id',
    element: <PokemonDetailPage />,
    handle: { crumb: () => 'Pokémon Detail' },
  },
  {
    path: '*',
    element: <NotFound />,
    handle: { crumb: () => 'Not Found' },
  },
]
