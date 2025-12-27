import { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ArticleView from '../components/custom/articleview/ArticleView'
import { ArticleDetailSkeleton, ErrorMessage } from '@/components/shared'
import { useApi } from '@/hooks'
import { Badge } from '../components/ui/badge'

// Error component
const ArticleError = ({ error, onBack }) => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4">
    <Badge variant="destructive" className="mb-4">Error</Badge>
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
    <p className="text-gray-600 mb-6">{error || "The article you're looking for doesn't exist."}</p>
    <button 
      onClick={onBack}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Back to Literary Works
    </button>
  </div>
)

const Article = () => {
  const { articleId } = useParams()
  const navigate = useNavigate()

  const handleBackToWorks = useCallback(() => navigate('/works'), [navigate])

  const { data: article, loading, error } = useApi(`/articles/${articleId}`, {
    initialData: null,
    transform: (data) => data?.article || data?.data?.article || data,
    immediate: !!articleId
  })

  if (loading) return <ArticleDetailSkeleton />
  if (error || !article) return <ArticleError error={error} onBack={handleBackToWorks} />

  return <ArticleView article={article} />
}

export default Article