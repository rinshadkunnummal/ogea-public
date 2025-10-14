import React from 'react'

const ImageCard = ({ image, title, className }) => {
  return (
    <div className={`image-card ${className} rounded-xl`}>
      <img src={image} alt={title} className='rounded-xl'/>
      <h3>{title}</h3>
    </div>
  )
}

export default ImageCard