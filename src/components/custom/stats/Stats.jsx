import { memo, useMemo } from 'react'
import { motion } from "motion/react"
import { useStats } from '../../../lib/stats'
import { Skeleton } from '../../ui/skeleton'
import { Badge } from '../../ui/badge'
import { BookOpen, GraduationCap, PenBox, Library } from 'lucide-react'
import CountUp from '../countup/CountUp'

// Stat items configuration
const STAT_ITEMS = [
  {
    label: 'Total',
    value: 63,
    icon: Library,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    label: 'Penreach',
    value: 34,
    icon: PenBox,
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  {
    label: 'Paperpath',
    value: 16,
    icon: BookOpen,
    bgColor: 'bg-red-50',
    textColor: 'text-red-600',
  },
  {
    label: 'TalentTide',
    value: 13,
    icon: GraduationCap,
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
  },
]

// Memoized StatCard component
const StatCard = memo(({ item, delay }) => {
  const Icon = item.icon
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <div className={`${item.bgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${item.textColor}`} />
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-800">
            <CountUp to={item.value} duration={1.5} delay={delay} />
          </p>
          <Badge variant="outline" className="text-xs">
            {item.label}
          </Badge>
        </div>
      </div>
    </div>
  )
})

StatCard.displayName = 'StatCard'

const Stats = () => {
  const stats = useStats()

  return (
    <motion.section
      id='stats'
      className='py-10 px-4 md:px-8 lg:px-16 bg-gray-50'
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
          Statistics
        </h2>
        <hr className='mx-auto text-gray-300 my-4 w-1/4' />
        <p className='text-gray-500 text-lg md:text-xl max-w-4xl mx-auto'>
          See the statistics of programs by our talented students
        </p>
      </header>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto">
        {stats.loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-28 px-15 gap-6">
            {STAT_ITEMS.map((item, index) => (
              <StatCard key={item.label} item={item} delay={index * 0.1} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  )
}

export default Stats