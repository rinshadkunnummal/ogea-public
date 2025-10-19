import React from 'react'
import ImageCard from '../components/custom/imagecard/ImageCard'
import { posters } from '@/lib/posters'

const Posters = () => {
  return (
    <section 
      className="py-10 px-4 md:px-8 lg:px-16 min-h-screen">
      {/* Posters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {posters.slice().reverse().map((poster, index) => (
          <ImageCard key={poster.id} image={poster.image} title={poster.title} />
        ))}
      </div>
    </section>
  )
}

export default Posters