const isProd = process.env.NODE_ENV === 'production'
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react'
  }
})
module.exports = withMDX({
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: '/workshops',
  images: {
    imageSizes: [512]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false
      }
    }
    return config
  },
  async redirects() {
    return [
      {
        source: '/privacy',
        destination: '/privacy-and-terms',
        permanent: true
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/content/:slug*',
        destination:
          'https://raw.githubusercontent.com/hackclub/hackclub/main/:slug*'
      },
      {
        source: '/workshops.json',
        destination: '/api/workshops'
      },
      { source: '/workshops/_next/:path*', destination: '/_next/:path*' }
    ]
  }
})
