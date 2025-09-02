import { useEffect, useState } from 'react';
import useFetchBreeds from './use-fetch-breeds';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useCompareBreeds = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getInitialBreed1 = () => {
    const breed1 = searchParams.get('breedId1');
    return breed1 || '';
  };

  const getInitialBreed2 = () => {
    const breed2 = searchParams.get('breedId2');
    return breed2 || '';
  };

  const { breeds, isLoading } = useFetchBreeds();

  const [breedId1, setBreedId1] = useState(getInitialBreed1);
  const [breedId2, setBreedId2] = useState(getInitialBreed2);

  const handleChangeBreedId1 = (breedId: string) => setBreedId1(breedId);
  const handleChangeBreedId2 = (breedId: string) => setBreedId2(breedId);

  useEffect(() => {
    const params = new URLSearchParams();
    if (breedId1) params.set('breedId1', breedId1);
    if (breedId2) params.set('breedId2', breedId2);

    router.replace(`${pathname}?${params.toString()}`);
  }, [breedId1, breedId2, pathname, router]);

  return {
    breeds,
    breedId1,
    breedId2,
    handleChangeBreedId1,
    handleChangeBreedId2,
    isLoading,
  };
};

export default useCompareBreeds;
