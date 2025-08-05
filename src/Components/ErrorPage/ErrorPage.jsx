import React from 'react'
import errorImage from '../../assets/404.png'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <main className='min-h-screen flex items-center justify-center bg-white text-gray-800 font-poppins'>
      <section className='text-center flex flex-col items-center'>
        <img src={errorImage} alt="404 Error" className='w-3/5 mb-4' />
        <header>
          <h1 className='text-5xl font-bold mb-4'>Ooooops....!</h1>
          <h2 className='text-xl mb-2'>Page Not Found</h2>
        </header>
        <p className='text-[15px]'>Sorry, the page you are looking for does not exist.</p>
        <NavLink to="/" className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>
          Go to Home
        </NavLink>
      </section>
    </main>
  )
}

export default ErrorPage
