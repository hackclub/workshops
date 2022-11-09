import { Heading, Container, Button } from 'theme-ui'
import { GitHub } from 'react-feather'
import Header from '../../components/header'
import Content from '../../components/content'
import Issues from '../../components/newsletters'

const Page = ({ slugs, pastSlugs, html }) => (
  <>
    <Header
      title="Leader Newsletters"
      desc="Email updates sent to Hack Club's club leaders every month."
      includeMeta
      sx={{ mb: 0 }}
    />
    <Container variant="copy" py={3}>
      <Heading variant="headline">Recent issues</Heading>
      <Issues issues={slugs} kind="leader" />
      <Heading variant="headline" sx={{ mt: 4 }}>
        Archive
      </Heading>
      <Issues issues={pastSlugs} kind="leader-newsletters/archived" />
      <Button
        as="a"
        href="https://github.com/hackclub/leaders-newsletter"
        variant="outline"
        sx={{ color: 'muted', mt: 4 }}
      >
        <GitHub />
        View on GitHub
      </Button>
      <Heading variant="headline" mt={4}>
        About these newsletters
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
  const {
    getLeaderNewsletterSlugs,
    getLeaderNewsletterHtml
  } = require('../../lib/data')
  const slugs = await getLeaderNewsletterSlugs()
  const currentSlugs = slugs.find(x => x.kind === 'updates').slugs
  const pastSlugs = slugs.find(x => x.kind === 'archive').slugs
  const html = await getLeaderNewsletterHtml()
  return { props: { slugs: currentSlugs, html, pastSlugs }, revalidate: 30 }
}

export default Page
