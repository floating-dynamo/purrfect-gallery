import { useEffect, useState } from 'react';
import { apiRoutes } from '@/lib/constants';
import { CatBreedItem } from '@/lib/types';
import axios from 'axios';

const useFetchBreedById = (breedId: string) => {
  const [breedDetails, setBreedDetails] = useState<CatBreedItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchBreed() {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiRoutes.breeds}/${breedId}`);
        setBreedDetails(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBreed();
  }, [breedId]);

  return { breedDetails, isLoading };
};

export default useFetchBreedById;
