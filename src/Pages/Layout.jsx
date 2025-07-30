import Footer from '@/Components/Footer/Footer'
import Navbar from '@/Components/NavBar/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="app-layout min-h-screen flex flex-col bg-[#f1f1f1]" role="document">
      <header role="banner" aria-label="Main navigation">
        <Navbar/>
      </header>
      <main className="main-content flex-1" role="main" aria-label="Main content">
        <Outlet />
      </main>
      <footer role="contentinfo" aria-label="Footer information">
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout
