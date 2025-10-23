import { memo, useMemo } from 'react'
import ImageCard from '../components/custom/imagecard/ImageCard'
import { posters } from '@/lib/posters'

const Posters = memo(() => {
  // Reverse posters array once using useMemo
  const reversedPosters = useMemo(() => posters.slice().reverse(), [])

  return (
    <section className="py-10 px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {reversedPosters.map((poster) => (
          <ImageCard key={poster.id} image={poster.image} title={poster.title} />
        ))}
      </div>
    </section>
  )
})

Posters.displayName = 'Posters'

export default Posters