import React from 'react'
import ImageCard from '../components/custom/imagecard/ImageCard'
import { posters } from '@/lib/posters'
import { motion } from "motion/react"

const Posters = () => {

  return (
    <div className="py-10 px-4 md:px-8 lg:px-16 min-h-screen">
      {/* Posters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {posters.slice().reverse().map((poster, index) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ImageCard image={poster.image} title={poster.title} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Posters