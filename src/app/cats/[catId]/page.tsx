'use client';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Loader from '@/components/loader';
import CatDetailsCard from '@/features/cats/components/cat-details-card';
import CatDetailsFallback from '@/features/cats/components/cat-details-fallback';
import { FetchCatDetailsResponse } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export default function CatPage() {
  const params = useParams<{ catId: string }>();
  const catId = params?.catId;
  const router = useRouter();
  const [catDetails, setCatDetails] = useState<FetchCatDetailsResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleBackClick = () => {
    router.push('/');
  };

  useEffect(() => {
    async function fetchCatDetails() {
      try {
        setIsLoading(true);
        const catDetailResponse = await axios.get(`/api/cats/${catId}`);
        console.log(catDetailResponse.data);
        setCatDetails(catDetailResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCatDetails();
  }, [catId]);

  if (isLoading || !catDetails) {
    return <Loader title='Purr... Fetching the details...'/>;
  }

  return (
    <div className="px-8 py-4 flex-wrap font-sans flex flex-col items-center justify-center">
      {catDetails?.url && (
        <Image
          src={catDetails.url}
          alt={`Cat Image - ${catDetails?.id}`}
          width={catDetails?.width}
          height={catDetails?.height}
          className="rounded-md md:max-w-[32rem] h-[18rem] object-cover"
        />
      )}
      {catDetails?.breeds ? (
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
