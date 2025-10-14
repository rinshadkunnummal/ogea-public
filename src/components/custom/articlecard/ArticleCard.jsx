import React from 'react'

const ArticleCard = ({ article }) => {
  const { title, content, writer, category, createdAt } = article;
  
  // Decode HTML entities and strip HTML tags
  const decodeHtml = (html) => {
    if (!html) return '';
    
    // Create a temporary element to decode HTML entities
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
  const truncateContent = (text, maxLength = 150) => {
    const cleanText = decodeHtml(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + '...';
  };

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
      {/* Category Badge */}
      {category && (
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
            {category}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-200">
        {decodeHtml(title)}
      </h3>

      {/* Content Preview */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {truncateContent(content)}
      </p>

      {/* Footer - Author and Date */}
      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
            />
          </svg>
          <span className="font-medium">{writer}</span>
        </div>
        
        {createdAt && (
          <div className="flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span>{formatDate(createdAt)}</span>
          </div>
        )}
      </div>
    </article>
  )
}

export default ArticleCard