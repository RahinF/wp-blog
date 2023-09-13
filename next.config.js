/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: "**.gravatar.com",
          },
          {
            protocol: 'http',
            hostname: "localhost/**",
          },
        ],
      },
}

module.exports = nextConfig
