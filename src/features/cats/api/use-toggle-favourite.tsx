import { apiRoutes } from '@/lib/constants';
import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';

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
        toast.success('Successfully added the cat to favourites list.', {
          className: 'font-sans',
        });
      } else {
        await axios.delete(`${apiRoutes.favourites}/${favouriteId}`);
        toast.success('Removed the cat from favourites list.', {
          className: 'font-sans',
        });
      }
      if (reTriggerRender) {
        reTriggerRender();
      }
    } catch (error) {
      toast.error('Something went wrong, please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleToggleFavourite, isLoading };
};

export default useToggleFavourite;
