/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  devIndicators: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  // Always use basePath for GitHub Pages subdirectory deployment
  basePath: '/SCIP-Frontend-Assessment',
  assetPrefix: '/SCIP-Frontend-Assessment',
};

module.exports = nextConfig;
