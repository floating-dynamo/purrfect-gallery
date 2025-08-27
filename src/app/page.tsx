'use client';
import CatListCard from '@/features/cats/components/cat-list-card';
import { CatListItem } from '@/lib/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../components/loader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CatListSort from '@/features/cats/components/cat-list-sort';
import { CATS_LIMIT_PER_PAGE } from '@/lib/constants';

export default function Home() {
  const [cats, setCats] = useState<CatListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCats() {
      try {
        setIsLoading(true);
        const catsResponse = await axios.get('/api/cats', {
          params: { limit: CATS_LIMIT_PER_PAGE, page: 0 },
        });
        console.log(catsResponse.data);
        setCats(catsResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCats();
  }, []);

  if (isLoading && cats.length === 0) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col font-sans px-8">
      <div className="px-8">
        <CatListSort />
      </div>
      <div className="flex flex-wrap items-center justify-center">
        {cats?.map(({ id, url, height, width }) => (
          <CatListCard
            key={id}
            id={id}
            imgUrl={url}
            imgHeight={height}
            imgWidth={width}
          />
        ))}
      </div>
      <div className="flex items-center justify-center gap-8 w-full py-4">
        <Button variant={'outline'} size={'lg'}>
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <div>
          <Button>Previous</Button>
          <Button>Previous</Button>
        </div>
        <Button variant={'outline'} size={'lg'}>
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
