const vcUrl = process.env.VERCEL_URL
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  experimental: { trailingSlash: true },
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: vcUrl ? `https://${vcUrl}` : '',
  webpack: config => {
    config.node = { fs: 'empty' }
    return config
  }
})
