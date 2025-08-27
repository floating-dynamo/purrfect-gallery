'use client';
import CatListCard from '@/features/cats/components/cat-list-card';
import { Button } from '@/components/ui/button';
import { ArrowDownUpIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import CatListSort from '@/features/cats/components/cat-list-sort';
import CatListSkeleton from '@/features/cats/components/cat-list-skeleton';
import useFetchCats from '@/features/cats/api/use-fetch-cats';

export default function Home() {
  const {
    cats,
    isLoading,
    limit,
    currentPage,
    sortBy,
    changeSortOrder,
    handleNextPage,
    handlePrevPage,
    totalPages,
  } = useFetchCats();

  const disablePreviousButton = currentPage === 1 || isLoading;
  const disableNextButton = currentPage === totalPages || isLoading;
  const disableSortByDropdown = isLoading;

  return (
    <main className="flex flex-col font-sans px-8">
      <div className="px-8 flex gap-2 items-center justify-end">
        <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
          <ArrowDownUpIcon className="size-4" /> Sort By
        </span>
        <CatListSort
          sortBy={sortBy}
          changeSortOrder={changeSortOrder}
          disableSortByDropdown={disableSortByDropdown}
          aria-label="Sort cats by"
        />
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {!isLoading && cats.length > 0 ? (
          cats?.map(({ id, url, height, width }) => (
            <CatListCard
              key={id}
              id={id}
              imgUrl={url}
              imgHeight={height}
              imgWidth={width}
            />
          ))
        ) : (
          <CatListSkeleton totalCards={limit} />
        )}
      </div>
      <div className="flex items-center justify-center gap-8 w-full py-4">
        <Button
          variant={'outline'}
          size={'lg'}
          onClick={handlePrevPage}
          disabled={disablePreviousButton}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button>{currentPage}</Button>
        <Button
          variant={'outline'}
          size={'lg'}
          onClick={handleNextPage}
          disabled={disableNextButton}
          aria-label="Go to next page"
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </main>
  );
}
