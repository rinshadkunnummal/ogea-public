import React from 'react'

const ImageCard = ({ image, title }) => {
  return (
    <div className="image-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  )
}

export default ImageCard