import { HeartIcon } from 'lucide-react';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useToggleFavourite from '../api/use-toggle-favourite';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface AddCatToFavouriteProps {
  catId: string;
  favouriteId: number | null;
  isFetchingCatDetails: boolean;
  reTriggerRender: () => void;
}

const CatToggleFavourite = ({
  catId,
  favouriteId,
  isFetchingCatDetails,
  reTriggerRender,
}: AddCatToFavouriteProps) => {
  const { handleToggleFavourite, isLoading } = useToggleFavourite({
    catId,
    favouriteId,
    reTriggerRender,
  });

  return (
    <div className="absolute bottom-1.5 right-1.5">
      <Tooltip>
        <TooltipTrigger
          className={cn(
            buttonVariants({ variant: 'link' }),
            'w-fit cursor-pointer rounded-full'
          )}
          disabled={isLoading || isFetchingCatDetails}
          onClick={handleToggleFavourite}
        >
          <HeartIcon
            className="size-8 hover:fill-pink-500 cursor-pointer rounded-full p-1"
            fill={favouriteId ? '#f6339a' : 'none'}
            color={favouriteId ? 'none' : 'white'}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-sans">
            {favouriteId ? 'Remove from favourites' : 'Add to favourites'}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CatToggleFavourite;
