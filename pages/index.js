import dynamic from 'next/dynamic'
import { Button } from 'theme-ui'
import Header from '../components/header'
import Listing from '../components/listing'
import styled from '@emotion/styled'

const Blobs = dynamic(import('../components/blobs'), {
  ssr: false
})

const Wrapper = styled.div`
  position: relative;
  z-index: -1;
  top: 0;
  left: 0;
  margin-top: -25rem;
`

const StyledBlobs = styled(Blobs)`
  z-index: 0;
  top: 0;
  left: 0;
`

export default ({ sections }) => (
  <>
    <StyledBlobs />
    <Wrapper>
      <Header
        title="Hack Club Workshops"
        desc="Learn to code with this collection of community-contributed, self-guided coding tutorials + ideas."
        sx={{ mb: 0 }}
      >
        <Button
          as="a"
          href="https://hackclub.com/philosophy/"
          variant="outline"
          sx={{
            mt: [3, 4],
            transition: '.125s transform ease-in-out',
            ':hover,:focus': { transform: 'scale(1.0625)' }
          }}
        >
          Our Philosophy »
        </Button>
      </Header>
    </Wrapper>
    {sections.map(({ key, ...section }) => (
      <Listing key={key} id={key} {...section} />
    ))}
  </>
)

export const unstable_getStaticProps = async () => {
  const { getWorkshopSections } = require('../lib/data')
  const sections = await getWorkshopSections()
  return { props: { sections } }
}
