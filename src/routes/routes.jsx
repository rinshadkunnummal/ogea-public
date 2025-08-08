import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '@/Pages/Layout.jsx'
import Loader from '@/Components/Loader/Loader.jsx'
import ErrorPage from '@/Components/ErrorPage/ErrorPage.jsx'

// Lazy load components
const Home = lazy(() => import('../Pages/Home.jsx'))
const Works = lazy(() => import('../Pages/Works'))
const Posters = lazy(() => import('../Pages/Posters.jsx'))
const Contact = lazy(() => import('../Pages/Contact'))
const Admin = lazy(() => import('../Pages/Admin/Admin.jsx'))
const StatsSection = lazy(() => import('../Pages/Admin/StatsSection.jsx'))
const ManageSection = lazy(() => import('../Pages/Admin/ManageSection.jsx'))
const AddSection = lazy(() => import('../Pages/Admin/AddSection.jsx'))
const ManagePosters = lazy(() => import('../Pages/Admin/ManagePosters.jsx'))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-4">
        <Loader />
    </div>
  </div>
)

// Wrapper component with Suspense
const LazyWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
)

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LazyWrapper><Home /></LazyWrapper>
      },
      {
        path: "works",
        element: <LazyWrapper><Works /></LazyWrapper>
      },
      {
        path: "works/:articleId",
        element: <LazyWrapper><Works /></LazyWrapper>
      },
      {
        path: "posters",
        element: <LazyWrapper><Posters /></LazyWrapper>
      },
      {
        path: "contact",
        element: <LazyWrapper><Contact /></LazyWrapper>
      }
    ]
  },
  {
<<<<<<< HEAD
    path: "/admin/*",
    element: <LazyWrapper><Admin /></LazyWrapper>
=======
    path: "/admin",
    element: <LazyWrapper><Admin /></LazyWrapper>,
    children: [
      {
        index: true,
        element: <LazyWrapper><StatsSection /></LazyWrapper>
      },
      {
        path: "manage",
        element: <LazyWrapper><ManageSection /></LazyWrapper>
      },
      {
        path: "add",
        element: <LazyWrapper><AddSection /></LazyWrapper>
      },
      {
        path: "posters",
        element: <LazyWrapper><ManagePosters /></LazyWrapper>
      }
    ]
>>>>>>> 28b1b16a2ed885ad34db01712a6ff8e0e5ce7395
  },
  {
    path: "*",
    element: <ErrorPage />
  }
])
