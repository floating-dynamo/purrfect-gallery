export interface CatBreedItem {
  id: string;
  name: string;
  weight: { imperial: string; metric: string };
  height: string;
  description: string;
  origin: string;
  life_span: string;
  temperament: string;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  health_issues: number;
  stranger_friendly: number;
  grooming: number;
  intelligence: number;
}
export interface CatCategoryItem {
  id: number;
  name: string;
}
export interface CatListItem {
  breeds?: CatBreedItem[];
  height: number;
  id: string;
  url: string;
  width: number;
  categories?: CatCategoryItem[];
}
export interface CatFavouriteListItem {
  id: number;
  user_id?: string;
  image_id: string;
  sub_id: string | null;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}
export interface FetchCatsResponse {
  cats: CatListItem[];
  paginationCount: number;
}
export interface FetchCatsQuery {
  limit?: number;
  page?: number;
  order?: SortByType;
  breedId?: string;
}
export type FetchCatDetailsResponse = CatListItem & {
  mime_type: string;
  breed_ids: string;
};
interface FetchCatDetailsQuery {
  id: string;
}
interface FetchBreedsResponse {
  breeds: CatBreedItem[];
}
interface AddCatToFavouritesReqBody {
  id: string;
}
interface AddCatToFavouritesResponse {
  message: string;
  success: boolean;
}
interface DeleteCatFromFavouriteParams {
  favouriteId: number;
}
interface DeleteCatFromFavouriteResponse {
  message: string;
  success: boolean;
}
export interface FetchCatsFromFavouritesResponse {
  cats: CatFavouriteListItem[];
  paginationCount: number;
}
interface FetchFavouriteByCatIdQuery {
  catId: string;
}
export interface FetchFavouriteByCatIdResponse {
  cat: CatFavouriteListItem;
}
interface FetchCatsFromFavouritesQuery {
  page: number;
  limit: number;
}

export interface ApiService {
  fetchCats: ({
    limit,
    page,
    order,
    breedId,
  }: FetchCatsQuery) => Promise<FetchCatsResponse>;
  fetchCatById: ({
    id,
  }: FetchCatDetailsQuery) => Promise<FetchCatDetailsResponse>;
  fetchBreeds: () => Promise<FetchBreedsResponse>;
  addCatToFavourites: ({
    id,
  }: AddCatToFavouritesReqBody) => Promise<AddCatToFavouritesResponse>;
  deleteCatFromFavourite: ({
    favouriteId,
  }: DeleteCatFromFavouriteParams) => Promise<DeleteCatFromFavouriteResponse>;
  fetchFavouriteFromCatId: ({
    catId,
  }: FetchFavouriteByCatIdQuery) => Promise<FetchFavouriteByCatIdResponse>;
  fetchCatsFromFavourites: ({
    page,
    limit,
  }: FetchCatsFromFavouritesQuery) => Promise<FetchCatsFromFavouritesResponse>;
}

export enum SortByType {
  RANDOM = '',
  ASCENDING = 'ASC',
  DESCENDING = 'DESC',
}

export enum HTTP_STATUS_CODES {
  // 2xx Success
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // 3xx Redirection
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,

  // 4xx Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}
