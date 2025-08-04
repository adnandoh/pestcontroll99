import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [],
    unoptimized: true,
  },
  
  // Redirect non-www to www
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
