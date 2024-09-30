// next.config.mjs
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true, // Enabling top-level-await
      };
      return config;
    },
  };
  
  export default nextConfig;
  