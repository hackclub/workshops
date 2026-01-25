import dynamic from 'next/dynamic'
import { Box, Button } from 'theme-ui'
import Header from '../components/header'
import Listing from '../components/listing'
import Footer from '../components/footer'
import { useState } from 'react'
import { filter } from '../lib/search'

const Blobs = dynamic(() => import('../components/blobs'), { ssr: false })

export default function Home({ sections }) {
  const [data, setData] = useState(sections)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
        search={filter(sections, setData)}
        title="Hack Club Workshops"
        desc="Learn to code with this collection of community-contributed, self-guided coding tutorials + ideas."
        img="https://workshops.hackclub.com/card.png"
        includeMeta
        navBg={false}
        sx={{ mb: 0, bg: 'transparent', userSelect: 'none' }}
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

      {data.map(({ key, ...section }) => (
        <Listing key={key} id={key} {...section} />
      ))}
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const { getWorkshopSections } = require('../lib/data')
  const sections = await getWorkshopSections()
  return { props: { sections }, revalidate: 30 }
}
