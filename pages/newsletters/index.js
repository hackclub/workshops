import { Heading, Container, Button } from 'theme-ui'
import { GitHub } from 'react-feather'
import Header from '../../components/header'
import Content from '../../components/content'
import Issues from '../../components/newsletters'

const Page = ({ slugs, html }) => (
  <>
    <Header
      title="Newsletters"
      desc="Email updates sent to Hack Club’s Slack Community every month."
      img="https://workshop-cards.hackclub.com/Newsletters.png?brand=HQ&theme=dark"
      includeMeta
      sx={{ mb: 0 }}
    />
    <Container variant="copy" py={3}>
      <Heading variant="headline">Recent issues</Heading>
      <Issues issues={slugs} vip={false} />
      <Button
        as="a"
        href="https://github.com/hackclub/newsletter"
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
  const { getNewsletterSlugs, getNewslettersHtml } = require('../../lib/data')
  const slugs = await getNewsletterSlugs()
  const html = await getNewslettersHtml()
  return { props: { slugs, html }, revalidate: 30 }
}

export default Page
