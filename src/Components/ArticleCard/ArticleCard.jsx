import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArticleCard = ({ article }) => {
    const navigate = useNavigate()

    const openArticleView = (article) => {
        navigate(`/works/${article._id}`)
    }

    return (
        <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" role="listitem">
            <div className="p-6 flex flex-col justify-between h-full">
                <header>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-arima break-words line-clamp-2">
                        {article.title || 'Untitled Article'}
                    </h3>
                    {article.writer && (
                        <address className="text-sm text-blue-600 mb-3 font-medium not-italic">
                            By {article.writer}
                        </address>
                    )}
                </header>

                <p className="text-gray-600 mb-4 whitespace-pre-line line-clamp-3"
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
}

export default ArticleCard;