import React from 'react'
import details from '../../../lib/details'

const Footer = () => {
    return (
        <section id="footer" className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8 lg:px-16 py-10 bg-gray-100 text-gray-700">
            <article className="text-center md:text-left">
                <p className="text-sm md:text-base">&copy; 2025 Ogea. All rights reserved.</p>
            </article>
            <article className="text-center md:text-right">
                <p className="text-sm md:text-base">
                    Developed by <a href="https://github.com/inkuit" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200" target="_blank" rel="noopener noreferrer">Inkuit</a>
                </p>
            </article>
        </section>
    )
}

export default Footer