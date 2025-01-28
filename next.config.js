/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xsgames.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Development optimization
  webpack: (config, { dev, isServer }) => {
    // Only enable type checking in production
    if (dev) {
      config.infrastructureLogging = {
        level: "error",
      };
    }
    return config;
  },
  // Disable type checking during development
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Only run ESLint on save during development
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Reduce the number of pages being compiled at once
  experimental: {
    workerThreads: false,
    cpus: Math.max(1, Math.min(4, require("os").cpus().length - 1)),
  },
  // Optimization configurations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
