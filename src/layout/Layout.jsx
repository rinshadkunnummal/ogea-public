import React from 'react'
import Header from '../components/custom/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/custom/footer/Footer'

const Layout = () => {
  return (
    <>
      <section className="header">
        <Header />
      </section>
      <main className='lg:px-10 px-2'>
        <Outlet />
      </main>
      <section>
        <Footer />
      </section>
    </>
  )
}

export default Layout