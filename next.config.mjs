/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          mysql: false,
          mysql2: false,
          net: false,
          tls: false,
          child_process: false,
          '@mapbox/node-pre-gyp': false
        };
      }
      return config;
  },
  images: {
      domains: [
          'localhost', 
          'example.com',
      ],
      remotePatterns: [
          {
              protocol: 'http',
              hostname: 'localhost',
              port: '',
              pathname: '/psa-reservation/server/api/uploads/**',
          },
          {
              protocol: 'https',
              hostname: 'example.com',
              pathname: '/images/**',
          },
          // Add more patterns for other image sources
      ],
  },
};

export default nextConfig;