/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Proxy API requests to backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_URL || 'http://localhost:3001/api/:path*',
      },
    ];
  },
  // Environment variables exposed to the browser
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3001',
  },
}

module.exports = nextConfig
