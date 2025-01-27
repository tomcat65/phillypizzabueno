/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xsgames.co",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimization configurations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: "2mb",
    },
    typedRoutes: true,
    webpackBuildWorker: true,
  },
};

module.exports = nextConfig;
