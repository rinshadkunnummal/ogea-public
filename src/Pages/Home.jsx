import React, { useState, useEffect } from 'react'
import Button from '../Components/Button/Button.jsx'
import { posters } from '../assets/posters/posters.js'
import Loader from '../Components/Loader/Loader.jsx'
import PhotoSlider from '../Components/PhotoSlider/PhotoSlider.jsx'

const Home = () => {
    const [loading, setLoading] = useState(true)

    // Simulate initial loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1200) // 1.2 second loading simulation

        return () => clearTimeout(timer)
    }, [])

    // Show loader during initial loading
    if (loading) {
        return (
            <main className="home-page flex justify-center items-center min-h-[400px] ">
                <section className="text-center" aria-live="polite" aria-busy="true">
                    <Loader />
                </section>
            </main>
        )
    }

    return (
        <main className="home-page flex flex-col items-center justify-center gap-5">
            <PhotoSlider/>

            <section className="hero-section w-full max-w-6xl mx-auto flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-12 py-2 border-t border-gray-500" role="banner">
                <header className="hero-content">
                    <h1 className="font-poppins text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black text-center  leading-tight font-medium">
                        Showcasing Students <br />
                        <span className="text-[#413dfa]">Voices and Visuals</span>
                    </h1>
                </header>
                
                <article className="hero-description">
                    <p className='text-sm sm:text-base md:text-lg lg:text-xl text-black text-center leading-relaxed max-w-4xl'>
                        Your destination for exploring the outreach vision of Darul Huda Islamic University. This official platform of the Office of Guidance and External Activities (OGEA) is dedicated to highlighting a wide range of outreach initiatives, academic collaborations, and creative expressions by our students. Here, you'll find regularly updated details on student-led programs, national and international outreach activities, and a showcase of literary and artistic contributions that reflect the intellectual spirit of our campus. With a focus on guidance, excellence, and external engagement, the site serves as a vibrant record of achievements and a gateway to new opportunities. Whether you're seeking inspiration, tracking student performance, or exploring the dynamic role of OGEA, this space is designed to inform, involve, and ignite curiosity across disciplines and communities.
                    </p>
                </article>
            </section>

            <section className="achievements-section w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12" role="region" aria-labelledby="achievements-heading">
                <div className="rounded-lg flex flex-col gap-4 sm:gap-6">
                    <header className="section-header">
                        <h2 id="achievements-heading" className="text-xl sm:text-2xl lg:text-3xl font-medium text-center mb-4 sm:mb-6 text-black font-poppins">
                            Latest Achievements
                        </h2>
                    </header>
                    
                    {/* Posters Grid */}
                    <div className="posters-grid" role="list" aria-label="Achievement posters">
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {posters.slice(-4).reverse().map((poster) => (
                                <article key={poster.id} className="poster-item bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group" role="listitem">
                                    <figure className="poster-image">
                                        <img
                                            src={poster.image}
                                            alt={`Achievement poster ${poster.id}`}
                                            className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                        <figcaption className="sr-only">Achievement poster number {poster.id}</figcaption>
                                    </figure>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Empty State */}
                    {posters.length === 0 && (
                        <aside className="empty-state text-center py-8 sm:py-12" role="status" aria-live="polite">
                            <div className="text-gray-600 text-lg sm:text-xl mb-4">No posters found</div>
                            <p className="text-gray-500 text-sm sm:text-base">Posters will be displayed here once they are added.</p>
                        </aside>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Home
