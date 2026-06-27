/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*.stripe.com',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
