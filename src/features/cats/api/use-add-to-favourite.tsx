import { apiRoutes } from '@/lib/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useAddToFavourite = ({ catId }: { catId: string }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavourite = async () => {
    try {
      setIsLoading(true);
      if (!isFavourite) {
        await axios.post(apiRoutes.favourites, { id: catId });
      } else {
        // delete from favourites
      }
      setIsFavourite((prev) => !prev);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Make API call to get all favs and check if current is fav based on cat id
    console.log(catId);
  }, [catId]);

  return { isFavourite, handleToggleFavourite, isLoading };
};

export default useAddToFavourite;
