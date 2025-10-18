import React from 'react'
import { motion } from "motion/react"
import { useStats } from '../../../lib/stats'
import { Skeleton } from '../../ui/skeleton'
import { Badge } from '../../ui/badge'
import { BookOpen, GraduationCap } from 'lucide-react'
import { PenBox } from 'lucide-react'
import { Library } from 'lucide-react'

const Stats = () => {
  const stats = useStats()

  // Define stat items with icons and colors
  const statItems = [
    {
      label: 'Total',
      value: 59,
      icon: Library,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Penreach',
      value: 30,
      icon: PenBox,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Paperpath',
      value: 16,
      icon: BookOpen,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      label: 'TalentTide',
      value: 13,
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
  ]

  return (
    <motion.section
      id='stats'
      className='py-10 px-4 md:px-8 lg:px-16 bg-gray-50'
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,           // Animation duration
        delay: 0.005,     // Staggered delay - change the 0.005 value
        ease: "easeOut"
      }}
    >
      {/* Main Title */}
      <div className="text-center mb-12">
        <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-4'>
          Statistics
        </h1>
        <hr className='mx-auto text-gray-300 my-4 w-1/4' />
        <p className='text-gray-500 text-lg md:text-xl max-w-4xl mx-auto'>
          See the statistics of programs by our talented students
        </p>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto">
        {stats.loading ? (
          // Loading State
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4,].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Stats Cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-28 px-10 gap-6">
            {statItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className={`${item.bgColor} p-3 rounded-lg`}>
                      <Icon className={`w-6 h-6 ${item.textColor}`} />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-800">
                        {item.value}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {item.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </motion.section>
  )
}

export default Stats