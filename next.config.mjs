/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverMinification: true,
  },
  images: {
    domains: ['img.clerk.com'],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
