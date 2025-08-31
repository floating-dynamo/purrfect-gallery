import { PawPrint } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between px-8 py-4 font-sans items-center tracking-tight border-b-2 mb-4">
      <h1 className="font-bold text-lg sm:text-2xl flex gap-2 text-primary">
        {'Purrfect Gallery'} <PawPrint className="size-4 sm:size-6" />
      </h1>
      {/* <div className="hidden md:flex gap-4 text-sm sm:text-lg"> */}
      <div className="flex gap-4 text-sm sm:text-lg">
        <Link href={'/'}>Home</Link>
        <Link href={'/cats/favourites'}>Favourites</Link>
        <Link href={'/cats/compare-breeds'}>Compare Breeds</Link>
      </div>
      {/* <div className="flex md:hidden">
        <Button size={'icon'} className="cursor-pointer">
          <MenuIcon className="size-5" />
        </Button>
      </div> */}
    </nav>
  );
};

export default Navbar;
