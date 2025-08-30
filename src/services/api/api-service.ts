import { ApiService } from '@/lib/types';
import axios from 'axios';

const THE_CAT_API_BASE_URL = process.env.THE_CAT_API_BASE_URL;
const THE_CAT_API_KEY = process.env.THE_CAT_API_KEY;

if (!THE_CAT_API_BASE_URL || !THE_CAT_API_KEY) {
  console.error(
    'Missing THE_CAT_API_BASE_URL or THE_CAT_API_KEY environment variables'
  );
}

const axiosCatApiInstance = axios.create({
  baseURL: THE_CAT_API_BASE_URL,
  headers: {
    'x-api-key': THE_CAT_API_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const apiService: ApiService = {
  async fetchCats({ limit, page, order, breedId }) {
    try {
      const response = await axiosCatApiInstance.get('/images/search', {
        params: { limit, page, order, breed_id: breedId, has_breeds: true },
      });
      const paginationCount = response?.headers?.['pagination-count'];
      return { cats: response.data, paginationCount };
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
  async fetchCatById({ id }) {
    try {
      const response = await axiosCatApiInstance.get(`/images/${id}`);
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
  async fetchBreeds() {
    try {
      const response = await axiosCatApiInstance.get(`/breeds`);
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
  async addCatToFavourites({ id }) {
    try {
      await axiosCatApiInstance.post(`/favourites`, {
        image_id: id,
      });

      return { message: 'Added cat to favourites', success: true };
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
