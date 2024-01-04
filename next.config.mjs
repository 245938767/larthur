/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverMinification: true,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    domains: ['img.clerk.com'],
  },
};

export default nextConfig;
