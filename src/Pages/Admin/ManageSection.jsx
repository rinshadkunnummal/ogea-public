import React, { useState } from 'react';
import { articlesAPI } from '../../services/apiService';

const ManageSection = ({ articles, handleDeleteArticle, onArticleUpdate }) => {
  const [editingArticle, setEditingArticle] = useState(null)
  const [editFormData, setEditFormData] = useState({
    title: '',
    writer: '',
    content: '',
    category: 'article'
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleEditClick = (article) => {
    setEditingArticle(article)
    setEditFormData({
      title: article.title,
      writer: article.writer,
      content: article.content,
      category: article.category
    })
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true) // Start loading state
    try {
      const response = await articlesAPI.update(editingArticle._id, editFormData)
      console.log('Article updated successfully:', response)
      
      // Call parent function to refresh articles list
      if (onArticleUpdate) {
        onArticleUpdate()
      }
      
      // Close modal after successful edit
      setEditingArticle(null)
      alert('Article updated successfully!')
    } catch (err) {
      console.error('Update error:', err)
      alert('Failed to update article. Please try again.')
    } finally {
      setIsSaving(false) // End loading state regardless of success or failure
    }
  }

  const handleEditCancel = () => {
    setEditingArticle(null)
    setIsSaving(false) // Reset loading state
    setEditFormData({
      title: '',
      writer: '',
      content: '',
      category: 'article'
    })
  }

  return (
  <div className="p-4 sm:p-6">
    <div className="mb-4 sm:mb-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-2">Manage Articles</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-4">View and manage articles below.</p>
    </div>
    
    {/* Mobile Card View */}
    <div className="block sm:hidden space-y-4">
      {articles.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No articles found.</div>
      ) : (
        articles.map(article => (
          <div key={article._id} className="bg-white rounded-lg shadow-md p-4 border">
            <div className="mb-3">
              <h3 className="font-semibold text-lg mb-1 line-clamp-2">{article.title}</h3>
              <p className="text-sm text-gray-600 mb-1">By: {article.writer}</p>
              <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                {article.category}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                onClick={() => handleEditClick(article)}
              >
                Edit
              </button>
              <button
                className="flex-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                onClick={() => handleDeleteArticle(article._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>

    {/* Desktop Table View */}
    <div className="hidden sm:block overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-3 px-4 text-left font-medium text-gray-700">Title</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Writer</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Category</th>
            <th className="py-3 px-4 text-left font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.length === 0 ? (
            <tr><td colSpan={4} className="py-8 px-4 text-center text-gray-400">No articles found.</td></tr>
          ) : (
            articles.map(article => (
              <tr key={article._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 max-w-xs">
                  <div className="truncate" title={article.title}>{article.title}</div>
                </td>
                <td className="py-3 px-4">{article.writer}</td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full capitalize">
                    {article.category}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                      onClick={() => handleEditClick(article)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                      onClick={() => handleDeleteArticle(article._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    {/* Edit Modal */}
    {editingArticle && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Edit Article</h2>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleEditInputChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Writer</label>
              <input
                type="text"
                name="writer"
                value={editFormData.writer}
                onChange={handleEditInputChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={editFormData.category}
                onChange={handleEditInputChange}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="article">Article</option>
                <option value="essay">Essay</option>
                <option value="story">Story</option>
                <option value="poem">Poem</option>
                <option value="seminar">Seminar</option>
                <option value="letter">Letter</option>
                <option value="review">Review</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                name="content"
                value={editFormData.content}
                onChange={handleEditInputChange}
                rows={8}
                className="w-full p-2 sm:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical text-sm sm:text-base"
                required
              />
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleEditCancel}
                className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors border border-gray-300"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`w-full sm:w-auto px-6 py-2 rounded transition-colors flex items-center justify-center gap-2 ${
                  isSaving 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
                disabled={isSaving}
              >
                {isSaving && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
  )
}

export default ManageSection;