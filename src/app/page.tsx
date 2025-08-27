'use client';
import CatListCard from '@/features/cats/components/cat-list-card';
import { CatListItem, FetchCatsQuery, SortByType } from '@/lib/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../components/loader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CatListSort from '@/features/cats/components/cat-list-sort';
import { CATS_LIMIT_PER_PAGE } from '@/lib/constants';

export default function Home() {
  const [cats, setCats] = useState<CatListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(CATS_LIMIT_PER_PAGE);
  const [sortBy, setSortBy] = useState<SortByType>(SortByType.RANDOM);

  const disablePreviousButton = currentPage === 0 || isLoading;
  const disableNextButton = currentPage === totalPages || isLoading;
  const disableSortByDropdown = isLoading;

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

  if (isLoading && cats.length === 0) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col font-sans px-8">
      <div className="px-8 flex gap-2 items-center justify-end">
        <span className="text-sm font-medium text-muted-foreground">
          Sort By
        </span>
        <CatListSort
          sortBy={sortBy}
          changeSortOrder={changeSortOrder}
          disableSortByDropdown={disableSortByDropdown}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {cats?.map(({ id, url, height, width }) => (
          <CatListCard
            key={id}
            id={id}
            imgUrl={url}
            imgHeight={height}
            imgWidth={width}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-8 w-full py-4">
        <Button
          variant={'outline'}
          size={'lg'}
          onClick={handlePrevPage}
          disabled={disablePreviousButton}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button>{currentPage + 1}</Button>
        <Button
          variant={'outline'}
          size={'lg'}
          onClick={handleNextPage}
          disabled={disableNextButton}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
