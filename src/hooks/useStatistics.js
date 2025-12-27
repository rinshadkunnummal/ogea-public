import { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Custom hook to fetch statistics from API
 * @returns {Object} - { loading, stats, error }
 */
export const useStatistics = () => {
  const [data, setData] = useState({ loading: true, stats: null, error: null })

  useEffect(() => {
    const controller = new AbortController()

    const fetchStatistics = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/statistics`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch statistics: ${response.statusText}`)
        }

        const responseData = await response.json()
        const stats = responseData?.data?.statistics?.[0] || null
        setData({ loading: false, stats, error: null })
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error('Error fetching statistics:', error)
        setData({ loading: false, stats: null, error: error.message })
      }
    }

    fetchStatistics()

    return () => controller.abort()
  }, [])

  return data
}

export default useStatistics
