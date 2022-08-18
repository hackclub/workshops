import { Heading, Container, Button } from 'theme-ui'
import { GitHub } from 'react-feather'
import Header from '../../components/header'
import Content from '../../components/content'
import Issues from '../../components/newsletters'

const Page = ({ slugs, html }) => (
  <>
    <Header
      title="VIP Newsletters"
      desc="Email updates sent to Hack Club’s largest supporters every month."
      img="https://workshop-cards.hackclub.com/VIP%20Newsletters.png?brand=HQ&theme=dark"
      includeMeta
      sx={{ mb: 0 }}
    />
    <Container variant="copy" py={3}>
      <Heading variant="headline">Recent issues</Heading>
      <Issues issues={slugs} />
      <Button
        as="a"
        href="https://github.com/hackclub/vip-newsletters"
        variant="outline"
        sx={{ color: 'muted', mt: 3 }}
      >
        <GitHub />
        View on GitHub
      </Button>
      <Heading variant="headline" mt={4}>
        About these newsletters
      </Heading>
      <Content html={html} />
      <style>
        {`
        .hidden {
          display: none
        }
        `}
      </style>
    </Container>
  </>
)

export const getStaticProps = async () => {
  const { getVIPNewsletterSlugs, getVIPNewslettersHtml } = require('../../lib/data')
  const slugs = await getVIPNewsletterSlugs()
  const html = await getVIPNewslettersHtml()
  return { props: { slugs, html }, revalidate: 30 }
}

export default Page
