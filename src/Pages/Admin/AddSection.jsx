import React from 'react';

const AddSection = ({ formData, handleInputChange, handleSubmit, handleCancel, submitting }) => (
  <div className="bg-white rounded-lg p-6 shadow-lg mb-6 border border-gray-200 max-w-xl mx-auto">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Content</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Article Title *</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter article title" required />
      </div>
      <div>
        <label htmlFor="writer" className="block text-sm font-medium text-gray-700 mb-1">Author/Writer *</label>
        <input type="text" id="writer" name="writer" value={formData.writer} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter author name" required />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="article">Article</option>
          <option value="essay">Essay</option>
          <option value="story">Short Story</option>
          <option value="poem">Poem</option>
          <option value="seminar">Seminar Paper</option>
          <option value="letter">Letter</option>
          <option value="review">Review</option>
        </select>
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Article Content *</label>
        <textarea id="content" name="content" value={formData.content} onChange={handleInputChange} rows="8" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter the full article content" required />
      </div>
      <div className="flex gap-4 pt-4">
        <button type="submit" disabled={submitting} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50">{submitting ? 'Adding...' : 'Add Content'}</button>
        <button type="button" onClick={handleCancel} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">Cancel</button>
      </div>
    </form>
  </div>
);

export default AddSection;
