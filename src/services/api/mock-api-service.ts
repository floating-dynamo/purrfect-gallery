import { ApiService, CatListItem, FetchCatDetailsResponse } from '@/lib/types';
import { MOCK_FETCH_CATS_REPSONSE } from '../../features/cats/mock';

const fetchCatsResponse: CatListItem[] = JSON.parse(
  JSON.stringify(MOCK_FETCH_CATS_REPSONSE)
);

const mockApiService: ApiService = {
  async fetchCats({ limit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetchCatsResponse.slice(0, limit));
      }, 1000);
    });
  },
  async fetchCatById({ id }) {
    const cat = fetchCatsResponse.find((cat) => cat.id === id);
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
