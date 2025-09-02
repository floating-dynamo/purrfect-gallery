'use client';
import useFetchFavourites from '@/features/cats/api/use-fetch-favourites';
import CatListCard from '@/features/cats/components/cat-list-card';
import CatListFallback from '@/features/cats/components/cat-list-fallback';
import CatListPagination from '@/features/cats/components/cat-list-pagination';
import CatListSkeleton from '@/features/cats/components/cat-list-skeleton';
import CatToggleFavourite from '@/features/cats/components/cat-toggle-favourite';
import { CATS_LIMIT_PER_PAGE } from '@/lib/constants';
import React, { useEffect, useState } from 'react';

const FavouritesPage = () => {
  const {
    favourites,
    isLoading,
    refetch: refetchFavourites,
    currentPage,
    handleNextPage,
    handlePrevPage,
    totalPages,
  } = useFetchFavourites();
  const [triggerRerender, setTriggerRerender] = useState(false);

  const disablePreviousButton = currentPage === 1 || isLoading;
  const disableNextButton = currentPage === totalPages || isLoading;

  const reTriggerRender = () => {
    setTriggerRerender((prev) => !prev);
  };

  useEffect(() => {
    refetchFavourites();
  }, [triggerRerender, refetchFavourites]);

  return (
    <div className="min-h-[80vh] px-8 py-4 font-sans">
      <h1 className="font-bold tracking-tight text-2xl">Favourites List</h1>
      <p className="text-muted-foreground">
        Save and organize your favourite cats in one place.
      </p>
      <div className="flex items-center flex-wrap justify-center min-h-[60vh] mt-8">
        {isLoading ? (
          <CatListSkeleton totalCards={CATS_LIMIT_PER_PAGE} />
        ) : favourites && favourites.length > 0 ? (
          favourites.map((favCat) => (
            <div key={favCat.id}>
              <div className="relative font-sans">
                <CatListCard id={favCat.image_id} imgUrl={favCat.image.url} />
                <div className="absolute top-16 right-6">
                  <CatToggleFavourite
                    catId={favCat.image_id}
                    favouriteId={favCat.id}
                    isFetchingCatDetails={isLoading}
                    reTriggerRender={reTriggerRender}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <CatListFallback />
        )}
      </div>
      <div className="py-2 mt-2 flex items-center justify-center gap-4 font-sans">
        <CatListPagination
          currentPage={currentPage}
          disableNextButton={disableNextButton}
          disablePreviousButton={disablePreviousButton}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
};

export default FavouritesPage;
