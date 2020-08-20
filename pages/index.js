import dynamic from 'next/dynamic'
import { Box, Button } from 'theme-ui'
import Header from '../components/header'
import Listing from '../components/listing'
import Footer from '../components/footer'

const Blobs = dynamic(import('../components/blobs'), { ssr: false })

export default ({ sections }) => (
  <>
    <Box
      sx={{
        zIndex: -1,
        position: 'fixed',
        bg: 'sheet',
        '@media print': { display: 'none' }
      }}
    >
      <Blobs />
    </Box>
    <Header
      title="Hack Club Workshops"
      desc="Learn to code with this collection of community-contributed, self-guided coding tutorials + ideas."
      img="https://workshops.hackclub.com/card.png"
      includeMeta
      sx={{ mb: 0, bg: 'transparent' }}
    >
      <Button
        as="a"
        href="https://hackclub.com/philosophy/"
        target="_blank"
        rel="noopener noreferrer"
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
    <Footer />
  </>
)

export const getStaticProps = async () => {
  const { getWorkshopSections } = require('../lib/data')
  const sections = await getWorkshopSections()
  return { props: { sections } }
}
