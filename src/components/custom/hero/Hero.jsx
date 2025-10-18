import React from 'react'
import { motion } from "motion/react"
import heroImg from '../../../assets/banners/baanner hero.jpg'

const Hero = () => {
  return (
    <motion.div
      className='max-h-[65vw] lg:max-h-[110vh] bg-gray-300 mx-auto md:w-full lg:w-3/4 rounded-md flex items-center justify-center text-2xl font-semibold text-gray-700 overflow-hidden'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,           // Animation duration
        delay: 0.005,     // Staggered delay - change the 0.005 value
        ease: "easeOut"
      }}>
      <img src={heroImg} alt="Hero Banner" className='object-cover w-full h-full rounded-md' />
    </motion.div>
  )
}

export default Hero