/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t3.ftcdn.net",
      },
    ],
    domains: [
      "dynasity.nyc3.digitaloceanspaces.com",
      "t3.ftcdn.net",
      "icon-library.com",
    ],
  },
};
module.exports = nextConfig;
