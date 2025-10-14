import axios from 'axios';

// Fetch and log articles from API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAndLogArticles = async () => {
  try {
    console.log('🔄 Fetching articles from:', `${API_BASE_URL}/articles`);
    
    const response = await axios.get(`${API_BASE_URL}/articles`);
    
    console.log('✅ Articles fetched successfully!');
    console.log('📊 Response status:', response.status);
    console.log('📊 Response data:', response.data);
    console.log('📝 Number of articles:', response.data?.articles?.length || response.data?.length || 0);
    console.log('📋 Articles:', response.data?.articles || response.data);
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching articles:', error);
    console.error('🔍 Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// Auto-fetch on import (for testing)
fetchAndLogArticles();

export default fetchAndLogArticles;
