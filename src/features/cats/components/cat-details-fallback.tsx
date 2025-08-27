import { CatIcon } from 'lucide-react';
import React from 'react';

const CatDetailsFallback = () => {
  return (
    <div className="pt-8 flex flex-col flex-wrap items-center justify-center text-muted-foreground gap-4">
      <CatIcon className="size-5" />
      <p>No information available.</p>
    </div>
  );
};

export default CatDetailsFallback;
