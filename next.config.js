const isProd = process.env.NODE_ENV === 'production'
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
console.log('VERCEL URL', process.env.VERCEL_URL)
module.exports = withMDX({
  experimental: { trailingSlash: true },
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: isProd ? 'https://workshops.hackclub.com' : '',
  webpack: config => {
    config.node = { fs: 'empty' }
    return config
  }
})
