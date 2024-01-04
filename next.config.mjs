/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '2mb', // 增加限制到 2MB
    },
  },
  experimental: {
    serverMinification: true,
  },
  images: {
    domains: ['img.clerk.com'],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
