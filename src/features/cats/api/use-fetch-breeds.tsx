import { useEffect, useState } from 'react';
import axios from 'axios';

import { apiRoutes } from '@/lib/constants';
import { CatBreedItem } from '@/lib/types';

const useFetchBreeds = () => {
  const [breeds, setBreeds] = useState<CatBreedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCatBreeds() {
      try {
        setIsLoading(true);
        const breedsResponseData = (await axios.get(apiRoutes.breeds)).data;
        setBreeds(breedsResponseData.breeds);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCatBreeds();
  }, []);

  return { breeds, isLoading };
};

export default useFetchBreeds;
