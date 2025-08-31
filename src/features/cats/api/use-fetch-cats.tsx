import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import { apiRoutes, CATS_LIMIT_PER_PAGE } from '@/lib/constants';
import { CatListItem, FetchCatsQuery, SortByType } from '@/lib/types';

const useFetchCats = () => {
  const CURRENT_PAGE_INITIAL_VALUE = 1;
  const SORT_BY_INITIAL_VALUE = SortByType.RANDOM;
  const BREED_ID_INITIAL_VALUE = '';

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getInitialPage = () => {
    const pageParam = Number(searchParams.get('page'));
    return pageParam >= 1 ? pageParam : CURRENT_PAGE_INITIAL_VALUE;
  };

  const getInitialSort = () => {
    const orderParam = searchParams.get('order') as SortByType;
    return orderParam || SORT_BY_INITIAL_VALUE;
  };

  const getInitialBreedId = () => {
    const breedIdParam = searchParams.get('breedId');
    return breedIdParam || BREED_ID_INITIAL_VALUE;
  };

  const [cats, setCats] = useState<CatListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [sortBy, setSortBy] = useState<SortByType>(getInitialSort);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(CATS_LIMIT_PER_PAGE);
  const [selectedBreedId, setSelectedBreedId] =
    useState<string>(getInitialBreedId);

  const handleChangeSelectedBreedId = (breedId: string) => {
    if (breedId !== selectedBreedId) {
      setSelectedBreedId(breedId);
      setCurrentPage(CURRENT_PAGE_INITIAL_VALUE);
    }
  };

  const changeSortOrder = (order: SortByType) => {
    if (order !== sortBy) {
      setSortBy(order);
    }
  };

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

  useEffect(() => {
    async function fetchCats() {
      try {
        setIsLoading(true);
        const queryParams: FetchCatsQuery = { limit, page: currentPage - 1 };
        if (sortBy) {
          queryParams.order = sortBy;
        }
        if (selectedBreedId) {
          queryParams.breedId = selectedBreedId;
        }

        const catsData = (
          await axios.get(apiRoutes.cats, {
            params: queryParams,
          })
        ).data;

        setCats(catsData.cats);
        setTotalPages(Math.ceil(catsData.paginationCount / limit));
      } catch (error) {
        console.error('Error fetching cats: ', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
  }, [currentPage, limit, sortBy, selectedBreedId]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', String(currentPage));
    if (sortBy) params.set('order', sortBy);
    if (selectedBreedId) params.set('breedId', selectedBreedId);

    router.replace(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortBy, selectedBreedId]);

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
    selectedBreedId,
    handleChangeSelectedBreedId,
  };
};

export default useFetchCats;
