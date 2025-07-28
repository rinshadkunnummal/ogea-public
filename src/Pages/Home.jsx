import React, { useState, useEffect } from 'react'
import Button from '../Components/Button/Button.jsx'
import { posters } from '../../public/assets/posters/posters.js'
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
            <main className="home-page flex justify-center items-center min-h-[400px] p-3 sm:p-6 pt-24">
                <section className="text-center">
                    <Loader />
                </section>
            </main>
        )
    }

    return (
        <main className="home-page pt-24 pb-8 sm:pb-12 lg:pb-20 flex flex-col items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            <PhotoSlider />

            <section className="hero-section w-full max-w-6xl mx-auto rounded-2xl flex flex-col justify-center items-center gap-4 sm:gap-6 lg:gap-8 min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] px-4 sm:px-6 lg:px-12">
                <header className="hero-content">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black font-semibold text-center sm:text-left leading-tight">
                        Showcasing Students <br />
                        <span className="text-[#413dfa]">Voices and Visuals</span>
                    </h1>
                </header>
                
                <div className="hero-description">
                    <p className='text-sm sm:text-base md:text-lg lg:text-xl text-black text-center sm:text-left leading-relaxed max-w-4xl'>
                        Your destination for exploring the outreach vision of Darul Huda Islamic University. This official platform of the Office of Guidance and External Activities (OGEA) is dedicated to highlighting a wide range of outreach initiatives, academic collaborations, and creative expressions by our students. Here, you'll find regularly updated details on student-led programs, national and international outreach activities, and a showcase of literary and artistic contributions that reflect the intellectual spirit of our campus. With a focus on guidance, excellence, and external engagement, the site serves as a vibrant record of achievements and a gateway to new opportunities. Whether you're seeking inspiration, tracking student performance, or exploring the dynamic role of OGEA, this space is designed to inform, involve, and ignite curiosity across disciplines and communities.
                    </p>
                </div>
                
                <nav className="hero-cta">
                    <Button className={'mb-4 px-4 py-2 sm:px-6 sm:py-3 rounded-md bg-[#23272c] text-gray-100 hover:bg-[#2a2f35] transition-colors duration-300'}>
                        <a href="https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk?usp=drive_link" 
                           className="text-white text-sm sm:text-base" 
                           target="_blank" 
                           rel="noopener noreferrer">
                            Trace Your Programmes
                        </a>
                    </Button>
                </nav>
            </section>

            <section className="achievements-section w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="rounded-lg flex flex-col gap-4 sm:gap-6">
                    <header className="section-header">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-center mb-4 sm:mb-6 text-black font-poppins">
                            Latest Achievements
                        </h2>
                    </header>
                    
                    {/* Posters Grid */}
                    <div className="posters-grid">
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {posters.slice(-4).reverse().map((poster) => (
                                <article key={poster.id} className="poster-item bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    <figure className="poster-image">
                                        <img
                                            src={poster.image}
                                            alt={`Achievement poster ${poster.id}`}
                                            className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </figure>
                                </article>
                            ))}
                        </div>
                    </div>

                    {/* Empty State */}
                    {posters.length === 0 && (
                        <div className="empty-state text-center py-8 sm:py-12">
                            <div className="text-gray-600 text-lg sm:text-xl mb-4">No posters found</div>
                            <p className="text-gray-500 text-sm sm:text-base">Posters will be displayed here once they are added.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Home
