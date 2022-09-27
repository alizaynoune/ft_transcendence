/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  images: {
    domains: [' https://randomuser.me', 'media-exp1.licdn.com', 'avatars.githubusercontent.com']
  },
  
}

module.exports = nextConfig
