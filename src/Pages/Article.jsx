import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArticleView from '../components/custom/articleview/ArticleView'
import { Skeleton } from '../components/ui/skeleton'
import { Badge } from '../components/ui/badge'
import axios from 'axios'

const Article = () => {
  const { articleId } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
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

    if (articleId) {
      fetchArticle()
    }
  }, [articleId])

  if (loading) {
    return (
      <div className="min-h-screen py-10 px-4 md:px-8 lg:px-20 mx-auto max-w-4xl">
        <Badge variant="outline" className="mb-4 animate-pulse">Loading article...</Badge>
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <Badge variant="destructive" className="mb-4">Error</Badge>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-6">{error || 'The article you\'re looking for doesn\'t exist.'}</p>
        <button 
          onClick={() => navigate('/works')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Literary Works
        </button>
      </div>
    )
  }

  return (
    <div>
      <ArticleView article={article} />
    </div>
  )
}

export default Article