import { apiRoutes } from '@/lib/constants';
import {
  CatFavouriteListItem,
  FetchCatsFromFavouritesResponse,
} from '@/lib/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchFavourites = () => {
  const [favourites, setFavourites] = useState<CatFavouriteListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchFavourites() {
      try {
        setIsLoading(true);

        const favouritesData = (await axios.get(apiRoutes.favourites))
          .data as FetchCatsFromFavouritesResponse;
        console.log(favouritesData);
        setFavourites(favouritesData.cats);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFavourites();
  }, []);

  return { favourites, isLoading };
};

export default useFetchFavourites;
