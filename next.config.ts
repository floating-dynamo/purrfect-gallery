import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.theimageapi.com',
      },
      {
        protocol: 'https',
        hostname: '*.thecatapi.com',
      },
      {
        protocol: 'https',
        hostname: '*.media.tumblr.com',
      },
    ],
  },
};

export default nextConfig;
