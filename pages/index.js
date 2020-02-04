import dynamic from 'next/dynamic'
import { Button } from 'theme-ui'
import Header from '../components/header'
import Listing from '../components/listing'

const Blobs = dynamic(import('../components/blobs'), {
  ssr: false
})

export default ({ sections }) => (
  <>
    <Blobs />
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

export const unstable_getStaticProps = async () => {
  const { getWorkshopSections } = require('../lib/data')
  const sections = await getWorkshopSections()
  return { props: { sections } }
}
