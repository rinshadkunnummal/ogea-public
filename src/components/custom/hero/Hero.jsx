import React from 'react'
import heroImg from '../../../assets/banners/ANUMODANAM.png'

const Hero = () => {
  return (
    <div className='max-h-[65vw] lg:max-h-[43vw] bg-gray-300 mx-auto md:w-full lg:w-3/4 rounded-md flex items-center justify-center text-2xl font-semibold text-gray-700 overflow-hidden'>
        <img src={heroImg} alt="Hero Banner" className='object-cover w-full h-full rounded-md' />
    </div>
  )
}

export default Hero