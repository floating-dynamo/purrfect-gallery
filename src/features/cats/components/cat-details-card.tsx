import StarRating from '@/components/star-rating';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { CatIcon, InfoIcon, MapPinIcon } from 'lucide-react';
import React from 'react';

interface CatDetailsCardProps {
  name: string;
  description: string;
  origin: string;
  temperament?: string;
  lifeSpan: string;
  weight: string;
  traits?: {
    intelligence: number;
    grooming: number;
    healthIssues: number;
    energyLevel: number;
    dogFriendly: number;
    childFriendly: number;
    strangerFriendly: number;
  };
}

const CatDetailsCard = ({
  name,
  description,
  origin,
  temperament,
  lifeSpan,
  weight,
  traits,
}: CatDetailsCardProps) => {
  return (
    <div className="pb-4 flex-col flex-wrap md:max-w-[32rem] items-center justify-center">
      <h1 className="font-bold text-3xl tracking-tight py-1">{name}</h1>
      <p className="pt-1 pb-3 text-muted-foreground flex items-center gap-1">
        <MapPinIcon className="size-5" /> {origin}
      </p>

      <Card>
        <CardHeader>
          <h2 className="font-bold text-2xl tracking-tight flex items-center gap-1">
            <InfoIcon className="size-5 text-muted-foreground" /> About this
            breed
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
          <div className="mt-2 flex gap-8 items-center">
            <div>
              <h4 className="font-bold">Life Span</h4>
              <p className="text-muted-foreground">{lifeSpan ?? 'N.A'}</p>
            </div>
            <div>
              <h4 className="font-bold">Weight</h4>
              <p className="text-muted-foreground">{weight ?? 'N.A'}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-1 flex-col items-start">
          <h2 className="font-bold text-xl tracking-tight py-1">Temperament</h2>
          <div>
            {temperament?.split(',').map((label) => (
              <Badge className="mr-2" key={label}>
                {label.trim()}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>

      {traits && (
        <Card className="mt-4">
          <CardHeader>
            <h2 className="font-bold text-2xl tracking-tigh flex items-center gap-1">
              <CatIcon className="size-5 text-muted-foreground" /> Personality
              Traits
            </h2>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-8">
            <div className="flex flex-col items-center mb-2">
              <p className="text-muted-foreground">Intelligence</p>
              <StarRating rating={traits.intelligence} />
            </div>
            <div className="flex flex-col items-center mb-2">
              <p className="text-muted-foreground">Health Issues</p>
              <StarRating rating={traits.healthIssues} />
            </div>
            <div className="flex flex-col items-center mb-2">
              <p className="text-muted-foreground">Energy Level</p>
              <StarRating rating={traits.energyLevel} />
            </div>
            <div className="flex flex-col items-center mb-2">
              <p className="text-muted-foreground">Child Friendly</p>
              <StarRating rating={traits.childFriendly} />
            </div>
            <div className="flex flex-col items-center mb-2">
              <p className="text-muted-foreground">Stranger Friendly</p>
              <StarRating rating={traits.strangerFriendly} />
            </div>
            <div className="flex flex-col items-center mb-2">
              <p className="text-muted-foreground">Dog Friendly</p>
              <StarRating rating={traits.dogFriendly} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CatDetailsCard;
