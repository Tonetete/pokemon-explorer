import { Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import PokemonList from '@components/pages/PokemonList/PokemonList.tsx'
import PokemonDetail from '@components/pages/PokemonDetail/PokemonDetai.tsx'
import NotFound from '@components/pages/NotFound/NotFound'

const Loading = () => <div className="text-center py-10">Loading...</div>

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PokemonList />,
  },
  {
    path: '/pokemon/:id',
    element: withSuspense(PokemonDetail),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default routes
