import React from 'react'
import { useStats } from '../../../lib/stats'
import { Skeleton } from '../../ui/skeleton'
import { Badge } from '../../ui/badge'
import { BookOpen, FileText, Heart, Scroll, Users, MessageSquare, Mail, TrendingUp } from 'lucide-react'

const Stats = () => {
  const stats = useStats()

  // Define stat items with icons and colors
  const statItems = [
    {
      label: 'Total Publications',
      value: stats.totalArticles,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Articles',
      value: stats.articles,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Poems',
      value: stats.poems,
      icon: Heart,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      label: 'Essays',
      value: stats.essays,
      icon: Scroll,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Seminars',
      value: stats.seminars,
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      label: 'Reviews',
      value: stats.reviews,
      icon: MessageSquare,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
    },
    {
      label: 'Letters',
      value: stats.letters,
      icon: Mail,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
    },
  ]

  return (
    <section id='stats' className='py-10 px-4 md:px-8 lg:px-16 bg-gray-50'>
      {/* Main Title */}
      <div className="text-center mb-12">
        <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-4'>
          Publication Statistics
        </h1>
        <hr className='mx-auto text-gray-300 my-4 w-1/4' />
        <p className='text-gray-500 text-lg md:text-xl max-w-4xl mx-auto'>
          See the publication statistics of our talented students
        </p>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto">
        {stats.loading ? (
          // Loading State
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-28 px-10 gap-6">
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
                      <Badge variant="outline" className="mt-2 text-xs">
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
    </section>
  )
}

export default Stats