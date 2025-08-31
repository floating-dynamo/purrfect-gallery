import { apiRoutes } from '@/lib/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';

const useToggleFavourite = ({
  catId,
  favouriteId,
  reTriggerRender,
}: {
  catId: string;
  favouriteId: number | null;
  reTriggerRender?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavourite = async () => {
    try {
      setIsLoading(true);
      if (!favouriteId) {
        await axios.post(apiRoutes.favourites, { id: catId });
      } else {
        await axios.delete(`${apiRoutes.favourites}/${favouriteId}`);
      }
      if (reTriggerRender) {
        reTriggerRender();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleToggleFavourite, isLoading };
};

export default useToggleFavourite;
