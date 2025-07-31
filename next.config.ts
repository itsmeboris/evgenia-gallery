import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    // Allow serving images from public folder
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
