import { StrictMode, Suspense, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import PokeballLoader from '@components/atoms/PokeBallLoader/PokeBallLoader.tsx'
import ScrollToTop from '@components/atoms/ScrollToTop/ScrollToTop.tsx'
import { MINIMUM_TIME_TO_SHOW_LOADER } from '@constants'
import Breadcrumb from '@components/molecules/Breadcrumb/Breadcrumb.tsx'
import { routes } from './routes'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

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

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Breadcrumb routes={routes} />
        <ScrollToTop />
        <div className="mt-16">
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
  </StrictMode>
)
