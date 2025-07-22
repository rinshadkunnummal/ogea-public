import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/NavBar/Navbar.jsx'

// Import pages here or create them later
import Home from './Pages/Home.jsx'
import Works from './Pages/Works'
import Posters from './Pages/Posters.jsx'
import Contact from './Pages/Contact'
import Admin from './Pages/Admin/Admin.jsx' // Assuming you have an Admin page

const App = () => {
  const [count, setCount] = useState(0)
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <BrowserRouter>
      <div className="w-full">
        {/* Only show Navbar if not on /admin */}
        {!isAdminRoute && <Navbar />}
        <div className="content bg-[#f1f1f1] p-3 sm:p-6 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<Works />} />
            <Route path="/posters" element={<Posters />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
