import React, { useState, useEffect } from 'react'
import { imagesAPI } from '../services/apiService'
import Loader from '../Components/Loader/Loader.jsx'

const Posters = () => {
    const [posters, setPosters] = useState([])
    const [displayLimit, setDisplayLimit] = useState(8)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadingLess, setLoadingLess] = useState(false)
    const [error, setError] = useState(null)

    // Fetch posters from API with fallback to static data
    useEffect(() => {
        const fetchPosters = async () => {
            try {
                setLoading(true)
                console.log('Attempting to fetch images from API: http://192.168.20.59:2000/api/v1/images')
                const response = await imagesAPI.getSorted('-createdAt')
                console.log('Images API Response:', response)
                
                // Extract images from the specific API response structure
                const imagesData = response.data?.images || []
                console.log('Extracted images data:', imagesData)
                console.log('Number of API images:', imagesData.length)
                
                if (imagesData.length > 0) {
                    console.log('Using API images (Cloudinary)')
                    // Transform API images to poster format based on the actual API structure
                    const transformedPosters = imagesData.map(image => ({
                        id: image.publicId || image.filename,
                        _id: image.publicId || image.filename,
                        imageUrl: image.url,
                        title: image.filename || image.publicId,
                        description: `${image.format.toUpperCase()} image - ${image.width}x${image.height}`,
                        category: 'achievement',
                        createdAt: image.uploadedAt
                    }))
                    setPosters(transformedPosters)
                    setError(null)
                } else {
                    console.log('No API images found')
                    // Don't show static posters, just show empty state
                    setPosters([])
                    setError("No images available from API")
                }
            } catch (err) {
                console.error("API error:", err);
                setError(`API unavailable: ${err.message}`)
                // Don't fallback to static posters, show empty state
                setPosters([])
            } finally {
                setLoading(false)
            }
        }
        
        fetchPosters()
    }, [])

    const handleShowMore = async () => {
        setLoadingMore(true)
        
        // Simulate loading delay for "Show More"
        setTimeout(() => {
            setDisplayLimit(prev => prev + 8)
            setLoadingMore(false)
        }, 500) // 0.5 second loading for show more
    }

    const handleShowLess = () => {
        setLoadingLess(true)
        
        // Simulate loading delay for "Show Less"
        setTimeout(() => {
            setDisplayLimit(8)
            setLoadingLess(false)
        }, 500) // 0.5 second loading for show less
    }

    const displayedPosters = posters.slice().reverse().slice(0, displayLimit)
    const hasMorePosters = displayLimit < posters.length

    // Show loader during initial loading
    if (loading) {
        return (
            <main className="posters-page flex justify-center items-center min-h-[400px]" aria-live="polite" aria-busy="true">
                <section className="text-center" role="status" aria-label="Loading posters">
                    <Loader />
                </section>
            </main>
        )
    }

    return (
        <main className="posters-page px-3 sm:px-6" aria-live="polite" aria-busy="false">
            <header className="mb-6">
                <section role="banner" aria-labelledby="achievements-title">
                    <h1 id="achievements-title" className="text-3xl font-bold text-black font-nunito text-center">Achievements</h1>
                    <p className="text-[15px] text-black text-center">Explore programmes by our talented students.</p>
                    {error && (
                        <p className="text-xs text-orange-600 text-center mt-2">{error}</p>
                    )}
                    {/* Debug info */}
                    <p className="text-xs text-gray-500 text-center mt-2">
                        Showing {posters.length} posters | 
                        Source: {posters.length > 0 && posters[0].imageUrl ? 'API Images (Cloudinary)' : 'Static Files'} |
                        Endpoint: http://192.168.20.59:2000/api/v1/images
                    </p>
                </section>
            </header>

            {/* Posters Grid */}
            <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="region" aria-labelledby="achievements-title" aria-label="Achievement posters gallery">
                {displayedPosters.map((poster) => (
                    <article key={poster.id || poster._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <figure className="relative">
                            <img 
                                src={poster.imageUrl || poster.image} 
                                alt={poster.title || `Achievement poster ${poster.id || poster._id}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                role="img"
                            />
                            {poster.title && (
                                <figcaption className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-sm">
                                    {poster.title}
                                </figcaption>
                            )}
                        </figure>
                    </article>
                ))}
            </section>

            {/* Show More/Less Buttons */}
            {posters.length > 8 && (
                <nav className="flex justify-center mt-8 gap-4" role="navigation" aria-label="Poster pagination controls">
                    {hasMorePosters && !loadingLess && (
                        <button
                            onClick={handleShowMore}
                            disabled={loadingMore}
                            className="px-6 py-3 border-1 border-[#58A0C8] text-[#58A0C8] rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            aria-label="Show more achievement posters"
                        >
                            {loadingMore ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-[#58A0C8] border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                                    <span aria-live="polite">Loading...</span>
                                </>
                            ) : (
                                'Show More'
                            )}
                        </button>
                    )}
                    {displayLimit > 8 && !loadingMore && (
                        <button
                            onClick={handleShowLess}
                            disabled={loadingLess}
                            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            aria-label="Show fewer achievement posters"
                        >
                            {loadingLess ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                                    <span aria-live="polite">Loading...</span>
                                </>
                            ) : (
                                'Show Less'
                            )}
                        </button>
                    )}
                </nav>
            )}

            {/* Empty State */}
            {displayedPosters.length === 0 && (
                <section className="text-center py-12" role="region" aria-live="polite" aria-label="Empty state message">
                    <div className="text-gray-600 text-xl mb-4">No posters available</div>
                    <p className="text-gray-500">
                        {error ? 
                            'Unable to load posters from API. Please check your connection or try again later.' : 
                            'No posters have been uploaded yet. Visit the admin panel to add new posters.'
                        }
                    </p>
                </section>
            )}
        </main>
    )
}

export default Posters
