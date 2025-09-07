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
      <main className="contact-page flex items-center justify-center min-h-[400px]">
        <section className="text-center" aria-live="polite" aria-busy="true">
          <Loader />
        </section>
      </main>
    )
  }

  return (
    <main className="contact-page flex items-center justify-center flex-col leading-normal px-3 sm:px-6 py-6 pt-24">
      <header className="contact-header text-center mb-8">
        <h1 className="text-3xl text-black font-bold mb-4 font-nunito">Contact Us</h1>
        <p className="text-lg text-black mb-6">Get in touch with us!</p>
      </header>
      <section className="contact-content" role="region" aria-labelledby="contact-heading">
        <ContactDetails />
      </section>
    </main>
  )
}

export default Contact
