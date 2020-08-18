const isProd = process.env.NODE_ENV === 'production'
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: isProd ? '/workshops' : '',
  webpack: config => {
    config.node = { fs: 'empty' }
    return config
  }
})
