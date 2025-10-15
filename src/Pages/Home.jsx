import React from 'react'
import Swiper from '../components/custom/hero/Hero'
import About from '../components/custom/about/About'
import Contact from './Contact'
import WelcomeAlert from '@/components/custom/welcomealert/WelcomeAlert'

const Home = () => {
  return (
    <section>
      <WelcomeAlert />
      <Swiper />
      <About />
      <Contact />
    </section>
  )
}

export default Home