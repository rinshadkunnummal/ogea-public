import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, UserRoundPen } from 'lucide-react'

const ArticleCard = ({ article }) => {
  const { _id, title, content, writer, category, createdAt } = article;

  // Decode HTML entities and strip HTML tags
  const decodeHtml = (html) => {
    if (!html) return '';

    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    let decoded = txt.value;

    // Remove HTML tags
    decoded = decoded.replace(/<[^>]*>/g, '');

    // Decode unicode escapes
    decoded = decoded.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });

    // Clean up extra whitespace
    decoded = decoded.replace(/\s+/g, ' ').trim();

    return decoded;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Truncate content for preview
  const truncateContent = (text, maxLength = 120) => {
    const cleanText = decodeHtml(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + '...';
  };

  return (
    <article className="h-full flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      <Link 
        to={`/works/${_id}`} 
        className="flex flex-col h-full p-6"
        aria-label={`Read article: ${decodeHtml(title)}`}
      >
        {/* Category Badge */}
        {category && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Title */}
        <header className="mb-3">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 break-words">
            {decodeHtml(title)}
          </h2>
        </header>

        {/* Content Preview */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
          {truncateContent(content)}
        </p>

        {/* Footer - Author and Date */}
        <footer className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-1.5" aria-label={`Written by ${writer}`}>
            <UserRoundPen className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="font-medium truncate">{writer}</span>
          </div>

          {createdAt && (
            <time 
              className="flex items-center gap-1.5" 
              dateTime={createdAt}
              aria-label={`Published on ${formatDate(createdAt)}`}
            >
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="whitespace-nowrap">{formatDate(createdAt)}</span>
            </time>
          )}
        </footer>
      </Link>
    </article>
  )
}

export default ArticleCard