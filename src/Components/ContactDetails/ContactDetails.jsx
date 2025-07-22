import React from 'react'
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactDetails = () => {
    return (
        <div className='border flex flex-col gap-10 border-gray-300 py-10 px-16 rounded-lg bg-white shadow-md'>
            <div className="phone flex items-center gap-4">
                <Phone className="w-8 h-8 text-green-600" />
                <p className="text-black">+91 72936 52029</p>
            </div>
            <div className="whatsapp flex items-center gap-4">
                <FaWhatsapp className="text-green-500 w-8 h-8" />
                <a className='text-black' href='https://wa.me/919072818060' target='_blank'>+91 9072818060</a>
            </div>
            <div className="email flex items-center gap-4">
                <Mail className="w-8 h-8 text-blue-500" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=chsoutreachboard@gmail.com" target="_blank" rel="noopener noreferrer">chsoutreachboard@gmail.com</a>
            </div>
        </div>
    )
}

export default ContactDetails
