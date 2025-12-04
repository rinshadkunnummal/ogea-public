import React from 'react'
import { Analytics } from "@vercel/analytics/react"
import { Outlet } from 'react-router-dom'
import Header from '../components/custom/header/Header'
import Footer from '@/components/custom/footer/Footer'
import CustomCursor from '@/components/custom/cursor/CustomCursor'

const Layout = () => {
  return (
    <>
      {/* <CustomCursor /> */}
      <section className="header">
        <Header />
      </section>
      <main className='lg:px-7 md:px-5 px-2'>
        <Analytics />
        <Outlet />
      </main>
      <section>
        <Footer />
      </section>
    </>
  )
}

export default Layout