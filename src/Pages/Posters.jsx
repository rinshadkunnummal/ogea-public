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
            key={poster.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
            transition={{
              duration: 0.4,
              delay: Math.min(index * 0.03, 0.5),
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <ImageCard image={poster.image} title={poster.title} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Posters