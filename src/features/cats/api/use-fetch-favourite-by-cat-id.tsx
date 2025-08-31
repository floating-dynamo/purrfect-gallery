import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { apiRoutes } from '@/lib/constants';

export default function useFetchFavouriteByCatId({ catId }: { catId: string }) {
  const [favouriteId, setFavouriteId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavourite = useCallback(async () => {
    if (!catId) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${apiRoutes.favourites}/${catId}`);
      setFavouriteId(data?.cat?.id ?? null);
    } catch (err) {
      console.error(err);
      setFavouriteId(null);
    } finally {
      setIsLoading(false);
    }
  }, [catId]);

  useEffect(() => {
    fetchFavourite();
  }, [fetchFavourite]);

  return { favouriteId, isLoading, refetch: fetchFavourite };
}
