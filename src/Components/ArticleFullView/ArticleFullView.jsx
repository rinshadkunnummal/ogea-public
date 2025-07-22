import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArticleFullView = ({ article }) => {
  const navigate = useNavigate()

  const backToArticles = () => {
    navigate('/works')
  }

  if (!article) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600">Article not found.</p>
      </div>
    )
  }

  return (
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

      <div className="p-4 sm:p-8">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 font-nunito break-words whitespace-pre-line">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-600 mb-6">
            {article.writer && (
              <address className="text-blue-600 font-medium text-base sm:text-lg not-italic">
                By {article.writer}
              </address>
            )}
            {article.createdAt && (
              <time dateTime={article.createdAt} className="text-base sm:text-lg">
                {new Date(article.createdAt).toLocaleDateString()}
              </time>
            )}
            {article.category && (
              <span className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 text-sm rounded-full capitalize" role="tag">
                {article.category}
              </span>
            )}
          </div>
        </header>

        <section className="prose max-w-none">
          <div 
            className="text-gray-700 text-base sm:text-lg leading-relaxed break-words whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: article.content 
                ? article.content.replace(/<\/?[^>]+(>|$)/g, "<br />", "<hr>, <i>") 
                : 'No content available'
            }}
          />
        </section>
      </div>
    </article>
  )
}

export default ArticleFullView
