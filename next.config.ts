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
  // basePath only applied during static build, not in dev mode
  ...(process.env.NEXT_PUBLIC_BASE_PATH ? {
    basePath: '/SCIP-Frontend-Assessment',
  } : {}),
};

module.exports = nextConfig;
