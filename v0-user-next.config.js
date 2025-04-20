/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
  },
}

module.exports = nextConfig
