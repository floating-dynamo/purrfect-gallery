'use client';
import CatListCard from '@/features/cats/components/cat-list-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CatListSort from '@/features/cats/components/cat-list-sort';
import CatListSkeleton from '@/features/cats/components/cat-list-skeleton';
import useFetchCats from '@/features/cats/api/use-fetch-cats';
import CatBreedFilter from '@/features/cats/components/cat-breed-filter';
import NoCatsFound from '@/features/cats/components/no-cats-found';

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
    selectedBreedId,
    handleChangeSelectedBreedId,
  } = useFetchCats();

  console.log(selectedBreedId);

  const disablePreviousButton = currentPage === 1 || isLoading;
  const disableNextButton = currentPage === totalPages || isLoading;
  const disableSortByDropdown = isLoading;

  return (
    <main className="flex flex-col font-sans px-8 min-h-[80vh]">
      <div className="flex flex-wrap my-2 gap-3 items-center justify-end">
        <div className="px-4 flex gap-2 items-center justify-end">
          <CatListSort
            sortBy={sortBy}
            changeSortOrder={changeSortOrder}
            disableSortByDropdown={disableSortByDropdown}
            aria-label="Sort cats by"
          />
        </div>
        <div className="px-4 flex gap-2 my-2 items-center justify-end flex-wrap">
          <CatBreedFilter
            selectedBreedId={selectedBreedId}
            handleChangeSelectedBreedId={handleChangeSelectedBreedId}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center my-auto">
        {!isLoading && cats ? (
          cats.length === 0 ? (
            <NoCatsFound />
          ) : (
            cats?.map(({ id, url, height, width }) => (
              <CatListCard
                key={id}
                id={id}
                imgUrl={url}
                imgHeight={height}
                imgWidth={width}
              />
            ))
          )
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
