import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronsUpDown } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CatListSort = () => {
  const sortOptions = ['Random', 'Ascending', 'Descending'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'flex items-center gap-2 font-sans'
        )}
      >
        Sort By <ChevronsUpDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortOptions.map((sortOption) => (
          <DropdownMenuItem className="font-sans" key={sortOption}>
            {sortOption}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CatListSort;
