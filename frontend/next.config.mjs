/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        port: '', // Optional, if your images are served from a specific port.
        pathname: '/a/images/**', // Optional, if you want to restrict to a certain path.
      },
    ],
  },
};

export default nextConfig;
