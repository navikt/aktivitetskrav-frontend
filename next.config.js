/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: '/syk/aktivitetskrav',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
