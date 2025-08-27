import { ApiService } from '@/lib/types';
import axios from 'axios';

if (!process.env.THE_CAT_API_BASE_URL || !process.env.THE_CAT_API_KEY) {
  console.error(
    'Missing THE_CAT_API_BASE_URL or THE_CAT_API_KEY environment variables'
  );
}

const axiosCatApiInstance = axios.create({
  baseURL: process.env.THE_CAT_API_BASE_URL,
  headers: {
    'x-api-key': process.env.THE_CAT_API_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // 10 seconds
});

const apiService: ApiService = {
  async fetchCats({ limit, page }) {
    try {
      const response = await axiosCatApiInstance.get('/images/search', {
        params: { limit, page },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Axios error:',
          error.message,
          error.code,
          error.response?.data
        );
      } else {
        console.error('Unknown error:', error);
      }
      throw error;
    }
  },
};

export default apiService;
