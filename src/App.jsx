import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
import Navbar from './Components/NavBar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'

import { router } from './routes/routes'
import { Analytics } from '@vercel/analytics/react';

// Layout component that handles navbar and footer visibility
const Layout = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")

  return (
    <div className="w-full bg-[#f1f1f1]">
      {/* Only show Navbar if not on /admin */}
      {!isAdminRoute && <Navbar />}
      <div className="content">
        <Outlet />
      </div>
      {/* Only show Footer if not on /admin */}
      {!isAdminRoute && <Footer />}
    </div>
  )
}


const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  )
}

export default App
