import React from 'react'
import Swiper from '../components/custom/hero/Hero'
import About from '../components/custom/about/About'
import Contact from './Contact'

const Home = () => {
  return (
    <section>
      <Swiper />
      <About />
      <Contact />
    </section>
  )
}

export default Home