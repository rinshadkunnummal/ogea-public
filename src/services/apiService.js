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

// Images API functions (for posters from new API endpoint)
export const imagesAPI = {
  // Get all images from the new API endpoint
  getAll: async (params = {}) => {
    try {
      const response = await axios.get('https://api.chsoutreach.live/api/v1/upload/images', { 
        params,
        timeout: 30000 
      });
      return response.data;
    } catch (error) {
      console.error('API Error - images getAll:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Get images with sorting from the new API endpoint
  getSorted: async (sortBy = '-createdAt') => {
    try {
      const response = await axios.get(`https://api.chsoutreach.live/api/v1/upload/images?sort=${sortBy}`, {
        timeout: 30000
      });
      return response.data;
    } catch (error) {
      console.error('API Error - images getSorted:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },
};

// Poster API functions
export const postersAPI = {
  // Get all posters
  getAll: async (params = {}) => {
    try {
      const response = await apiClient.get('/posters', { params });
      return response.data;
    } catch (error) {
      console.error('API Error - posters getAll:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Get poster by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/posters/${id}`);
      return response.data;
    } catch (error) {
      console.error('API Error - posters getById:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Create new poster
  create: async (posterData) => {
    try {
      const response = await apiClient.post('/posters', posterData);
      return response.data;
    } catch (error) {
      console.error('API Error - posters create:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Update poster
  update: async (id, posterData) => {
    try {
      const response = await apiClient.patch(`/posters/${id}`, posterData);
      return response.data;
    } catch (error) {
      console.error('API Error - posters update:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Delete poster
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/posters/${id}`);
      return response.data;
    } catch (error) {
      console.error('API Error - posters delete:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },

  // Get posters with sorting
  getSorted: async (sortBy = '-createdAt') => {
    try {
      const response = await apiClient.get(`/posters?sort=${sortBy}`);
      return response.data;
    } catch (error) {
      console.error('API Error - posters getSorted:', error);
      throw new Error(error.code === 'ECONNABORTED' ? 'Request timeout - API server may be slow' : error.message);
    }
  },
};

// Upload API functions
export const uploadAPI = {
  // Upload image to Cloudinary via new API endpoint
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('https://api.chsoutreach.live/api/v1/upload/image', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error - upload image:', error);
      throw new Error(error.message || 'Failed to upload image');
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
