import Script from 'next/script'
import FullStory from 'react-fullstory'

const Analytics = () => (
  <>
    <Script
      defer
      data-domain="workshops.hackclub.com"
      src="https://plausible.io/js/plausible.js"
    />
    <FullStory org="ARN0J" />
  </>
)

export default Analytics
