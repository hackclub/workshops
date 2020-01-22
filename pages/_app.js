import * as React from 'react'
import NextApp from 'next/app'
import { CacheProvider } from '@emotion/core'
import { cache } from 'emotion'

import { ThemeProvider } from 'theme-ui'
import { theme } from '@hackclub/theme'
import Nav from '../components/nav'
import NProgress from '../components/nprogress'
import Footer from '../components/footer'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <style>{`
          @font-face {
            font-family: 'Phantom Sans';
            src: url('https://hackclub.com/fonts/Phantom_Sans_0.4/Regular.woff')
                format('woff'),
              url('https://hackclub.com/fonts/Phantom_Sans_0.4/Regular.woff2')
                format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Phantom Sans';
            src: url('https://hackclub.com/fonts/Phantom_Sans_0.4/Bold.woff')
                format('woff'),
              url('https://hackclub.com/fonts/Phantom_Sans_0.4/Bold.woff2')
                format('woff2');
            font-weight: bold;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
          <NProgress color={theme.colors.primary} />
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </CacheProvider>
    )
  }
}
