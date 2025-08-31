import { apiRoutes, CATS_LIMIT_PER_PAGE } from '@/lib/constants';
import {
  CatFavouriteListItem,
  FetchCatsFromFavouritesResponse,
} from '@/lib/types';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const useFetchFavourites = () => {
  const CURRENT_PAGE_INITIAL_VALUE = 1;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getInitialPage = () => {
    const pageParam = Number(searchParams.get('page'));
    return pageParam >= 1 ? pageParam : CURRENT_PAGE_INITIAL_VALUE;
  };

  const [favourites, setFavourites] = useState<CatFavouriteListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(CATS_LIMIT_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevCount) => prevCount + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevCount) => prevCount - 1);
    }
  };

  const fetchFavourites = useCallback(async () => {
    try {
      setIsLoading(true);

      const favouritesData = (
        await axios.get(apiRoutes.favourites, {
          params: {
            page: currentPage - 1,
            limit,
          },
        })
      ).data as FetchCatsFromFavouritesResponse;
      console.log(favouritesData);
      setFavourites(favouritesData.cats);
      setTotalPages(Math.ceil(favouritesData.paginationCount / limit));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', String(currentPage));

    router.replace(`${pathname}?${params.toString()}`);
  }, [currentPage, pathname, router]);

  return {
    favourites,
    isLoading,
    refetch: fetchFavourites,
    handleNextPage,
    handlePrevPage,
    currentPage,
    totalPages,
  };
};

export default useFetchFavourites;
