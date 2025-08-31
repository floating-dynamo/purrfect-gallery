import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { InfoIcon } from 'lucide-react';

interface CatListCardProps {
  id: string;
  imgUrl: string;
  imgHeight?: number;
  imgWidth?: number;
}

const CatListCard = ({ id, imgUrl, imgHeight, imgWidth }: CatListCardProps) => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/cats/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-1 relative">
      <Image
        src={imgUrl}
        width={imgWidth || 250}
        height={imgHeight || 250}
        alt={`Cat Image - ${id}`}
        className="rounded-md mx-4 my-2 w-[250px] h-[250px] object-cover"
      />
      <Button
        onClick={handleImageClick}
        className="w-[80%] mx-auto absolute bottom-4 cursor-pointer flex items-center"
      >
        View Details <InfoIcon className='size-4'/>
      </Button>
    </div>
  );
};

export default CatListCard;
