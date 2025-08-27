import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoaderProps {
  title?: string;
}

const Loader = ({ title }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="size-4 animate-spin" />
      {title && <p>{title}</p>}
    </div>
  );
};

export default Loader;
