import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React from 'react';

interface CatListPaginationProps {
  handlePrevPage: () => void;
  handleNextPage: () => void;
  currentPage: number;
  disablePreviousButton: boolean;
  disableNextButton: boolean;
}

const CatListPagination = ({
  currentPage,
  handlePrevPage,
  handleNextPage,
  disableNextButton,
  disablePreviousButton,
}: CatListPaginationProps) => {
  return (
    <>
      <Button
        variant={'outline'}
        size={'lg'}
        onClick={handlePrevPage}
        disabled={disablePreviousButton}
        aria-label="Go to previous page"
      >
        <ChevronLeftIcon className="size-4" />
        Previous
      </Button>
      <Button>{currentPage}</Button>
      <Button
        variant={'outline'}
        size={'lg'}
        onClick={handleNextPage}
        disabled={disableNextButton}
        aria-label="Go to next page"
      >
        Next
        <ChevronRightIcon className="size-4" />
      </Button>
    </>
  );
};

export default CatListPagination;
