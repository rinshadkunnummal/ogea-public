import React from 'react'
import slidePhoto from '../../assets/coverr.jpg'

const PhotoSlider = () => {
  return (
    <div className='photo-slider w-full flex justify-center items-center py-8'>
      <img src={slidePhoto} alt="Slide" className='w-5/12 rounded-xl' />
    </div>
  )
}

export default PhotoSlider
