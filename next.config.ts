// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // <--- CLOUDINARY UCHUN RUXSAT
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avtobozor.onrender.com', // Eski Render rasmlari uchun (ehtiyot shart)
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'carexkorea.ru',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;