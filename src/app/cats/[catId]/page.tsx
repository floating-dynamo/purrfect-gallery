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
    <div className="px-8 py-4 flex-wrap font-sans flex flex-col items-center justify-center">
      {showSkeleton ? (
        <Skeleton className="w-full md:w-[32rem] h-[18rem] mb-2" />
      ) : (
        catDetails?.url && (
          <Image
            src={catDetails.url}
            alt={`Cat Image - ${catDetails?.id}`}
            width={catDetails?.width}
            height={catDetails?.height}
            className="rounded-md md:max-w-[32rem] h-[18rem] object-cover"
          />
        )
      )}
      {showSkeleton ? (
        <CatDetailsSkeleton />
      ) : catDetails?.breeds && catDetails?.breeds.length > 0 ? (
        catDetails.breeds.map((breed) => (
          <CatDetailsCard
            key={breed.id}
            description={breed?.description}
            name={breed?.name}
            id={breed.id}
            origin={breed.origin}
            temperament={breed.temperament}
          />
        ))
      ) : (
        <CatDetailsFallback />
      )}
      <Button
        variant={'outline'}
        className="w-full md:w-[32rem] cursor-pointer mt-4"
        onClick={handleBackClick}
      >
        <ArrowLeftIcon className="size-3" />
        Back
      </Button>
    </div>
  );
}
