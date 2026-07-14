/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  devIndicators: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  ...(isProduction
    ? {
        // For GitHub Pages subdirectory deployment
        basePath: '/SCIP-Frontend-Assessment',
        assetPrefix: '/SCIP-Frontend-Assessment',
      }
    : {}),
};

module.exports = nextConfig;