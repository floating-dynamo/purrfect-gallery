import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface CatListSkeletonProps {
  totalCards: number;
}

const CatListSkeleton = ({ totalCards }: CatListSkeletonProps) => {
  const cardsList = new Array(totalCards)
    .fill(0)
    .map((_item, index) => index + 1);

  return (
    <div className='flex flex-wrap items-center justify-center'>
      {cardsList.map((_item) => (
        <Skeleton key={_item} className="rounded-md m-4 w-[250px] h-[250px]" />
      ))}
    </div>
  );
};

export default CatListSkeleton;
