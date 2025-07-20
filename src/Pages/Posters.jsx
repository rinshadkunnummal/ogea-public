import React, { useState, useEffect } from 'react'
import { posters } from '../assets/posters/posters.js'
import Loader from '../Components/Loader/Loader.jsx'

const Posters = () => {
    const [displayLimit, setDisplayLimit] = useState(4)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadingLess, setLoadingLess] = useState(false)

    // Simulate initial loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000) // 1 second loading simulation

        return () => clearTimeout(timer)
    }, [])

    const handleShowMore = async () => {
        setLoadingMore(true)
        
        // Simulate loading delay for "Show More"
        setTimeout(() => {
            setDisplayLimit(prev => prev + 4)
            setLoadingMore(false)
        }, 500) // 0.5 second loading for show more
    }

    const handleShowLess = () => {
        setLoadingLess(true)
        
        // Simulate loading delay for "Show Less"
        setTimeout(() => {
            setDisplayLimit(4)
            setLoadingLess(false)
        }, 500) // 0.5 second loading for show less
    }

    const displayedPosters = posters.slice(0, displayLimit)
    const hasMorePosters = displayLimit < posters.length

    // Show loader during initial loading
    if (loading) {
        return (
            <div className="posters-page flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                    <Loader />
                </div>
            </div>
        )
    }

    return (
        <div className="posters-page">
            <div className="mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-black font-nunito text-center">Achievements</h1>
              <p className="text-[15px] text-black text-center">Explore programmes by our talented students.</p>
                </div>
            </div>

            {/* Posters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedPosters.map((poster) => (
                    <div key={poster.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <img 
                                src={poster.image} 
                                alt={`Poster ${poster.id}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                    </div>
                ))}
            </div>

            {/* Show More/Less Buttons */}
            {posters.length > 4 && (
                <div className="flex justify-center mt-8 gap-4">
                    {hasMorePosters && !loadingLess && (
                        <button
                            onClick={handleShowMore}
                            disabled={loadingMore}
                            className="px-6 py-3 border-1 border-[#58A0C8] text-[#58A0C8] rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loadingMore ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-[#58A0C8] border-t-transparent rounded-full animate-spin"></div>
                                    Loading...
                                </>
                            ) : (
                                'Show More'
                            )}
                        </button>
                    )}
                    {displayLimit > 4 && !loadingMore && (
                        <button
                            onClick={handleShowLess}
                            disabled={loadingLess}
                            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loadingLess ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Loading...
                                </>
                            ) : (
                                'Show Less'
                            )}
                        </button>
                    )}
                </div>
            )}

            {/* Empty State */}
            {displayedPosters.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-600 text-xl mb-4">No posters found</div>
                    <p className="text-gray-500">Posters will be displayed here once they are added.</p>
                </div>
            )}
        </div>
    )
}

export default Posters
