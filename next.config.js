const isProd = process.env.NODE_ENV === 'production'
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  basePath: '/workshops',
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
        source: '/vip-newsletters/:slug*',
        destination: 'https://raw.githubusercontent.com/hackclub/vip-newsletters/main/:slug*',
 
      },
      {
        source: '/workshops.json',
        destination: '/api/workshops',
   
      },
      { source: '/', destination: '/workshops/' },
      { source: '/:path*', destination: '/workshops/:path*' }
    ]
  },
})
