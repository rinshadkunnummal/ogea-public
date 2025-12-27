import { memo, useEffect, useCallback } from 'react'
import { ArrowLeft, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../../ui/badge'
import { decodeHtmlPreserveStructure } from '@/lib/utils'

// Content styling classes extracted for maintainability
const contentStyles = `
  content mt-8 text-gray-700 text-base md:text-lg max-w-none whitespace-pre-wrap
  [&_h1]:text-2xl [&_h1]:md:text-3xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:leading-tight
  [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:leading-tight
  [&_h3]:text-lg [&_h3]:md:text-xl [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:leading-snug
  [&_h4]:text-base [&_h4]:md:text-lg [&_h4]:font-semibold [&_h4]:text-gray-700 [&_h4]:mt-4 [&_h4]:mb-2
  [&_p]:mb-4 [&_p]:leading-[1.8] [&_p]:text-justify
  [&_p:last-child]:mb-0
  [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ul]:space-y-2
  [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_ol]:space-y-2
  [&_li]:leading-relaxed
  [&_strong]:font-bold [&_strong]:text-gray-900
  [&_em]:italic
  [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800 [&_a]:transition-colors
  [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-gray-600
  [&_br]:block [&_br]:content-[''] [&_br]:my-2
`

const ArticleView = memo(({ article }) => {
  const navigate = useNavigate()

  const handleBack = useCallback(() => navigate('/works'), [navigate])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <article className='min-h-screen py-10 px-4 md:px-8 lg:px-20 mx-auto max-w-4xl font-manjari'>
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200"
        aria-label="Back to Literary Works"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Category Badge */}
      {article.category && (
        <div className="mb-4">
          <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 text-sm capitalize">
            {article.category}
          </Badge>
        </div>
      )}

      {/* Title */}
      <header className="mb-6">
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight break-words'>
          {decodeHtmlPreserveStructure(article.title)}
        </h1>
      </header>

      {/* Meta Information */}
      <div className="font-quicksand flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <p className='text-base'>
            by <span className='font-semibold text-gray-800'>{article.writer || article.author}</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div
        className={contentStyles}
        dangerouslySetInnerHTML={{ __html: decodeHtmlPreserveStructure(article.content) }}
      />
    </article>
  )
})

ArticleView.displayName = 'ArticleView'

export default ArticleView