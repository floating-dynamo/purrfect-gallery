import { Badge } from '@/components/ui/badge';
import React from 'react';

interface CatDetailsCardProps {
  id: number;
  name: string;
  description: string;
  origin: string;
  temperament?: string;
}

const CatDetailsCard = ({
  name,
  description,
  origin,
  temperament,
}: CatDetailsCardProps) => {
  return (
    <div className="py-4 flex-col flex-wrap md:max-w-[32rem] items-center justify-center">
      <h1 className="font-bold text-3xl tracking-tight py-1">{name}</h1>
      <p>{description}</p>

      <div className="mt-2">
        <h2 className="font-bold text-2xl tracking-tight py-1">Origin</h2>
        <p>{origin}</p>
      </div>

      <div className="mt-2">
        <h2 className="font-bold text-2xl tracking-tight py-1">Temperament</h2>
        <div>
          {temperament?.split(',').map((label) => (
            <Badge className="mr-2" key={label}>
              {label.trim()}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatDetailsCard;
