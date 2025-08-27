import { FetchCatDetailsResponse } from '@/lib/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchCatDetails = ({ id }: { id: string }) => {
  const [catDetails, setCatDetails] = useState<FetchCatDetailsResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCatDetails() {
      try {
        setIsLoading(true);
        const catDetailResponse = await axios.get(`/api/cats/${id}`);
        console.log(catDetailResponse.data);
        setCatDetails(catDetailResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCatDetails();
  }, [id]);

  return {
    catDetails,
    isLoading,
  };
};

export default useFetchCatDetails;
