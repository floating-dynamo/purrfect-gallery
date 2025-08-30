'use client';

import * as React from 'react';
import {
  CheckIcon,
  ChevronsUpDownIcon,
  FilterIcon,
  TrashIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useFetchBreeds from '../api/use-fetch-breeds';

interface CatBreedFilterProps {
  selectedBreedId: string;
  handleChangeSelectedBreedId: (breedId: string) => void;
  isFetchingCats: boolean;
}

function CatBreedFilter({
  selectedBreedId,
  handleChangeSelectedBreedId,
  isFetchingCats,
}: CatBreedFilterProps) {
  const { breeds: breedsData, isLoading } = useFetchBreeds();
  const breeds: { id: string; name: string }[] = breedsData.map(
    ({ id, name }) => ({ id, name })
  );
  const [open, setOpen] = React.useState(false);
  const disableFilterTrigger = isLoading || isFetchingCats;

  const clearBreedFilter = () => {
    handleChangeSelectedBreedId('');
  };

  return (
    <>
      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
        <FilterIcon className="size-4" /> Filter By Breed
      </span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={disableFilterTrigger} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit justify-between"
          >
            {selectedBreedId
              ? breeds
                  .find((breed) => breed.id === selectedBreedId)
                  ?.name.slice(0, 5) + '...'
              : 'Select Breed'}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0 font-sans">
          <Command>
            <CommandInput placeholder="Search Breed" />
            <CommandList>
              <CommandEmpty>No Breed found.</CommandEmpty>
              <CommandGroup>
                {breeds.map((breed) => (
                  <CommandItem
                    key={breed.id}
                    value={breed.id}
                    onSelect={(currentValue) => {
                      handleChangeSelectedBreedId(
                        currentValue === selectedBreedId ? '' : currentValue
                      );
                      setOpen(false);
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedBreedId === breed.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {breed.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedBreedId && (
        <Button
          onClick={clearBreedFilter}
          variant="ghost"
          className="cursor-pointer text-red-500 hover:text-red-600"
        >
          Clear Filter
          <TrashIcon className="size-3" />
        </Button>
      )}
    </>
  );
}

export default CatBreedFilter;
