import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import NavigationButton from '../NavigationButton/NavigationButton.jsx'
import homeIcon from '../../assets/Dashboard.png'
import WorksIcon from '../../assets/Works.png'
import PostersIcon from '../../assets/Posters.png'
import ContactIcon from '../../assets/Contact.png'

const MobileSidebar = ({ isOpen, onClose }) => {
    const location = useLocation()

    return (
        <>
            {/* Backdrop/Overlay with animation */}
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 md:hidden ${
                    isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />
            
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-[#23272c84] backdrop-blur-xl text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-teal-700/50">
                    <h2 className="text-xl font-poppins font-bold">
                        CHS Outreach <span className="text-teal-300">Board</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-md hover:bg-teal-800/50 transition-all duration-200 hover:scale-110"
                        aria-label="Close menu"
                    >
                        <X className="h-6 w-6 text-white" />
                    </button>
                </div>

                {/* Navigation with stagger animation */}
                <nav className="flex flex-col p-6 space-y-3">
                    {[
                        { to: "/", icon: homeIcon, label: "Home", delay: "50ms" },
                        { to: "/works", icon: WorksIcon, label: "Literary Works", delay: "100ms" },
                        { to: "/posters", icon: PostersIcon, label: "Achievements", delay: "150ms" },
                        { to: "/contact", icon: ContactIcon, label: "Contact", delay: "200ms" }
                    ].map((item, index) => (
                        <div
                            key={item.to}
                            className={`transform transition-all duration-300 ${
                                isOpen 
                                    ? 'translate-x-0 opacity-100' 
                                    : '-translate-x-4 opacity-0'
                            }`}
                            style={{ transitionDelay: isOpen ? item.delay : '0ms' }}
                        >
                            <Link 
                                to={item.to} 
                                className="block hover:text-gray-300 transition-colors duration-200 hover:translate-x-2" 
                                onClick={onClose}
                            >
                                <NavigationButton imageId={item.icon} isActive={location.pathname === item.to}>
                                    {item.label}
                                </NavigationButton>
                            </Link>
                        </div>
                    ))}
                </nav>

                {/* Footer with animation */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 border-t border-teal-700/50 transform transition-all duration-300 ${
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`} style={{ transitionDelay: isOpen ? '250ms' : '0ms' }}>
                    <p className="text-sm text-gray-300 text-center">© 2025 CHS OGEA</p>
                    <p className="text-sm text-gray-200 text-center">
                        Developed By <a href="#" className="text-teal-300 hover:underline transition-colors">Inkuit</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default MobileSidebar
