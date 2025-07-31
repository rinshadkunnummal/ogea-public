import React from 'react'

const ErrorPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 font-poppins'>
      <h1 className='text-4xl font-bold mb-4'>Error 404: Page Not Found</h1>
      <p className='text-lg'>Sorry, the page you are looking for does not exist.</p>
    </div>
  )
}

export default ErrorPage
