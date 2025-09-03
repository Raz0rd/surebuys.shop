/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/whitepriv8',
  assetPrefix: '/whitepriv8',
  output: 'export',
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
  experimental: {
    optimizeCss: false
  }
}

export default nextConfig
