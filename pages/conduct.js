import { Container } from 'theme-ui'
import Header from '../components/header'
import Content from '../components/content'

const Page = ({ html }) => (
  <>
    <Header
      title="Code of Conduct"
      desc="The required standards of conduct for the Hack Club community & events."
      img="https://workshop-cards.hackclub.com/Code%20of%20Conduct.png?theme=light&fontSize=300px"
      includeMeta
      sx={{ bg: 'transparent', mb: 0 }}
    />
    <Container variant="copy" sx={{ py: [3, 4] }}>
      <Content html={html} />
    </Container>
  </>
)

export const getStaticProps = async () => {
  const { getConductHtml } = require('../lib/data')
  const html = await getConductHtml()
  return { props: { html } }
}

export default Page
