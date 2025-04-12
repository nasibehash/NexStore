import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['fakestoreapi.com'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
