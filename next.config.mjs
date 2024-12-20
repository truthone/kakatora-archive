/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '**.youtube.com',
  //       port: '',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: '**.ytimg.com',
  //       port: '',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'image.cine21.com',
  //       port: '',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'drive.google.com',
  //       port: '',
  //     }
  //   ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 모든 도메인 허용
      },
    ],
  },
};

export default nextConfig;
