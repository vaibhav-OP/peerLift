/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["media.discordapp.net"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
