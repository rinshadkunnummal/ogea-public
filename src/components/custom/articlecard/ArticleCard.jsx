import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, UserRoundPen } from 'lucide-react'
import { Badge } from '../../ui/badge'
import { decodeHtml, formatDate, truncateText } from '@/lib/utils'

const ArticleCard = memo(({ article }) => {
  const { _id, title, content, writer, category, createdAt } = article;

  return (
    <article className="h-full flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group font-manjari">
      <Link 
        to={`/works/${_id}`} 
        className="flex flex-col h-full p-6"
        aria-label={`Read article: ${decodeHtml(title)}`}
      >
        {/* Category Badge */}
        {category && (
          <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 capitalize mb-3">
            {category}
          </Badge>
        )}

        {/* Title */}
        <header className="mb-3">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 break-words font-manjari">
            {decodeHtml(title)}
          </h2>
        </header>

        {/* Content Preview */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
          {truncateText(content)}
        </p>

        {/* Footer - Author and Date */}
        <footer className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-1.5" aria-label={`Written by ${writer}`}>
            <UserRoundPen className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span className="font-medium truncate pt-2">{writer}</span>
          </div>

          {createdAt && (
            <time 
              className="flex items-center gap-1.5" 
              dateTime={createdAt}
              aria-label={`Published on ${formatDate(createdAt)}`}
            >
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap pt-2">{formatDate(createdAt)}</span>
            </time>
          )}
        </footer>
      </Link>
    </article>
  )
})

ArticleCard.displayName = 'ArticleCard'

export default ArticleCard