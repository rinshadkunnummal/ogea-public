import React, { useState, useEffect } from 'react'
import { imagesAPI } from '../services/apiService'
import { posters as staticPosters } from '../assets/posters/posters'
import Loader from '../Components/Loader/Loader.jsx'

const Posters = () => {
    const [posters, setPosters] = useState([])
    const [displayLimit, setDisplayLimit] = useState(8)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadingLess, setLoadingLess] = useState(false)
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Load only static posters, skip API fetching
    useEffect(() => {
        const loadStaticPosters = async () => {
            try {
                setLoading(true)
                
                // Transform static posters to consistent format
                const transformedStaticPosters = staticPosters.map(poster => ({
                    id: poster.id,
                    _id: poster.id,
                    imageUrl: poster.image,
                    title: `Poster ${poster.id}`,
                    description: `Achievement poster ${poster.id}`,
                    category: 'achievement',
                    createdAt: new Date(),
                    source: 'static'
                }))
                
                console.log('Using static posters only:', transformedStaticPosters.length)
                setPosters(transformedStaticPosters)
                setError(null)
            } catch (err) {
                console.error("Error loading static posters:", err)
                setError(`Failed to load posters: ${err.message}`)
                setPosters([])
            } finally {
                setLoading(false)
            }
        }
        
        loadStaticPosters()
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

    const openModal = (poster) => {
        setSelectedImage(poster)
        setIsModalOpen(true)
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setSelectedImage(null)
        setIsModalOpen(false)
        // Restore body scroll when modal is closed
        document.body.style.overflow = 'unset'
    }

    // Close modal on escape key press
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isModalOpen) {
                closeModal()
            }
        }
        
        document.addEventListener('keydown', handleEscapeKey)
        return () => document.removeEventListener('keydown', handleEscapeKey)
    }, [isModalOpen])

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
<<<<<<< HEAD
=======
                    {/* Debug info */}
                    <p className="text-xs text-gray-500 text-center mt-2">
                        Showing {posters.length} static posters
                    </p>
>>>>>>> 28b1b16a2ed885ad34db01712a6ff8e0e5ce7395
                </section>
            </header>

            {/* Posters Grid */}
            <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="region" aria-labelledby="achievements-title" aria-label="Achievement posters gallery">
                {displayedPosters.map((poster) => (
                    <article key={poster.id || poster._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <figure className="relative aspect-[3/4] w-full cursor-pointer" onClick={() => openModal(poster)}>
                            <img 
                                src={poster.imageUrl || poster.image} 
                                alt={poster.title || `Achievement poster ${poster.id || poster._id}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                role="img"
                            />
<<<<<<< HEAD
                            {/* Click indicator */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                    </svg>
                                </div>
                            </div>
=======
>>>>>>> 28b1b16a2ed885ad34db01712a6ff8e0e5ce7395
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
                        No static posters are available at the moment.
                    </p>
                </section>
            )}

            {/* Image Modal */}
            {isModalOpen && selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75" onClick={closeModal}>
                    <div className="relative max-w-4xl max-h-full">
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold z-10"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>
                        
                        {/* Modal image */}
                        <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={selectedImage.imageUrl || selectedImage.image}
                                alt={selectedImage.title || `Achievement poster ${selectedImage.id || selectedImage._id}`}
                                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            />
                            
                            {/* Image info */}
                            {selectedImage.title && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 rounded-b-lg">
                                    <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                                    {selectedImage.description && (
                                        <p className="text-sm text-gray-300 mt-1">{selectedImage.description}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Posters
