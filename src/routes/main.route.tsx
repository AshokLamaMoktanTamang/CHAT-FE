import { Navigate, createBrowserRouter } from 'react-router-dom'

import { ErrorBoundary } from '@/components'

import { AuthLayout, FullLayout } from '@/layouts'

import { authLayoutRoutes } from './public.route'
import { PrivateRoute, PublicRoute } from './route'

import { getItem } from '@/utils/storage'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/utils/constants'

import { RouteType } from './type'
import { fullLayoutRoutes } from './private.route'

const RouteWrapperComponent = (routeType: RouteType, component: any) => {
  const ComponentWrapped = component
  
  if (routeType === RouteType.PRIVATE) {
    return (
      <PrivateRoute>
        <ComponentWrapped />
      </PrivateRoute>
    )
  }

  return (
    <PublicRoute>
      <ComponentWrapped />
    </PublicRoute>
  )
}

const token = getItem<string>('token')

const Routes = createBrowserRouter([
  {
    path: '',
    errorElement: <ErrorBoundary homeRoutePath="home" />,
    element: token ? (
      <Navigate to={PRIVATE_ROUTES.home} replace />
    ) : (
      <Navigate to={PUBLIC_ROUTES.login} replace />
    ),
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorBoundary homeRoutePath="home" />,
    children: authLayoutRoutes?.map((item) => ({
      path: item?.path,
      lazy: async () => {
        const ImportComponent = await item.component()
        return {
          Component: () => RouteWrapperComponent(item.type, ImportComponent),
        }
      },
    })),
  },
  {
    element: <FullLayout />,
    errorElement: (
      <FullLayout>
        <ErrorBoundary homeRoutePath="home" />
      </FullLayout>
    ),
    children: fullLayoutRoutes?.map((item) => ({
      path: item?.path,
      lazy: async () => {
        const ImportComponent = await item.component()
        return {
          Component: () => RouteWrapperComponent(item.type, ImportComponent),
        }
      },
      ...(item?.children && {
        children: item.children?.map((child: any) => {
          return {
            path: child?.path,
            lazy: async () => {
              const ImportComponent = await child.component()
              return {
                Component: ImportComponent,
              }
            },
          }
        }),
      }),
    })),
  },
])

export default Routes
