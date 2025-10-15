import React, { useEffect } from 'react'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ArticleView = ({ article }) => {
  const navigate = useNavigate()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Decode HTML entities and unicode escapes while preserving HTML structure
  const decodeHtml = (html) => {
    if (!html) return '';
    
    let decoded = html;
    
    // Decode unicode escapes (e.g., \u003cp\u003e to <p>)
    decoded = decoded.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
    
    // Decode HTML entities (e.g., &lt; to <, &amp; to &)
    const txt = document.createElement('textarea');
    txt.innerHTML = decoded;
    decoded = txt.value;
    
    return decoded;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <article className='min-h-screen py-10 px-4 md:px-8 lg:px-20 mx-auto max-w-4xl'>
      {/* Back Button */}
      <button
        onClick={() => navigate('/works')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Category Badge */}
      {article.category && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
            {article.category}
          </span>
        </div>
      )}

      {/* Title */}
      <div className="head mb-6">
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight break-words'>
          {decodeHtml(article.title)}
        </h1>
      </div>

      {/* Meta Information */}
      <div className="info font-quicksand flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 pb-6 border-b border-gray-200">
        {/* Author */}
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <p className='text-base'>
            by <span className='font-semibold text-gray-800'>{article.writer || article.author}</span>
          </p>
        </div>

        {/* Date
        {article.createdAt && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <p className='text-base'>{formatDate(article.createdAt)}</p>
          </div>
        )} */}
      </div>

      {/* Content */}
      <div 
        className="content mt-8 text-gray-700 text-lg leading-relaxed prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: decodeHtml(article.content) }}
      />
    </article>
  )
}

export default ArticleView