import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy load pages for code splitting
const Home = lazy(() => import('../Pages/Home'))
const Works = lazy(() => import('../Pages/Works'))
const Contact = lazy(() => import('../Pages/Contact'))
const Article = lazy(() => import('../Pages/Article'))
const Charts = lazy(() => import('../Pages/Charts'))
const Achievements = lazy(() => import('../Pages/Achievements'))
const Error = lazy(() => import('../components/custom/error/Error'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
)

// Wrap component with Suspense
const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
)

// Create browser router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: 'works',
        element: withSuspense(Works),
      },
      {
        path: 'works/:articleId',
        element: withSuspense(Article),
      },
      {
        path: 'achievements',
        element: withSuspense(Achievements),
      },
      {
        path: 'contact',
        element: withSuspense(Contact),
      },
      {
        path: 'analytics',
        element: withSuspense(Charts),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(Error),
  },
])

export default router
