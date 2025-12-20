import { memo, useMemo, useState, useEffect } from 'react'
import { motion } from "motion/react"
import { Skeleton } from '../../ui/skeleton'
import { BookOpen, GraduationCap, PenBox, Library } from 'lucide-react'
import CountUp from '../countup/CountUp'

// Stat items configuration template
const STAT_CONFIG = [
  {
    label: 'Total',
    description: 'All Achievements',
    key: 'totalCount',
    icon: Library,
    color: 'blue',
  },
  {
    label: 'Penreach',
    description: 'Publications',
    key: 'penreachCount',
    icon: PenBox,
    color: 'indigo',
  },
  {
    label: 'Paperpath',
    description: 'Seminar Papers',
    key: 'paperpathCount',
    icon: BookOpen,
    color: 'amber',
  },
  {
    label: 'TalentTide',
    description: 'Student Spotlights',
    key: 'talenttideCount',
    icon: GraduationCap,
    color: 'emerald',
  },
]

// Custom hook to fetch statistics from API
const useStatistics = () => {
  const [data, setData] = useState({ loading: true, stats: null, error: null })

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        const response = await fetch(`${apiBaseUrl}/statistics`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch statistics: ${response.statusText}`)
        }
        
        const response_data = await response.json()
        console.log('API Response:', response_data)
        const stats = response_data?.data?.statistics?.[0] || null
        console.log('Extracted stats:', stats)
        setData({ loading: false, stats, error: null })
      } catch (error) {
        console.error('Error fetching statistics:', error)
        setData({ loading: false, stats: null, error: error.message })
      }
    }

    fetchStatistics()
  }, [])

  return data
}

const colorMap = {
  blue: { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100' },
  indigo: { bg: 'bg-indigo-600', light: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-100' },
  amber: { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
  emerald: { bg: 'bg-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100' },
}

// Memoized StatCard component
const StatCard = memo(({ item, delay, index }) => {
  const Icon = item.icon
  const colors = colorMap[item.color]
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative"
    >
      <div className={`absolute -inset-0.5 ${colors.bg} rounded-2xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-300`} />
      <div className="relative bg-white rounded-2xl p-8 ring-1 ring-gray-200 hover:ring-2 hover:ring-offset-2 transition-all duration-300 cursor-default text-center">
        
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.light} ${colors.text} rounded-xl mb-5 ring-4 ${colors.ring} mx-auto`}>
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
        
        {/* Value */}
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-5xl text-gray-900 tracking-tight">
            <CountUp to={item.value} duration={1.5} delay={delay} />
          </span>
        </div>
        
        {/* Label & Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.label}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>
    </motion.div>
  )
})

StatCard.displayName = 'StatCard'

// Skeleton Card component
const SkeletonCard = memo(({ index }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-2xl p-8 ring-1 ring-gray-200 flex flex-col items-center text-center"
  >
    <Skeleton className="w-12 h-12 rounded-xl mb-5" />
    <Skeleton className="h-12 w-24 mb-3" />
    <Skeleton className="h-5 w-20 mb-2" />
    <Skeleton className="h-4 w-28" />
  </motion.div>
))

SkeletonCard.displayName = 'SkeletonCard'

const Stats = () => {
  const { loading, stats, error } = useStatistics()

  // Build stat items from API data
  const statItems = useMemo(() => {
    return STAT_CONFIG.map(item => ({
      ...item,
      value: stats?.[item.key] ?? 0
    }))
  }, [stats])

  return (
    <section
      id='stats'
      className='py-24 px-4 md:px-8 lg:px-16 bg-gray-50/50'
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <h2 className='font-bold text-4xl md:text-5xl text-gray-900 mb-6 tracking-tight'>
            Statistics
          </h2>
          <p className='text-gray-600 text-xl leading-relaxed'>
            Numbers that reflect the dedication and talent of our students
          </p>
        </motion.div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statItems.map((item, index) => (
              <StatCard key={item.label} item={item} delay={index * 0.1} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Stats