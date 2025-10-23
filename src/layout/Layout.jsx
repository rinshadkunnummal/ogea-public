import { Analytics } from "@vercel/analytics/react"
import { Outlet } from 'react-router-dom'
import Header from '../components/custom/header/Header'
import Footer from '@/components/custom/footer/Footer'
import CustomCursor from '@/components/custom/cursor/CustomCursor'

const Layout = () => {
  return (
    <>
      {/* <CustomCursor /> */}
      <Header />
      <main className='lg:px-10 px-2'>
        <Analytics />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout