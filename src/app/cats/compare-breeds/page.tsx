'use client';
import useCompareBreeds from '@/features/cats/api/use-compare-breeds';
import CatBreedsCombobox from '@/features/cats/components/cat-breeds-combobox';
import CatCompareDetailsCard from '@/features/cats/components/cat-compare-details-card';
import { ArrowLeftRightIcon } from 'lucide-react';
import React from 'react';

const CompareBreedsPage = () => {
  const {
    breedId1,
    breedId2,
    breeds,
    handleChangeBreedId1,
    handleChangeBreedId2,
    isLoading,
  } = useCompareBreeds();

  return (
    <div className="min-h-[80vh] font-sans px-8 py-4">
      <h1 className="font-bold text-2xl tracking-tight">Compare Breeds</h1>
      <p className="text-muted-foreground">
        Select two cat breeds to compare their characteristics, temperament, and
        traits side by side.
      </p>
      <div className="flex flex-col md:flex-row gap-8 w-full items-center md:items-start justify-evenly mt-8">
        <div className="flex gap-4 w-full md:w-1/3 flex-col-reverse md:flex-col items-center justify-center">
          <CatBreedsCombobox
            placeholder="Select Breed 1"
            selectedBreedId={breedId1}
            handleChangeBreedId={handleChangeBreedId1}
            breeds={breeds}
            isLoading={isLoading}
          />
          {breedId1 && <CatCompareDetailsCard breedId={breedId1} />}
        </div>
        <div>
          <ArrowLeftRightIcon className="size-12 text-white bg-primary rounded-full p-2 md:rotate-0 rotate-90" />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/3 items-center justify-center">
          <CatBreedsCombobox
            placeholder="Select Breed 2"
            selectedBreedId={breedId2}
            handleChangeBreedId={handleChangeBreedId2}
            breeds={breeds}
            isLoading={isLoading}
          />
          {breedId2 && <CatCompareDetailsCard breedId={breedId2} />}
        </div>
      </div>
    </div>
  );
};

export default CompareBreedsPage;
