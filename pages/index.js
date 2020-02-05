import dynamic from 'next/dynamic'
import theme from '@hackclub/theme'
import { Button, useColorMode } from 'theme-ui'
import Header from '../components/header'
import Listing from '../components/listing'
import styled from '@emotion/styled'
const Blobs = dynamic(import('../components/blobs'), {
  ssr: false
})

export default ({ sections }) => {
  const [mode] = useColorMode()

  const Wrapper = styled.div`
    z-index: -100;
    position: fixed;
    background-color: ${mode === 'dark' ? theme.colors.darkless : theme.colors.sheet}
`

  return (
    <>
      <Wrapper>
        <Blobs />
      </Wrapper>

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

      {sections.map(({ key, ...section }) => (
        <Listing key={key} id={key} {...section} />
      ))}
    </>
  )
}

export const unstable_getStaticProps = async () => {
  const { getWorkshopSections } = require('../lib/data')
  const sections = await getWorkshopSections()
  return { props: { sections } }
}
