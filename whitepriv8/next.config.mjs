/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/whitepriv8',
  assetPrefix: '/whitepriv8',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: false
}

export default nextConfig
