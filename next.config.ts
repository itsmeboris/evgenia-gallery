import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@prisma/client'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    // Optimize image delivery for art gallery
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days cache
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    // Enable optimization in production, allow local development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
