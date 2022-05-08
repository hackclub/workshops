const isProd = process.env.NODE_ENV === 'production'
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  assetPrefix: '/workshops',
  images: {
    imageSizes: [512]
  },
  async rewrites() {
    return [
      {
        source: '/content/:slug*',
        destination: 'https://raw.githubusercontent.com/hackclub/hackclub/main/:slug*',
        
      },
      {
        source: '/workshops.json',
        destination: '/api/workshops',
   
      },
      { source: '/workshops/_next/:path*', destination: '/_next/:path*' }
    ]
  },
})
