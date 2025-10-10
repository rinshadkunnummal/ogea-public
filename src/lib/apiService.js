// API Service for handling all API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Generic API call handler
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Articles API
export const articlesAPI = {
  // Get all articles
  getAll: () => apiCall('/articles'),
  
  // Get articles with sorting
  getSorted: (sortBy = '-createdAt') => apiCall(`/articles?sort=${sortBy}`),
  
  // Get single article by ID
  getById: (id) => apiCall(`/articles/${id}`),
  
  // Create new article
  create: (articleData) => apiCall('/articles', {
    method: 'POST',
    body: JSON.stringify(articleData),
  }),
  
  // Update article
  update: (id, articleData) => apiCall(`/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(articleData),
  }),
  
  // Delete article
  delete: (id) => apiCall(`/articles/${id}`, {
    method: 'DELETE',
  }),
  
  // Search articles
  search: (query) => apiCall(`/articles/search?q=${encodeURIComponent(query)}`),
};

// Images/Posters API
export const imagesAPI = {
  // Get all images
  getAll: () => apiCall('/images'),
  
  // Get single image by ID
  getById: (id) => apiCall(`/images/${id}`),
  
  // Upload image
  upload: async (formData) => {
    const url = `${API_BASE_URL}/images`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData, // Don't set Content-Type for FormData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  },
  
  // Delete image
  delete: (id) => apiCall(`/images/${id}`, {
    method: 'DELETE',
  }),
};

// Posters API (alias for images)
export const postersAPI = imagesAPI;

// Upload API (for file uploads)
export const uploadAPI = {
  upload: async (file, folder = 'uploads') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    
    return imagesAPI.upload(formData);
  },
};

// Admin credentials configuration
export const config = {
  adminCredentials: {
    username: import.meta.env.VITE_ADMIN_USERNAME,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
  },
};

// Statistics API (for admin dashboard)
export const statsAPI = {
  getAll: () => apiCall('/stats'),
  getArticleStats: () => apiCall('/stats/articles'),
  getPosterStats: () => apiCall('/stats/posters'),
};

export default {
  articlesAPI,
  imagesAPI,
  postersAPI,
  uploadAPI,
  config,
  statsAPI,
};
