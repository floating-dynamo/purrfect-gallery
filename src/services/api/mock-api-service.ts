import { ApiService } from '@/lib/types';
import { MOCK_FETCH_CATS_REPSONSE } from '../../features/cats/mock';

const fetchCatsResponse = JSON.parse(JSON.stringify(MOCK_FETCH_CATS_REPSONSE));

const mockApiService: ApiService = {
  async fetchCats({ limit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetchCatsResponse.slice(0, limit));
      }, 1000);
    });
  },
};

export default mockApiService;
