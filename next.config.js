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
  swcMinify: true,
};

module.exports = nextConfig;
