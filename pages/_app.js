import Analytics from '../components/analytics'
import '@hackclub/theme/fonts/reg-ital-bold.css'
import theme from '../lib/theme'
import NProgress from '../components/nprogress'
import { ThemeUIProvider } from 'theme-ui'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'

const MyApp = ({ Component, pageProps }) => (
  <ThemeUIProvider theme={theme}>
    <NProgress color={theme.colors.primary} />
    <Component {...pageProps} />
    <Analytics />
    <SpeedInsights />
    <VercelAnalytics />
  </ThemeUIProvider>
)

export default MyApp
