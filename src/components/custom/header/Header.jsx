import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import links from '../../../lib/links'
import { Menu, X } from 'lucide-react'
import logoImg from '/logo.svg'

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('nav')) {
                setIsMobileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isMobileMenuOpen])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <header className="bg-white shadow-md w-full sm:w-3/4 lg:w-1/2 mx-auto my-2 rounded-lg font-quicksand sticky top-2 z-50">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-gray-800 flex-shrink-0">
                        <NavLink 
                            to="/" 
                            onClick={closeMobileMenu}
                            className="block"
                        >
                            <img 
                                src={logoImg} 
                                alt="OGEA Logo" 
                                className="h-8 md:h-10 w-auto"
                            />
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex space-x-6">
                        {links.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `px-3 py-2 rounded-xl transition-colors duration-200 font-medium ${
                                            isActive
                                                ? 'text-gray-900'
                                                : 'text-gray-600 '
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-800" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-800" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
                        onClick={closeMobileMenu}
                    />
                )}

                {/* Mobile Menu Dropdown */}
                <div
                    className={`
                        lg:hidden absolute left-0 right-0 top-full mt-2 mx-2
                        bg-white rounded-lg shadow-lg overflow-hidden
                        transition-all duration-300 ease-in-out z-50
                        ${isMobileMenuOpen 
                            ? 'opacity-100 translate-y-0 visible' 
                            : 'opacity-0 -translate-y-2 invisible'
                        }
                    `}
                >
                    <ul className="py-2">
                        {links.map((link, index) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    onClick={closeMobileMenu}
                                    className={({ isActive }) =>
                                        `block px-6 py-3 text-base transition-colors duration-200 ${
                                            isActive 
                                                ? 'text-gray-900 bg-gray-100 font-semibold border-l-4 border-gray-700' 
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                                {index < links.length - 1 && (
                                    <div className="border-b border-gray-100 mx-4" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header