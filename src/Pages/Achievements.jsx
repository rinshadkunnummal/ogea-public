import { memo, useState, useEffect } from 'react'
import ImageCard from '../components/custom/imagecard/ImageCard'
import { Skeleton } from '@/components/ui/skeleton'

const Achievements = memo(() => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://api.chsoutreach.live/api/v1/upload/images')
        const data = await response.json()
        
        if (data.status === 'success') {
          const sortedImages = data.data.images.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
          setImages(sortedImages)
        } else {
          setError('Failed to load images')
        }
      } catch (err) {
        setError('Failed to fetch images')
        console.error('Error fetching images:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (error) {
    return (
      <section className="py-10 px-4 md:px-8 lg:px-16 min-h-screen">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          {error}
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {loading ? (
          Array.from({ length: 9 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[4/5] rounded-xl" />
          ))
        ) : (
          images.map((image) => (
            <ImageCard 
              key={image.publicId} 
              image={image.url} 
              title={image.filename.split('/').pop()} 
            />
          ))
        )}
      </div>
    </section>
  )
})

Achievements.displayName = 'Achievements'

export default Achievements