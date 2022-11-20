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
    domains: [
      'randomuser.me',
      'media-exp1.licdn.com',
      'avatars.githubusercontent.com',
      'localhost',
      'cdn.intra.42.fr',
      'random.imagecdn.app',
      'joeschmoe.io']
  },
  env: {
    API_URL: 'http://localhost:5000'
  }
}

module.exports = nextConfig
