import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Remote image patterns (if using external images)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],

    // Image optimization settings
    formats: ['image/avif', 'image/webp'], // Modern formats (AVIF first, WebP fallback)

    // Responsive image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Breakpoints for responsive images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icon/thumbnail sizes

    // Quality settings
    minimumCacheTTL: 60, // Cache optimized images for 60 seconds

    // Disable image optimization in development for faster builds (optional)
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security
};

export default withNextIntl(nextConfig);
