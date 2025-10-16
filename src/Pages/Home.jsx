import React from 'react'
import Swiper from '../components/custom/hero/Hero'
import About from '../components/custom/about/About'
import Contact from './Contact'
import WelcomeAlert from '@/components/custom/welcomealert/WelcomeAlert'
import Stats from '@/components/custom/stats/Stats'

const Home = () => {
  return (
    <section>
      <WelcomeAlert />
      <Swiper />
      <About />
      <Stats />
      <Contact />
    </section>
  )
}

export default Home