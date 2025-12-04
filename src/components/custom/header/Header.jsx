import { useState, useEffect, useCallback, memo } from 'react'
import { NavLink } from 'react-router-dom'
import links from '../../../lib/links'
import { X } from 'lucide-react'
import Hamburger from 'hamburger-react'
import logoImg from '/logo.svg'

// Memoized NavItem component
const NavItem = memo(({ link, onClick, isMobile = false }) => (
  <NavLink
    to={link.path}
    onClick={onClick}
    className={({ isActive }) =>
      isMobile
        ? `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
            isActive 
              ? 'text-white bg-gray-900 shadow-md' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          }`
        : `px-3 py-2 rounded-xl transition-colors duration-200 font-medium ${
            isActive ? 'text-gray-900' : 'text-gray-600'
          }`
    }
  >
    {link.name}
  </NavLink>
))

NavItem.displayName = 'NavItem'

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

    // Combined effect for all side effects
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) closeMobileMenu()
        }

        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('nav')) {
                closeMobileMenu()
            }
        }

        // Prevent body scroll when mobile menu is open
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'

        window.addEventListener('resize', handleResize)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('resize', handleResize)
            document.removeEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen, closeMobileMenu])

    return (
        <header className="bg-white shadow-md w-full sm:w-4/5 lg:w-3/5 mx-auto my-2 rounded-lg font-quicksand sticky top-2 z-50">
            <nav className="container mx-auto px-2 py-4">
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
                    <ul className="hidden md:flex space-x-1 lg:space-x-4">
                        {links.map((link) => (
                            <li key={link.path}>
                                <NavItem link={link} />
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="block md:hidden">
                        <Hamburger
                            toggled={isMobileMenuOpen}
                            toggle={setIsMobileMenuOpen}
                            size={24}
                        />
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                        onClick={closeMobileMenu}
                    />
                )}

                {/* Mobile Menu Sheet */}
                <div
                    className={`
                        md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw]
                        bg-white shadow-2xl overflow-hidden
                        transition-transform duration-300 ease-in-out z-50
                        ${isMobileMenuOpen 
                            ? 'translate-x-0' 
                            : 'translate-x-full'
                        }
                    `}
                >
                    {/* Sheet Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <img 
                                src={logoImg} 
                                alt="OGEA Logo" 
                                className="h-8 w-auto"
                            />
                        </div>
                        <button
                            onClick={closeMobileMenu}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Close menu"
                        >
                            <X className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-6">
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link.path}>
                                    <NavItem link={link} onClick={closeMobileMenu} isMobile />
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Sheet Footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
                        <p className="text-sm text-gray-500 text-center">
                            © 2025 OGEA. All rights reserved.
                        </p>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header