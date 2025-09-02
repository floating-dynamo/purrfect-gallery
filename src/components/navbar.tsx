'use client';
import { MenuIcon, PawPrint } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between px-8 py-4 font-sans items-center tracking-tight border-b-2 mb-4">
      {/* Logo */}
      <Link
        href="/"
        className="font-bold text-lg md:text-2xl flex gap-2 text-primary"
        onClick={() => setOpen(false)}
      >
        Purrfect Gallery <PawPrint className="size-4 sm:size-6" />
      </Link>

      {/* Desktop Nav */}
      <NavigationLinks
        className="hidden md:flex"
        onLinkClick={() => setOpen(false)}
      />

      {/* Mobile Nav */}
      <div className="md:hidden">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="Toggle menu">
              <MenuIcon className="size-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={8}
            className="flex flex-col gap-2 p-3 w-40 md:hidden"
          >
            <NavigationLinks
              className="flex flex-col gap-2"
              onLinkClick={() => setOpen(false)}
            />
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

const NavigationLinks = ({
  className,
  onLinkClick,
}: {
  className?: string;
  onLinkClick?: () => void;
}) => {
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
            onClick={onLinkClick}
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
