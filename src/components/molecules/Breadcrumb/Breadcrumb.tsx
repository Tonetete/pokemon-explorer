import { Link, RouteObject, useLocation } from 'react-router'
import { useEffect, useState } from 'react'

interface BreadCrumbsProps {
  routes: RouteObject[]
}

interface Crumb {
  pathname: string
  crumb: string
}

export default function Breadcrumbs({ routes }: BreadCrumbsProps): React.ReactNode {
  const { pathname } = useLocation()
  const [crumbs, setCrumbs] = useState<Crumb[] | null>(null)

  useEffect(() => {
    const getStaticPath = (path: string): string => path.replace(/\/:[^/]+/g, '')
    const paths: Crumb[] = []
    routes.map(({ path = '', handle }: RouteObject) => {
      if (path !== '/' && pathname.includes(getStaticPath(path))) {
        paths.push({ pathname: path, crumb: handle.crumb() })
      }
    })
    setCrumbs(paths)
  }, [pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 text-sm text-gray-600 mb-4 p-4 bg-white shadow-md">
      <ol className="flex space-x-2">
        {crumbs?.map(({ pathname, crumb }, index: number) => {
          return index !== crumbs.length - 1 ? (
            <li key={index} className="flex items-center">
              <Link to={pathname} className="text-blue-500 hover:underline">
                {crumb}
              </Link>
              <span className="ml-3 mx-1">&gt;</span>
            </li>
          ) : (
            <li key={index} className="flex items-center">
              {crumb}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
