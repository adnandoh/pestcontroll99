import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pestcontrol99.in',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },

  // Enable compression
  compress: true,

  // Force trailing slashes
  trailingSlash: true,

  // Optimize build output
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },

  // Redirect all non-www and non-https to https://www
  async redirects() {
    return [
      // Redirect non-www to www (both http and https)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'pestcontrol99.com',
          },
        ],
        destination: 'https://www.pestcontrol99.com/:path*',
        permanent: true,
      },
      // Redirect http://www to https://www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.pestcontrol99.com',
          },
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.pestcontrol99.com/:path*',
        permanent: true,
      },
    ];
  },

  // Add security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
