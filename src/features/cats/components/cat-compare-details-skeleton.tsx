import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const CatCompareDetailsSkeleton = () => {
  return (
    <Card className="w-full h-[300px]">
      <CardHeader>
        <Skeleton className="font-bold text-xl h-8 w-full" />
      </CardHeader>
      <CardContent className="h-full">
        <Skeleton className="flex flex-col mb-4 h-5 w-full" />
        <Skeleton className="flex flex-col mb-4 h-5 w-full" />
        <Skeleton className="flex flex-col mb-4 h-5 w-full" />
        <Skeleton className="flex flex-col mt-12 mb-4 h-8 w-full" />
      </CardContent>
    </Card>
  );
};

export default CatCompareDetailsSkeleton;
