import React from 'react'

import '@hackclub/theme/fonts/reg-ital-bold.css'
import theme from '../lib/theme'
import NProgress from '../components/nprogress'
import { ThemeProvider } from 'theme-ui'

const App = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <NProgress color={theme.colors.primary} />
    <Component {...pageProps} />
  </ThemeProvider>
)

export default App
