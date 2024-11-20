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
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path((?!24tebas-land|images).*)',
        destination: '/24tebas-land',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
