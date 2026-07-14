/** @type {import('next').NextConfig} */
const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH === 'true' ? '/SCIP-Frontend-Assessment' : '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  devIndicators: false,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  ...(repoBasePath ? {
    basePath: repoBasePath,
    assetPrefix: repoBasePath,
  } : {}),
};

module.exports = nextConfig;
