import {
  ApiService,
  FetchCatDetailsResponse,
  FetchCatsResponse,
} from '@/lib/types';
import { MOCK_FETCH_CATS_REPSONSE } from '../../features/cats/mock';

const fetchCatsResponse = JSON.parse(
  JSON.stringify(MOCK_FETCH_CATS_REPSONSE)
) as FetchCatsResponse;

const mockApiService: ApiService = {
  async fetchCats({ limit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          cats: fetchCatsResponse.cats.slice(0, limit),
          paginationCount: fetchCatsResponse.paginationCount,
        });
      }, 1000);
    });
  },
  async fetchCatById({ id }) {
    const cat = fetchCatsResponse.cats.find((cat) => cat.id === id);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (cat) {
          resolve(cat as FetchCatDetailsResponse);
        } else {
          reject(new Error('Cat not found'));
        }
      }, 1000);
    });
  },
};

export default mockApiService;
