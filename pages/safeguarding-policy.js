import { Container } from 'theme-ui'
import Header from '../components/header'
import Content from '../components/content'

const Page = ({ html }) => {
  return (
    <>
      <Header
        title="Hack Club Events Safeguarding Policy"
        desc="Adopted and Published January 15, 2026 | 8-10 minute read"
        img="https://workshop-cards.hackclub.com/Safeguarding%20Policy.png?theme=light&fontSize=200px"
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
  const { getSafeguardingHtml } = require('../lib/data')
  const html = await getSafeguardingHtml()
  
  return { 
    props: { html }
  }
}

export default Page
