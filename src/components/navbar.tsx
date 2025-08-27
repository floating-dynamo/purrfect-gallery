import { PawPrint } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex justify-between px-8 py-4 font-sans items-center tracking-tight">
      <h1 className='font-bold text-lg sm:text-2xl flex gap-2'>{'Purrfect Gallery'} <PawPrint className='size-6'/></h1>
      <Link href={'/'}>Home</Link>
    </div>
  );
};

export default Navbar;
