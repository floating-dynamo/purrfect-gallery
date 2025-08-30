'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import CatDetailsCard from '@/features/cats/components/cat-details-card';
import CatDetailsFallback from '@/features/cats/components/cat-details-fallback';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import CatDetailsSkeleton from '@/features/cats/components/cat-details-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import useFetchCatDetails from '@/features/cats/api/use-fetch-cat-details';
import CatToggleFavourite from '@/features/cats/components/cat-toggle-favourite';

export default function CatPage() {
  const params = useParams<{ catId: string }>();
  const catId = params?.catId;
  const router = useRouter();
  const { catDetails, isLoading } = useFetchCatDetails({ id: catId });
  const showSkeleton = isLoading || !catDetails;

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div className="px-8 py-4 flex-wrap font-sans flex flex-col md:flex-row gap-8 items-start justify-center min-h-[80vh]">
      <div className="flex flex-col gap-4 w-full sm:w-fit relative">
        <Button
          disabled={isLoading}
          className="min-w-[12rem] w-full sm:w-fit cursor-pointer"
          onClick={handleBackClick}
        >
          <ArrowLeftIcon className="size-3" />
          Back to Gallery
        </Button>

        {showSkeleton ? (
          <Skeleton className="rounded-md w-full md:w-[32rem] h-[24rem] object-cover" />
        ) : (
          catDetails?.url && (
            <Image
              src={catDetails.url}
              alt={`Cat Image - ${catDetails?.id}`}
              width={catDetails?.width}
              height={catDetails?.height}
              className="rounded-md md:max-w-[32rem] h-[24rem] object-cover"
            />
          )
        )}
        <CatToggleFavourite catId={catId} isFetchingCatDetails={isLoading} />
      </div>
      {showSkeleton ? (
        <CatDetailsSkeleton />
      ) : catDetails?.breeds && catDetails?.breeds.length > 0 ? (
        catDetails.breeds.map((breed) => {
          const {
            intelligence,
            grooming,
            health_issues: healthIssues,
            energy_level: energyLevel,
            dog_friendly: dogFriendly,
            child_friendly: childFriendly,
            stranger_friendly: strangerFriendly,
          } = breed;

          return (
            <CatDetailsCard
              key={breed.id}
              description={breed?.description}
              name={breed?.name}
              origin={breed.origin}
              temperament={breed.temperament}
              lifeSpan={breed.life_span}
              weight={breed.weight.imperial}
              traits={{
                intelligence,
                grooming,
                healthIssues,
                energyLevel,
                dogFriendly,
                childFriendly,
                strangerFriendly,
              }}
            />
          );
        })
      ) : (
        <CatDetailsFallback />
      )}
    </div>
  );
}
