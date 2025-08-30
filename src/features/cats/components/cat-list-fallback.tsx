import { CatIcon } from 'lucide-react';
import React from 'react';

const CatListFallback = () => {
  return (
    <div className="h-full my-auto flex flex-col gap-4 items-center justify-center text-muted-foreground">
      <CatIcon className="size-12" />
      <p className="text-xl">Oops. No Cats found.</p>
    </div>
  );
};

export default CatListFallback;
