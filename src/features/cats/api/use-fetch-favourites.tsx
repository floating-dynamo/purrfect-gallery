import { apiRoutes } from '@/lib/constants';
import {
  CatFavouriteListItem,
  FetchCatsFromFavouritesResponse,
} from '@/lib/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useFetchFavourites = () => {
  const [favourites, setFavourites] = useState<CatFavouriteListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFavourites = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  return { favourites, isLoading, refetch: fetchFavourites };
};

export default useFetchFavourites;
