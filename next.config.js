const withMDX = require('@zeit/next-mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  webpack: config => {
    config.node = { fs: 'empty' }
    return config
  }
})
