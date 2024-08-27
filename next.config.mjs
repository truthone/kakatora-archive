/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.youtube.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.ytimg.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
