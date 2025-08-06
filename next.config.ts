import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [],
    unoptimized: true,
  },
  
  // Force trailing slashes
  trailingSlash: true,
  
  // Redirect all non-www and non-https to https://www
  async redirects() {
    return [
      // Redirect old about URL to new about-us URL
      {
        source: '/about/',
        destination: '/about-us/',
        permanent: true,
      },
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
};

export default nextConfig;
