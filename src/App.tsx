import { BrowserRouter, Link, Route, Routes } from 'react-router'
import Breadcrumb from '@components/molecules/Breadcrumb/Breadcrumb.tsx'
import { routes } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MINIMUM_TIME_TO_SHOW_LOADER } from '@constants'
import { Suspense, useEffect, useState } from 'react'
import PokeballLoader from '@components/atoms/PokeBallLoader/PokeBallLoader.tsx'

export default function App() {
  const queryClient = new QueryClient()
  const DelayedSuspense = ({
    children,
    delay = MINIMUM_TIME_TO_SHOW_LOADER,
  }: {
    children: React.ReactNode
    delay?: number
  }) => {
    const [minTimeReached, setMinTimeReached] = useState(false)

    useEffect(() => {
      const timeout = setTimeout(() => setMinTimeReached(true), delay)
      return () => clearTimeout(timeout)
    }, [delay])

    return (
      <Suspense fallback={<PokeballLoader />}>
        {minTimeReached ? children : <PokeballLoader />}
      </Suspense>
    )
  }
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <header className="fixed top-0 left-0 right-0 z-50 text-sm text-gray-600 mb-4 p-4 bg-white shadow-md flex items-center justify-between">
          <Breadcrumb routes={routes} />
          <Link to="/pokemon-explorer/favorites-pokemon">
            <button className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-bold rounded-full shadow-md hover:bg-blue-600 transition">
              Go to favorites
            </button>
          </Link>
        </header>
        <div className="mt-32">
          <DelayedSuspense>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </DelayedSuspense>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
