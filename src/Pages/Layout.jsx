import Footer from '@/Components/Footer/Footer'
import Navbar from '@/Components/NavBar/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="app-layout min-h-screen flex flex-col bg-[#f1f1f1]">
      <header>
        <Navbar/>
      </header>
      <main className="main-content flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
