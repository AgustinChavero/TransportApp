/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "storage.googleapis.com",
      "horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app",
    ],
  },
};

module.exports = nextConfig;
