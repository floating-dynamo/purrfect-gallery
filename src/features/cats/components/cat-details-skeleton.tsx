import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';


const CatDetailsSkeleton = () => {
  return (
    <div className="py-4 flex-col flex-wrap w-full md:w-[32rem] items-center justify-center">
      {/* Title skeleton */}
      <Skeleton className="w-2/3 h-10 mb-2" />
      {/* Description skeleton */}
      <Skeleton className="w-full h-16 mb-4" />

      {/* Origin section */}
      <div className="mt-2 w-full">
        <Skeleton className="w-1/3 h-8 mb-2" />
        <Skeleton className="w-1/2 h-6" />
      </div>

      {/* Temperament section */}
      <div className="mt-2 w-full">
        <Skeleton className="w-1/3 h-8 mb-2" />
        <div className="flex flex-wrap gap-2">
          {/* Badges */}
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-16 h-6 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatDetailsSkeleton;
