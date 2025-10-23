import details from '@/lib/details'
import { motion } from "motion/react"

const Contact = () => {
  return (
    <motion.section
      id='contact'
      className='py-10 px-4 md:px-8 lg:px-16 flex flex-col justify-center items-center min-h-[90vh]'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {/* Main Title */}
      <header className="text-center mb-12">
        <h2 className='font-bold text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-4'>
          Get in Touch
        </h2>
        <hr className='mx-auto text-gray-300 my-4 w-1/4' />
        <p className='text-gray-500 text-lg md:text-xl max-w-4xl mx-auto'>
          Have questions? Want to collaborate? We'd love to hear from you!
        </p>
      </header>
      {/* Details Section */}
      <div className='max-w-4xl mx-auto mt-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {details.map((detail, index) => (
            <address key={index} className='flex flex-col items-center text-center space-y-4 not-italic'>
              <div className={`w-16 h-16 ${detail.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                <detail.icon className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>{detail.method}</h3>
                <a href={detail.links} className='text-gray-600 text-sm hover:text-gray-900 transition-colors'>
                  {detail.info}
                </a>
              </div>
            </address>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Contact