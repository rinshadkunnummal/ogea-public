import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import NavigationButton from '../NavigationButton/NavigationButton.jsx'
import MobileSidebar from '../MobileSidebar/MobileSidebar.jsx'

const Navbar = () => {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMobileSidebar = () => {
        setIsMenuOpen(false)
    }

    return (
        <section className='sticky top-0 left-0 right-0  z-50 bg-transparent'>
            <div className="div bg-[#123575] py-1 text-center">
                <p className='text-[#ffffff81] font-nunito'>Need to participate programs? <a target='_blank' className='opacity-80 underline' href="https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk?usp=drive_link">reach here ⇗</a></p>
            </div>
            <header className='w-full bg-white px-6 py-4 text-white shadow-lg  mx-auto backdrop-blur-md'>
                <div className='flex justify-between items-center'>
                    {/* Logo/Brand */}
                    <div className='w-32 md:w-40 flex items-center gap-2'>
                        <img src="/logo.svg" alt="" className='w-full' />
                        <h1 className='text-xl md:text-2xl font-poppins font-bold text-black hidden'>
                            CHS Outreach. <span className='hidden text-teal-300'>Board</span>
                        </h1>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className='hidden md:flex gap-2'>
                        <Link to="/" className='hover:text-gray-300 transition-colors border-r-2 border-gray-3 text-black'>
                            <NavigationButton  isActive={location.pathname === '/'}>
                                Home
                            </NavigationButton>
                        </Link>
                        <Link to="/works" className='hover:text-gray-300 transition-colors border-r-2 border-gray-300 text-black'>
                            <NavigationButton  isActive={location.pathname === '/works' || location.pathname.startsWith('/works/')}>
                                Literary Works
                            </NavigationButton>
                        </Link>
                        <Link to="/posters" className='hover:text-gray-300 transition-colors border-r-2 border-gray-300 text-black'>
                            <NavigationButton  isActive={location.pathname === '/posters'}>
                                Achievements
                            </NavigationButton>
                        </Link>
                        <Link to="/contact" className='hover:text-gray-300 transition-colors text-black'>
                            <NavigationButton  isActive={location.pathname === '/contact'}>
                                Contact
                            </NavigationButton>
                        </Link>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className='md:hidden p-2 rounded-md hover:bg-teal-700 transition-colors'
                        aria-label='Toggle navigation menu'
                    >
                        <Menu className='h-6 w-6 text-black' />
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <MobileSidebar isOpen={isMenuOpen} onClose={closeMobileSidebar} />
        </section>

    )
}

export default Navbar
