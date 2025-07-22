import React from 'react'

const NavigationButton = ({children, className, imageId, isActive}) => {
  return (
    <div className={`navigation-button flex flex-row gap-3 text-center items-center p-2 rounded-2xl hover:text-gray-500 duration-500 transition-colors ${isActive ? 'text-gray-500' : ''} ${className}`}>
      <p className='font-nunito text-lg'>
        {children}
      </p>
    </div>
  )
}

export default NavigationButton
