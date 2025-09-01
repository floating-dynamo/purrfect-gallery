'use client';
import { MenuIcon, PawPrint } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Navbar = () => {
  return (
    <nav className="flex justify-between px-8 py-4 font-sans items-center tracking-tight border-b-2 mb-4">
      <Link
        href="/"
        className="font-bold text-lg sm:text-2xl flex gap-2 text-primary"
      >
        Purrfect Gallery <PawPrint className="size-4 sm:size-6" />
      </Link>

      {/* Desktop Nav */}
      <NavigationLinks className="hidden md:flex" />

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="Toggle menu" className='cursor-pointer'>
              <MenuIcon className="size-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={8}
            className="flex flex-col gap-2 p-3 w-40"
          >
            <NavigationLinks className="flex flex-col gap-2" />
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

const NavigationLinks = ({ className }: { className?: string }) => {
  return (
    <ul className={cn('gap-4 text-sm sm:text-lg flex', className)}>
      {[
        { href: '/', label: 'Home' },
        { href: '/cats/favourites', label: 'Favourites' },
        { href: '/cats/compare-breeds', label: 'Compare Breeds' },
      ].map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className="hover:text-primary font-medium transition-colors font-sans"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
