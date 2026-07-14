/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages subdirectory deployment
  basePath: '/SCIP-Frontend-Assessment',
  assetPrefix: '/SCIP-Frontend-Assessment',
  trailingSlash: true,
  // Disable server features for static export
  reactStrictMode: true,
};

module.exports = nextConfig;