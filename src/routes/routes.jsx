import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../Pages/Home'
import Works from '../Pages/Works'
import Posters from '../Pages/Posters'
import Contact from '../Pages/Contact'
import Article from '../Pages/Article'
import Charts from '../Pages/Charts'
import Achievements from '../Pages/Achievements'
import Error from '../components/custom/error/Error'

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
        element: <Article />,
      },
      {
        path: 'achievements',
        element: <Achievements />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'analytics',
        element: <Charts />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
])

export default router
