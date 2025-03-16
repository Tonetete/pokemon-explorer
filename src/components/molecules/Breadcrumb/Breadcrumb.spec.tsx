import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Breadcrumbs from './Breadcrumb.tsx'

describe('Breadcrumbs Component', () => {
  const mockRoutes = [
    { path: '/pokemon-explorer', handle: { crumb: () => 'Pokemon Explorer' } },
    { path: '/pokemon-explorer/pokemon-detail/:id', handle: { crumb: () => 'Pokemon Detail' } },
  ]

  it('renders breadcrumbs for a static route', () => {
    render(
      <MemoryRouter initialEntries={['/pokemon-explorer']}>
        <Breadcrumbs routes={mockRoutes} />
      </MemoryRouter>
    )

    expect(screen.getByText('Pokemon Explorer')).toBeInTheDocument()
  })

  it('renders breadcrumbs for a dynamic route with :id', () => {
    render(
      <MemoryRouter initialEntries={['/pokemon-explorer/pokemon-detail/1']}>
        <Breadcrumbs routes={mockRoutes} />
      </MemoryRouter>
    )

    expect(screen.getByText('Pokemon Explorer')).toBeInTheDocument()
    expect(screen.getByText('Pokemon Detail')).toBeInTheDocument()
  })

  it('renders breadcrumb links correctly', () => {
    render(
      <MemoryRouter initialEntries={['/pokemon-explorer/pokemon-detail/1']}>
        <Breadcrumbs routes={mockRoutes} />
      </MemoryRouter>
    )

    expect(screen.getByText('Pokemon Explorer').closest('a')).toHaveAttribute(
      'href',
      '/pokemon-explorer'
    )
  })
})
