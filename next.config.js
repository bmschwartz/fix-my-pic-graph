/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['mui-file-input'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'white-giant-rooster-133.mypinata.cloud',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add custom file loader for .node files
    config.module.rules.push({
      test: /\.node$/,
      use: 'file-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
