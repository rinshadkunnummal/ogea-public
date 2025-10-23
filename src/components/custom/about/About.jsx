import { memo } from 'react'
import logoImg from '../../../assets/banners/baaner.jpg'
import { motion } from "motion/react"

const About = memo(() => {
    return (
        <motion.section
            id='about'
            className='py-10 px-4 md:px-8 lg:px-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
            }}
        >
            {/* Main Title */}
            <div className="text-center mb-12">
                <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-4'>
                    About OGEA
                </h1>
                <hr className='mx-auto text-gray-300 my-4 w-1/4' />
                <p className='text-gray-500 text-lg md:text-xl max-w-4xl mx-auto'>
                    Where innovation meets creativity, and dreams transform into reality
                </p>
            </div>

            {/* Vision Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-16">
                {/* Left Content - Our Vision */}
                <div className="space-y-6">
                    <div className="flex items-start gap-3">
                        <div className='w-1 h-8 bg-gradient-to-b from-red-500 to-blue-500 rounded-full flex-shrink-0'></div>
                        <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
                            Our Vision
                        </h2>
                    </div>

                    <p className='text-gray-600 text-base md:text-lg leading-relaxed'>
                        The Office of Guidance and External Activities (OGEA) serves as a key link between the campus and the outside world. It guides students in career planning, higher studies, and personal growth. The office organizes workshops, seminars, and training sessions, helps students secure internships and placements, and builds partnerships with industries and institutions. Through its initiatives, OGEA ensures students are well-prepared to face real-world challenges and explore new opportunities beyond academics.
                    </p>
                </div>

                {/* Right Content - Festival Image */}
                <div className="flex justify-center lg:justify-end rounded-lg">
                    <div className="relative w-full max-w-md">
                        <div className='shadow-lg hover:shadow-xl transition-shadow duration-300'>
                            <div className='bg-white rounded-2xl flex flex-col items-center justify-center'>
                                <img src={logoImg} alt="OGEA Banner" className="w-full h-full rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
})

About.displayName = 'About'

export default About