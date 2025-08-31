import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
}

const StarRating = ({ rating, totalStars = 5, size = 15 }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: totalStars }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }
        />
      ))}
    </div>
  );
};

export default StarRating;
