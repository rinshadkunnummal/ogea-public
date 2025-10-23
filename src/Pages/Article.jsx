import { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArticleView from '../components/custom/articleview/ArticleView'
import { Skeleton } from '../components/ui/skeleton'
import { Badge } from '../components/ui/badge'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Loading skeleton component
const ArticleLoadingSkeleton = () => (
  <article className="min-h-screen py-10 px-4 md:px-8 lg:px-20 mx-auto max-w-4xl">
    <Badge variant="outline" className="mb-4 animate-pulse">Loading article...</Badge>
    <Skeleton className="h-12 w-3/4 mb-4" />
    <Skeleton className="h-6 w-1/3 mb-8" />
    <div className="space-y-4">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className={`h-4 ${i === 2 ? 'w-5/6' : i === 4 ? 'w-4/5' : 'w-full'}`} />
      ))}
    </div>
  </article>
)

// Error component
const ArticleError = ({ error, onBack }) => (
  <section className="min-h-screen flex flex-col items-center justify-center px-4">
    <Badge variant="destructive" className="mb-4">Error</Badge>
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
    <p className="text-gray-600 mb-6">{error || "The article you're looking for doesn't exist."}</p>
    <button 
      onClick={onBack}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Back to Literary Works
    </button>
  </section>
)

const Article = () => {
  const { articleId } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const handleBackToWorks = useCallback(() => navigate('/works'), [navigate])

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_BASE_URL}/articles/${articleId}`)
        
        // Handle different response structures
        const articleData = response.data?.article || response.data?.data?.article || response.data
        setArticle(articleData)
        setError(null)
      } catch (err) {
        console.error('Failed to load article:', err)
        setError('Failed to load article. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (articleId) fetchArticle()
  }, [articleId])

  if (loading) return <ArticleLoadingSkeleton />
  if (error || !article) return <ArticleError error={error} onBack={handleBackToWorks} />

  return <ArticleView article={article} />
}

export default Article