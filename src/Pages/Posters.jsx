import React from 'react'
import ImageCard from '../components/custom/imagecard/ImageCard'
import { posters } from '@/assets/posters/posters'

const Posters = () => {
  return (
    <div className="posters grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posters.slice().reverse().map(poster => (
        <ImageCard key={poster.id} image={poster.image} title={poster.title} className={"shadow-2xl"} />
      ))}
    </div>
  )
}

export default Posters