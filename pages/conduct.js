import { Container } from 'theme-ui'
import Header from '../components/header'
import Content from '../components/content'

const Page = ({ html }) => (
  <>
    <Header
      title="Code of Conduct"
      desc="The required standards of conduct in the Hack Club community."
      img={`https://workshop-cards.now.sh/${encodeURIComponent(
        'Code of Conduct'
      )}.png`}
      includeMeta
      sx={{ mb: 0 }}
    />
    <Container variant="copy" sx={{ py: [3, 4] }}>
      <Content html={html} />
    </Container>
  </>
)

export const unstable_getStaticProps = async () => {
  const { getConductHtml } = require('../lib/data')
  const html = await getConductHtml()
  return { props: { html } }
}

export default Page
