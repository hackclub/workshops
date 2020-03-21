const isProd = process.env.NODE_ENV === 'production'
const withMDX = require('@zeit/next-mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: isProd ? 'https://workshops.hackclub.com' : '',
  webpack: config => {
    config.node = { fs: 'empty' }
    return config
  }
})
