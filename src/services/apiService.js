import axios from 'axios';

// Get API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error('VITE_API_BASE_URL is not defined in environment variables');
}

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Increased to 30 seconds for slow APIs
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const articlesAPI = {
  // Get all articles
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/articles', { params });
      return response.data;
    } catch (error) {
      console.error('API Error - getAll:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Get article by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error('API Error - getById:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Create new article
  create: async (articleData) => {
    try {
      const response = await apiClient.post('/articles', articleData);
      return response.data;
    } catch (error) {
      console.error('API Error - create:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Update article
  update: async (id, articleData) => {
    try {
      const response = await apiClient.patch(`/articles/${id}`, articleData);
      return response.data;
    } catch (error) {
      console.error('API Error - update:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Delete article
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error('API Error - delete:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Get articles with sorting
  getSorted: async (sortBy = '-createdAt') => {
    try {
      const response = await apiClient.get(`/articles?sort=${sortBy}`);
      return response.data;
    } catch (error) {
      console.error('API Error - getSorted:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },
};

// Authentication helper
export const auth = {
  username: import.meta.env.VITE_ADMIN_USERNAME,
  password: import.meta.env.VITE_ADMIN_PASSWORD,
};

// Configuration helper
export const config = {
  apiBaseUrl: API_BASE_URL,
  adminCredentials: {
    username: import.meta.env.VITE_ADMIN_USERNAME,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
  },
};

// Export the configured axios instance for custom requests
export default apiClient;
