import {
  ApiService,
  FetchCatDetailsResponse,
  FetchCatsResponse,
} from '@/lib/types';
import {
  MOCK_CAT_FAVOURITES_RESPONSE,
  MOCK_FETCH_BREEDS_REPSONSE,
  MOCK_FETCH_CATS_REPSONSE,
} from '../../features/cats/mock';

const fetchCatsResponse = JSON.parse(
  JSON.stringify(MOCK_FETCH_CATS_REPSONSE)
) as FetchCatsResponse;
const fetchBreedsResponse = JSON.parse(
  JSON.stringify(MOCK_FETCH_BREEDS_REPSONSE)
);
const fetchCatFavourites = JSON.parse(
  JSON.stringify(MOCK_CAT_FAVOURITES_RESPONSE)
);

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
  async fetchBreeds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetchBreedsResponse);
      }, 1000);
    });
  },
  async addCatToFavourites({ id }) {
    fetchCatFavourites.push({ id: Date.now().toString(), image_id: id });
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            message: 'Added cat to favourites',
            success: true,
          }),
        1000
      );
    });
  },
};

export default mockApiService;
