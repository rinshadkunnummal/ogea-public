import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Fetch all articles from API
 */
export const fetchArticles = async () => {
  const response = await axios.get(`${API_BASE_URL}/articles`)
  return response.data?.articles || response.data?.data?.articles || response.data || []
}

/**
 * Fetch single article by ID
 */
export const fetchArticleById = async (articleId) => {
  const response = await axios.get(`${API_BASE_URL}/articles/${articleId}`)
  return response.data?.article || response.data?.data?.article || response.data
}

/**
 * Fetch articles by category
 */
export const fetchArticlesByCategory = async (category) => {
  const response = await axios.get(`${API_BASE_URL}/articles`, {
    params: { category }
  })
  return response.data?.articles || response.data?.data?.articles || response.data || []
}

/**
 * Fetch statistics
 */
export const fetchStatistics = async () => {
  const response = await fetch(`${API_BASE_URL}/statistics`)
  if (!response.ok) {
    throw new Error(`Failed to fetch statistics: ${response.statusText}`)
  }
  const data = await response.json()
  return data?.data?.statistics?.[0] || null
}

/**
 * Fetch images for achievements
 */
export const fetchImages = async () => {
  const response = await fetch('https://api.chsoutreach.live/api/v1/upload/images')
  const data = await response.json()
  
  if (data.status === 'success') {
    return data.data.images.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
  }
  throw new Error('Failed to load images')
}

// Legacy export for backwards compatibility
export const fetchAndLogArticles = fetchArticles

export default {
  fetchArticles,
  fetchArticleById,
  fetchArticlesByCategory,
  fetchStatistics,
  fetchImages,
}
