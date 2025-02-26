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
};

export default nextConfig;
