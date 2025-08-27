import { CATS_LIMIT_PER_PAGE } from '@/lib/constants';
import { CatListItem, FetchCatsQuery, SortByType } from '@/lib/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchCats = () => {
  const [cats, setCats] = useState<CatListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(CATS_LIMIT_PER_PAGE);
  const [sortBy, setSortBy] = useState<SortByType>(SortByType.RANDOM);

  const changeSortOrder = (order: SortByType) => {
    setSortBy(order);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevCount) => prevCount + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage !== 0) {
      setCurrentPage((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    async function fetchCats() {
      try {
        setIsLoading(true);
        const queryParams: FetchCatsQuery = { limit, page: currentPage };
        if (sortBy) {
          queryParams.order = sortBy;
        }

        const catsData = (
          await axios.get('/api/cats', {
            params: queryParams,
          })
        ).data;

        setTotalPages(catsData.paginationCount / limit - 1);
        setCats(catsData.cats);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
  }, [currentPage, limit, sortBy]);

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
