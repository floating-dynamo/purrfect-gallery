'use client';
import CatListCard from '@/features/cats/components/cat-list-card';
import CatListSort from '@/features/cats/components/cat-list-sort';
import CatListSkeleton from '@/features/cats/components/cat-list-skeleton';
import useFetchCats from '@/features/cats/api/use-fetch-cats';
import CatBreedFilter from '@/features/cats/components/cat-breed-filter';
import CatListFallback from '@/features/cats/components/cat-list-fallback';
import CatListPagination from '@/features/cats/components/cat-list-pagination';

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

  const disablePreviousButton = currentPage === 1 || isLoading;
  const disableNextButton = currentPage === totalPages || isLoading;
  const disableSortByDropdown = isLoading;

  return (
    <main className="flex flex-col font-sans px-8 min-h-[80vh]">
      <div className="flex flex-wrap my-2 gap-3 items-center">
        <div className="px-4 flex gap-2 items-center">
          <CatListSort
            sortBy={sortBy}
            changeSortOrder={changeSortOrder}
            disableSortByDropdown={disableSortByDropdown}
            aria-label="Sort cats by"
          />
        </div>
        <div className="px-4 flex gap-2 my-2 items-center flex-wrap">
          <CatBreedFilter
            selectedBreedId={selectedBreedId}
            handleChangeSelectedBreedId={handleChangeSelectedBreedId}
            isFetchingCats={isLoading}
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center my-auto">
        {!isLoading && cats ? (
          cats.length === 0 ? (
            <CatListFallback />
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
        <CatListPagination
          currentPage={currentPage}
          disableNextButton={disableNextButton}
          disablePreviousButton={disablePreviousButton}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </div>
    </main>
  );
}
