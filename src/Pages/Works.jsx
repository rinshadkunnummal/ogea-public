import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';
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
        const response = await axios.get("https://ogea-api.onrender.com/api/v1/articles?sort=-createdAt")
        
        // Extract articles from nested data structure
        const articlesData = response.data.data?.articles || response.data.articles || response.data || []
        setArticles(articlesData)
        setError(null)
      } catch (err) {
        console.error("Axios error:", err);
        setError("Failed to load articles. Please try again later.")
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
    <main className="works-page  p-3 sm:p-6">
      {!showFullView ? (
        <>
          <header className="mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black font-nunito text-center">Literary Works</h1>
              <p className="text-[15px] text-black text-center">Explore creative pieces written by our talented students.</p>
            </div>
          </header>

          {/* Search and Filter Section */}
          <section className="mb-8 bg-white p-4 rounded-lg shadow-md" role="search">
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
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center ">
                <select 
                  id="category-filter"
                  className=" border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
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
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Articles Grid */}
          {!loading && !error && (
            <section>
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Literary articles">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12" role="status" aria-live="polite">
                  <div className="text-black text-xl mb-4">
                    {searchTerm || selectedCategory !== 'all' ? 'No articles match your filters' : 'No articles found'}
                  </div>
                  <p className="text-gray-600">
                    {searchTerm || selectedCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria.' 
                      : 'Be the first to submit a literary work!'
                    }
                  </p>
                </div>
              )}
            </section>
          )}
        </>
      ) : (
        /* Full Article View */
        <ArticleFullView article={selectedArticle} />
      )}
    </main>
  )
}

export default Works
