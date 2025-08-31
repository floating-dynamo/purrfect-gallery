import React from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
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
import { CatBreedItem } from '@/lib/types';

interface CatBreedsComboboxProps {
  breeds: CatBreedItem[];
  isLoading: boolean;
  selectedBreedId: string;
  handleChangeBreedId: (breedId: string) => void;
  placeholder: string;
}

const CatBreedsCombobox = ({
  breeds,
  isLoading,
  selectedBreedId,
  handleChangeBreedId,
  placeholder = 'Select Breed',
}: CatBreedsComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger disabled={isLoading} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[120px] sm:w-[200px] justify-between"
          >
            <span className="max-w-[120px] truncate sm:max-w-none">
              {selectedBreedId
                ? breeds?.find((breed) => breed.id === selectedBreedId)?.name ??
                  'Loading...'
                : placeholder}
            </span>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0 font-sans">
          <Command>
            <CommandInput placeholder="Search Breed" />
            <CommandList>
              <CommandEmpty>No Breed found.</CommandEmpty>
              <CommandGroup>
                {breeds &&
                  breeds.length > 0 &&
                  breeds.map((breed) => (
                    <CommandItem
                      key={breed.id}
                      value={breed.id}
                      onSelect={(currentValue) => {
                        handleChangeBreedId(
                          currentValue === selectedBreedId ? '' : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4 text-primary',
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
    </div>
  );
};

export default CatBreedsCombobox;
