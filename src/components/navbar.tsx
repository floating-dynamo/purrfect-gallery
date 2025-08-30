import { PawPrint } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between px-8 py-4 font-sans items-center tracking-tight border-b-2 mb-4">
      <h1 className="font-bold text-lg sm:text-2xl flex gap-2">
        {'Purrfect Gallery'} <PawPrint className="size-6" />
      </h1>
      <div className='flex gap-4'>
        <Link href={'/'}>Home</Link>
        <Link href={'/cats/favourites'}>Favourites</Link>
      </div>
    </nav>
  );
};

export default Navbar;
