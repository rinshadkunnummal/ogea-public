import React, { useState, useEffect } from 'react'
import Button from '../Components/Button/Button.jsx'
import { posters } from '../assets/posters/posters.js'
import Loader from '../Components/Loader/Loader.jsx'

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
            <div className="home-page flex justify-center items-center min-h-[400px] p-3 sm:p-6">
                <div className="text-center">
                    <Loader />
                </div>
            </div>
        )
    }

    return (
        <div className="home-page py-10  flex flex-col items-center justify-center gap-5">
            <div className="info w-5/6 rounded-2xl flex flex-col justify-center items-center sm:items-start gap-3 lg:gap-6 h-[85vh] px-3 sm:px-6 lg:px-12 ">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl text-black font-semibold text-center sm:text-left">Showcasing Students <br />
                    <span className="text-[#413dfa] "> Voices and Visuals</span>
                </h1>
                <p className='text-lg sm:text-xl text-black text-center sm:text-left'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eos exercitationem architecto in accusamus nulla cum eius ratione impedit consequatur, consequuntur, molestiae tempore vero enim corporis quibusdam eveniet perspiciatis. Exercitationem? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, optio sit? Amet est ea tenetur consectetur recusandae debitis nam in assumenda delectus deleniti, accusamus voluptate facilis sint minus velit quis?
                </p>
                <Button className={'mb-4 px-4 py-2 rounded-md bg-[#23272c] text-gray-100'}>
                    <a href="https://drive.google.com/drive/folders/1z-Q5CfkDy-2D0T9tDwXYXL6Uv1jrkkSk?usp=drive_link" className="text-white" target="_blank">   Trace Your Programmes</a>
                </Button>
            </div>
            <div className="px-3 rounded-lg flex flex-col gap-2">
                <h2 className="text-2xl font-medium text-center mb-2 text-black font-poppins">Latest Achievements</h2>
                {/* Posters Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posters.slice(-4).reverse().map((poster) => (
                        <div key={poster.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={poster.image}
                                alt={`Poster ${poster.id}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {posters.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-600 text-xl mb-4">No posters found</div>
                        <p className="text-gray-500">Posters will be displayed here once they are added.</p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Home
