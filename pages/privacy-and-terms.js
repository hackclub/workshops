import { Container } from 'theme-ui'
import Header from '../components/header'
import Content from '../components/content'

const Page = ({ html }) => {
  return (
    <>
      <Header
        title="Hack Club Privacy Notice & Terms and Conditions"
        desc="Hack Club's privacy policy and terms of service."
        img="https://workshop-cards.hackclub.com/Privacy%20and%20Terms.png?theme=light&fontSize=200px"
        includeMeta
        sx={{ mb: 0 }}
      />
      
      <Container variant="copy" sx={{ py: [3, 4] }}>
        <Content html={html} />
      </Container>
    </>
  )
}

export const getServerSideProps = async () => {
  const { getPrivacyHtml } = require('../lib/data-server')
  const html = await getPrivacyHtml()
  
  return { 
    props: { html }
  }
}

export default Page
