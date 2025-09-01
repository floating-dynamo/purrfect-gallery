import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import Navbar from '../components/navbar';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/footer';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Purrfect Gallery',
  description: 'Know everything about cats.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={'Loading...'}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
