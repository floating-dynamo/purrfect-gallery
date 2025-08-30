import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownUpIcon, CheckIcon, ChevronsUpDown } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SortByType } from '@/lib/types';

interface CatListSortProps {
  sortBy: SortByType;
  changeSortOrder: (order: SortByType) => void;
  disableSortByDropdown: boolean;
}

const CatListSort = ({
  changeSortOrder,
  sortBy,
  disableSortByDropdown,
}: CatListSortProps) => {
  const sortOptions: { label: string; value: SortByType }[] = [
    { label: 'Random', value: SortByType.RANDOM },
    { label: 'Ascending', value: SortByType.ASCENDING },
    { label: 'Descending', value: SortByType.DESCENDING },
  ];

  const currentLabel =
    sortOptions.find((option) => option.value === sortBy)?.label || 'Sort By';

  return (
    <>
      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
        <ArrowDownUpIcon className="size-4" /> Sort By
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'flex items-center gap-2 font-sans w-fit'
          )}
          disabled={disableSortByDropdown}
        >
          {currentLabel}
          <ChevronsUpDown className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortOptions.map(({ label, value }) => (
            <DropdownMenuItem
              className="font-sans"
              key={value}
              onSelect={() => {
                if (currentLabel !== sortBy) {
                  changeSortOrder(value);
                }
              }}
            >
              {label}
              {sortBy === value && <CheckIcon className="size-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CatListSort;
