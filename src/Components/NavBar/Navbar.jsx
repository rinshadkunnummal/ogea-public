import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import NavigationButton from '../NavigationButton/NavigationButton.jsx'
import MobileSidebar from '../MobileSidebar/MobileSidebar.jsx'
import homeIcon from '../../assets/Dashboard.png'
import WorksIcon from '../../assets/Works.png'
import PostersIcon from '../../assets/Posters.png'
import ContactIcon from '../../assets/Contact.png'

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
        <section className='pt-1 px-3 sm:px-4 lg:px-24 bg-[#f0f7f8] sticky top-0 z-50'>
            <header className='w-full bg-[#23272c] px-6 py-4 text-white shadow-lg rounded mx-auto backdrop-blur-10xl'>
                <div className='flex justify-between items-center'>
                    {/* Logo/Brand */}
                    <div>
                        <h1 className='text-xl md:text-2xl font-poppins font-bold'>
                            CHS Outreach. <span className='hidden text-teal-300'>Board</span>
                        </h1>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className='hidden md:flex gap-2'>
                        <Link to="/" className='hover:text-gray-300 transition-colors'>
                            <NavigationButton imageId={homeIcon} isActive={location.pathname === '/'}>
                                Home
                            </NavigationButton>
                        </Link>
                        <Link to="/works" className='hover:text-gray-300 transition-colors'>
                            <NavigationButton imageId={WorksIcon} isActive={location.pathname === '/works'}>
                                Literary Works
                            </NavigationButton>
                        </Link>
                        <Link to="/posters" className='hover:text-gray-300 transition-colors'>
                            <NavigationButton imageId={PostersIcon} isActive={location.pathname === '/posters'}>
                                Achievements
                            </NavigationButton>
                        </Link>
                        <Link to="/contact" className='hover:text-gray-300 transition-colors'>
                            <NavigationButton imageId={ContactIcon} isActive={location.pathname === '/contact'}>
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
                        <Menu className='h-6 w-6 text-white' />
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <MobileSidebar isOpen={isMenuOpen} onClose={closeMobileSidebar} />
        </section>

    )
}

export default Navbar
