import { memo } from 'react'

const ImageCard = memo(({ image, title, className = '' }) => {
  return (
    <figure className={`image-card ${className} rounded-xl`}>
      <img src={image} alt={title || 'OGEA achievement poster'} className='rounded-xl' loading="lazy" />
      {title && <figcaption className="sr-only">{title}</figcaption>}
    </figure>
  )
})

ImageCard.displayName = 'ImageCard'

export default ImageCard