import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

interface CatListCardProps {
  id: string;
  imgUrl: string;
  imgHeight: number;
  imgWidth: number;
}

const CatListCard = ({ id, imgUrl, imgHeight, imgWidth }: CatListCardProps) => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/cats/${id}`);
  };

  return (
    <div>
      <Image
        onClick={handleImageClick}
        src={imgUrl}
        width={imgWidth}
        height={imgHeight}
        alt={`Cat Image - ${id}`}
        className="rounded-md m-4 w-[250px] h-[250px] object-cover cursor-pointer"
      />
    </div>
  );
};

export default CatListCard;
