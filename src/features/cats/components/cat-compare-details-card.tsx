import React from 'react';
import { ClockIcon, MapPinIcon, WeightIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useFetchBreedById from '../api/use-fetch-breed-by-id';
import CatCompareDetailsSkeleton from './cat-compare-details-skeleton';

interface CatCompareDetailsCardProps {
  breedId: string;
}

const CatCompareDetailsCard = ({ breedId }: CatCompareDetailsCardProps) => {
  const { breedDetails, isLoading } = useFetchBreedById(breedId);

  if (isLoading) {
    return <CatCompareDetailsSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="font-bold text-xl">{breedDetails?.name}</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col mb-4">
          <p className="flex gap-1 items-center">
            <MapPinIcon className="size-4" /> Origin
          </p>
          <p className="text-muted-foreground">{breedDetails?.origin}</p>
        </div>
        <div className="flex flex-col mb-4">
          <p className="flex gap-1 items-center">
            <ClockIcon className="size-4" /> Life Span
          </p>
          <p className="text-muted-foreground">{breedDetails?.life_span}</p>
        </div>
        <div className="flex flex-col mb-4">
          <p className="flex gap-1 items-center">
            <WeightIcon className="size-4" /> Weight
          </p>
          <p className="text-muted-foreground">
            {breedDetails?.weight?.imperial}
          </p>
        </div>
        <div className="flex gap-1 flex-col mb-4">
          <p className="flex items-center">Temperament</p>
          <p className="flex gap-2 flex-wrap">
            {breedDetails?.temperament &&
              breedDetails?.temperament
                .split(',')
                .map((item) => <Badge key={item}>{item}</Badge>)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CatCompareDetailsCard;
