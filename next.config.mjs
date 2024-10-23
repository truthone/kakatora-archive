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
      {
        protocol: 'https',
        hostname: 'image.cine21.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
