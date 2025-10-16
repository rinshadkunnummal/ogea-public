import React, { useEffect, useState, useMemo } from 'react'
import ArticleCard from '../components/custom/articlecard/ArticleCard'
import { Skeleton } from '../components/ui/skeleton'
import { fetchAndLogArticles } from '../lib/articles.js'
import { Search } from 'lucide-react'

const Works = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const loadArticles = async () => {
    try {
      setLoading(true)
      const data = await fetchAndLogArticles()

      // Handle different response structures
      const articlesData = data?.articles || data?.data?.articles || data || []
      setArticles(articlesData)
      setError(null)
    } catch (err) {
      console.error('Failed to load articles:', err)
      setError('Failed to load articles. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadArticles()
  }, [])

  // Filtered articles based on search and category
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesSearch =
        searchTerm === '' ||
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        filterCategory === 'all' ||
        article.category?.toLowerCase() === filterCategory.toLowerCase()

      return matchesSearch && matchesCategory
    })
  }, [articles, searchTerm, filterCategory])

  return (
    <div className="py-10 px-4 md:px-8 lg:px-16 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-gray-700 mb-4">
          Literary Works
        </h1>
        <hr className="mx-auto text-gray-300 my-4 w-1/4" />
        <p className="text-gray-500 text-lg md:text-xl max-w-4xl mx-auto">
          Explore creative pieces written by our talented students
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 space-y-4">
                {/* Category Badge Skeleton */}
                <Skeleton className="h-6 w-20 rounded-full" />

                {/* Title Skeleton */}
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />

                {/* Content Skeleton */}
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center justify-between pt-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border text-red-700 px-6 py-4 rounded-lg text-center max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {/* Articles Grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto">
          {/* Filtering Section */}
          {articles.length > 0 && (
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="search"
                      type="text"
                      placeholder="Search by title, author, or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article._id || article.id} article={article} />
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl">No articles match your filters</p>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterCategory('all')
                }}
                className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl">No articles found</p>
              <p className="text-gray-400 mt-2">Check back later for new content!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Works