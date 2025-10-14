import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import Works from '../pages/Works'
import Posters from '../pages/Posters'
import Contact from '../pages/Contact'

// Create browser router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'works',
        element: <Works />,
      },
      {
        path: 'works/:articleId',
        element: <Works />,
      },
      {
        path: 'posters',
        element: <Posters />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go Home
        </a>
      </div>
    ),
  },
])

export default router
