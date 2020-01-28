import Header from '../components/header'
import { Container } from 'theme-ui'
import Content from '../components/content'

import markdownToHtml from '../lib/markdown-to-html'

const Page = ({ html }) => (
  <>
    <Header
      title="Code of Conduct"
      desc="The required standards of conduct in the Hack Club community."
      img={`https://workshop-cards.now.sh/${encodeURIComponent(
        'Code of Conduct'
      )}.png`}
      includeMeta
    />
    <Container variant="copy" sx={{ py: [3, 4] }}>
      <Content html={html} />
    </Container>
  </>
)

export const unstable_getStaticProps = async () => {
  const { getConductContent } = require('../lib/data')
  const md = await getConductContent()
  const html = await markdownToHtml(`CONDUCT.md`, md)
  return { props: { html } }
}

export default Page
