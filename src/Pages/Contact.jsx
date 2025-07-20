import React, { useState, useEffect } from 'react'
import ContactDetails from '../Components/ContactDetails/ContactDetails'
import Loader from '../Components/Loader/Loader.jsx'

const Contact = () => {
  const [loading, setLoading] = useState(true)

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000) // 1 second loading simulation

    return () => clearTimeout(timer)
  }, [])

  // Show loader during initial loading
  if (loading) {
    return (
      <div className="contact-page flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <div className="contact-page flex  items-center justify-center flex-col p-6 leading-normal">
      <h1 className="text-3xl text-black font-bold mb-4 font-nunito">Contact</h1>
      <p className="text-lg text-black mb-6">Get in touch with us!</p>
      <ContactDetails />
    </div>
  )
}

export default Contact
