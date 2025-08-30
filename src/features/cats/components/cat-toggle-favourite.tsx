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
  isFetchingCatDetails: boolean;
}

const CatToggleFavourite = ({
  catId,
  isFetchingCatDetails,
}: AddCatToFavouriteProps) => {
  const { isFavourite, handleToggleFavourite, isLoading } = useToggleFavourite({
    catId,
  });

  return (
    <div className="absolute bottom-1.5 right-1.5">
      <Tooltip>
        <TooltipTrigger
          className={cn(
            buttonVariants({ variant: 'default' }),
            'w-fit cursor-pointer'
          )}
          disabled={isLoading || isFetchingCatDetails}
          onClick={handleToggleFavourite}
        >
          <HeartIcon
            className="size-8 hover:fill-pink-500 cursor-pointer rounded-full p-1"
            fill={isFavourite ? '#f6339a' : 'none'}
            color={'white'}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-sans">
            {isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CatToggleFavourite;
