/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverMinification: true,
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    domains: ['i.imgur.com'],
  },
};

export default nextConfig;
