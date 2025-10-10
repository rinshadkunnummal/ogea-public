import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { articlesAPI } from '../lib/apiService'
import Loader from '../Components/Loader/Loader';
import ArticleCard from '../Components/ArticleCard/ArticleCard';
import ArticleFullView from '../Components/ArticleFullView/ArticleFullView';

const Works = () => {
  const { articleId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [showFullView, setShowFullView] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch data from the backend server
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await articlesAPI.getSorted('-createdAt')
        
        // Extract articles from nested data structure
        const articlesData = response.data?.articles || response.articles || response || []
        setArticles(articlesData)
        setError(null)
      } catch (err) {
        console.error("API error:", err);
        const errorMessage = err.message.includes('timeout') 
          ? "The server is taking longer than usual to respond. Please wait a moment and try refreshing the page."
          : "Failed to load articles. Please try again later."
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    
    fetchArticles()
  }, []);

  // Check for article ID in URL and set up full view
  useEffect(() => {
    if (articleId && articles.length > 0) {
      const article = articles.find(a => a._id === articleId)
      if (article) {
        setSelectedArticle(article)
        setShowFullView(true)
      } else {
        // Article not found, redirect to works list
        navigate('/works', { replace: true })
      }
    } else if (!articleId) {
      setShowFullView(false)
      setSelectedArticle(null)
    }
  }, [articleId, articles, navigate])

  // Function to open article full view
  const openArticleView = (article) => {
    navigate(`/works/${article._id}`)
  }

  // Function to go back to articles list
  const backToArticles = () => {
    navigate('/works')
  }

  // Filter articles based on category and search term
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.writer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(articles.map(article => article.category).filter(Boolean))]
  
  return (
    <main className="works-page  p-3 sm:p-6 font-arima" aria-live="polite" aria-busy={loading ? "true" : "false"}>
      {!showFullView ? (
        <>
          <header className="mb-6" role="banner">
            <section aria-labelledby="works-title">
              <h1 id="works-title" className="text-2xl font-bold text-black font-nunito text-center">Literary Works</h1>
              <p className="text-[15px] text-black text-center">Explore creative pieces written by our talented students.</p>
            </section>
          </header>

          {/* Search and Filter Section */}
          <section className="mb-8 bg-white p-4 rounded-lg shadow-md" role="search" aria-labelledby="search-heading">
            <h2 id="search-heading" className="sr-only">Search and filter articles</h2>
            <div className="flex flex-wrap items-center gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <label htmlFor="search-input" className="sr-only">Search articles</label>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search by title, author, or content..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-describedby="search-description"
                />
                <span id="search-description" className="sr-only">
                  Search through article titles, authors, and content
                </span>
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center ">
                <label htmlFor="category-filter" className="sr-only">Filter by category</label>
                <select 
                  id="category-filter"
                  className=" border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  aria-label="Filter articles by category"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Loading State */}
          {loading && (
            <section className="flex justify-center items-center h-64" role="status" aria-live="polite" aria-label="Loading articles">
              <Loader />
            </section>
          )}

          {/* Error State */}
          {error && (
            <section 
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" 
              role="alert" 
              aria-live="assertive"
              aria-label="Error message"
            >
              {error}
            </section>
          )}

          {/* Articles Grid */}
          {!loading && !error && (
            <section role="region" aria-labelledby="works-title" aria-label="Literary works collection">
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Literary articles">
                  {filteredArticles.map((article) => (
                    <article key={article._id} role="listitem">
                      <ArticleCard article={article} />
                    </article>
                  ))}
                </div>
              ) : (
                <aside className="text-center py-12" role="status" aria-live="polite" aria-label="No articles message">
                  <div className="text-black text-xl mb-4">
                    {searchTerm || selectedCategory !== 'all' ? 'No articles match your filters' : 'No articles found'}
                  </div>
                  <p className="text-gray-600">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria.' 
                      : 'Be the first to submit a literary work!'
                    }
                  </p>
                </aside>
              )}
            </section>
          )}
        </>
      ) : (
        /* Full Article View */
        <article role="main" aria-label="Full article view">
          <ArticleFullView article={selectedArticle} />
        </article>
      )}
    </main>
  )
}

export default Works
