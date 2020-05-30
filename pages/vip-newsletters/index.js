import { Heading, Container } from 'theme-ui'
import Header from '../../components/header'
import Content from '../../components/content'
import Issues from '../../components/vip-newsletters'

const Page = ({ slugs, html }) => (
  <>
    <Header
      title="VIP Newsletters"
      desc="Email updates sent to Hack Club’s largest supporters, every&nbsp;2&nbsp;weeks."
      img="https://workshop-cards.hackclub.com/VIP%20Newsletters.png?brand=HQ&theme=dark"
      includeMeta
      sx={{ mb: 0 }}
    />
    <Container variant="copy" py={3}>
      <Heading variant="headline">Recent issues</Heading>
      <Issues issues={slugs} />
      <Heading variant="headline" mt={4}>
        About these newsletters
      </Heading>
      <Content html={html} />
    </Container>
  </>
)

export const getStaticProps = async () => {
  const { getNewsletterSlugs, getNewslettersHtml } = require('../../lib/data')
  const slugs = await getNewsletterSlugs()
  const html = await getNewslettersHtml()
  return { props: { slugs, html } }
}

export default Page
