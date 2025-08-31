import {
  ApiService,
  FetchBreedsResponse,
  FetchCatDetailsResponse,
  FetchCatsFromFavouritesResponse,
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
) as FetchBreedsResponse;
const fetchCatFavourites = JSON.parse(
  JSON.stringify(MOCK_CAT_FAVOURITES_RESPONSE)
) as FetchCatsFromFavouritesResponse;

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
  async fetchBreedById({ id }) {
    const breedDetails = fetchBreedsResponse.breeds.find(
      (breed) => breed.id === id
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(breedDetails!);
      }, 1000);
    });
  },
  async fetchFavouriteFromCatId({ catId }) {
    const favCat = fetchCatFavourites.cats.find(
      (fav) => fav.image_id === catId
    )!;
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            cat: favCat,
          }),
        1000
      );
    });
  },
  async fetchCatsFromFavourites() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fetchCatFavourites), 1000);
    });
  },
  async addCatToFavourites({ id }) {
    fetchCatFavourites.cats.push({
      id: Date.now(),
      image_id: id,
      created_at: Date.now().toString(),
      sub_id: null,
      image: {
        id,
        url: '',
      },
    });
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
  async deleteCatFromFavourite({ favouriteId }) {
    fetchCatFavourites.cats = fetchCatFavourites.cats.filter(
      (favCat) => favCat.id !== favouriteId
    );
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            message: 'Deleted the cat from favourites',
            success: true,
          }),
        1000
      );
    });
  },
};

export default mockApiService;
