import Home from '../Pages/Home.jsx'
import Works from '../Pages/Works'
import Posters from '../Pages/Posters.jsx'
import Contact from '../Pages/Contact'
import Admin from '../Pages/Admin/Admin.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/Pages/Layout.jsx'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "works",
        element: <Works />
      },
      {
        path: "works/:articleId",
        element: <Works />
      },
      {
        path: "posters",
        element: <Posters />
      },
      {
        path: "contact",
        element: <Contact />
      }
    ]
  },
  {
    path: "/admin/*",
    element: <Admin />
  }
])
