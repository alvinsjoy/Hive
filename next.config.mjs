/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/analytics.js',
        destination: 'https://cloud.umami.is/script.js',
      },
    ];
  },
};

export default nextConfig;
