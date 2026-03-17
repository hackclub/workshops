import React from 'react'
import Analytics from '../components/analytics'
import '@hackclub/theme/fonts/reg-ital-bold.css'
import theme from '../lib/theme'
import NProgress from '../components/nprogress'
import { ThemeProvider } from 'theme-ui'
import { SpeedInsights } from '@vercel/speed-insights/next'

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <NProgress color={theme.colors.primary} />
    <Component {...pageProps} />
    <Analytics />
    <SpeedInsights />
  </ThemeProvider>
)

export default MyApp
