import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import { CATS_LIMIT_PER_PAGE } from '@/lib/constants';
import { CatListItem, FetchCatsQuery, SortByType } from '@/lib/types';

const useFetchCats = () => {
  const [cats, setCats] = useState<CatListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(CATS_LIMIT_PER_PAGE);
  const [sortBy, setSortBy] = useState<SortByType>(SortByType.RANDOM);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const changeSortOrder = (order: SortByType) => {
    setSortBy(order);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevCount) => prevCount + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    async function fetchCats() {
      try {
        setIsLoading(true);
        const queryParams: FetchCatsQuery = { limit, page: currentPage - 1 };
        if (sortBy) {
          queryParams.order = sortBy;
        }

        const catsData = (
          await axios.get('/api/cats', {
            params: queryParams,
          })
        ).data;

        setTotalPages(catsData.paginationCount / limit);
        setCats(catsData.cats);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
  }, [currentPage, limit, sortBy]);

  useEffect(() => {
    const pageParam = Number(searchParams.get('page')) || 0;
    const orderParam =
      (searchParams.get('order') as SortByType) || SortByType.RANDOM;

    if (pageParam !== currentPage) setCurrentPage(pageParam);
    if (orderParam !== sortBy) setSortBy(orderParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortBy]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(currentPage));
    if (sortBy) params.set('order', sortBy);

    router.replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortBy]);

  return {
    cats,
    isLoading,
    totalPages,
    currentPage,
    sortBy,
    changeSortOrder,
    handleNextPage,
    handlePrevPage,
    limit,
  };
};

export default useFetchCats;
