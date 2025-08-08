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
                        Showing {posters.length} static posters
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
        </main>
    )
}

export default Posters
