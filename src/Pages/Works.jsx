import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Components/Loader/Loader';

const Works = () => {
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

  // Function to open article full view
  const openArticleView = (article) => {
    setSelectedArticle(article)
    setShowFullView(true)
  }

  // Function to go back to articles list
  const backToArticles = () => {
    setShowFullView(false)
    setSelectedArticle(null)
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

  // Article Card Component
  const ArticleCard = ({ article }) => (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" role="listitem">
      <div className="p-6">
        <header>
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-nunito break-words whitespace-pre-line">
            {article.title || 'Untitled Article'}
          </h3>
          {article.writer && (
            <address className="text-sm text-blue-600 mb-3 font-medium not-italic">
              By {article.writer}
            </address>
          )}
        </header>
        
        <p className="text-gray-600 mb-4 line-clamp-4 whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: article.content ? (article.content.substring(0, 200) + '...').replace(/<\/?[^>]+(>|$)/g, "<br>", "<hr>") : 'No content available'
          }}
        >
        </p>
        
        <footer className="flex justify-between items-center mb-4">
          {article.category && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full capitalize" role="tag">
              {article.category}
            </span>
          )}
          {article.createdAt && (
            <time dateTime={article.createdAt} className="text-gray-500 text-sm">
              {new Date(article.createdAt).toLocaleDateString()}
            </time>
          )}
        </footer>
        
        <button 
          onClick={() => openArticleView(article)}
          className="w-full bg-[#23272c] text-white py-2 px-4 rounded-md hover:bg-[#41474b] transition-colors duration-200"
          aria-label={`Read full ${article.category || 'article'}: ${article.title}`}
        >
          Read Full {article.category}
        </button>
      </div>
    </article>
  )

  return (
    <main className="works-page">
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
              <div className="flex-1 min-w-64">
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
              <div className="flex items-center gap-2">
                <label htmlFor="category-filter" className="font-medium text-gray-700">Filter:</label>
                <select 
                  id="category-filter"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        <article className="full-article-view">
          <nav className="mb-6">
            <button 
              onClick={backToArticles}
              className="flex items-center text-black hover:text-gray-300 transition-colors mb-4"
              aria-label="Go back to articles list"
            >
              <span className="mr-2" aria-hidden="true">←</span> Back
            </button>
          </nav>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <header className="mb-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 font-nunito break-words whitespace-pre-line">
                {selectedArticle.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                {selectedArticle.writer && (
                  <address className="text-blue-600 font-medium text-lg not-italic">
                    By {selectedArticle.writer}
                  </address>
                )}
                {selectedArticle.createdAt && (
                  <time dateTime={selectedArticle.createdAt} className="text-lg">
                    {new Date(selectedArticle.createdAt).toLocaleDateString()}
                  </time>
                )}
                {selectedArticle.category && (
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full capitalize" role="tag">
                    {selectedArticle.category}
                  </span>
                )}
              </div>
            </header>

            <section className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed break-words whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: selectedArticle.content ? selectedArticle.content.replace(/<\/?[^>]+(>|$)/g, "<br />", "<hr>") : 'No content available'
              }}
              >
              </p>
            </section>
          </div>
        </article>
      )}
    </main>
  )
}

export default Works
