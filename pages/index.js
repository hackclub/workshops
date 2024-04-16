import dynamic from 'next/dynamic'
import { Box, Grid, Image, Link, Button, Heading, Text, Container } from 'theme-ui'
import Header from '../components/header'
import Listing from '../components/listing'
import Footer from '../components/footer'
import { useState } from 'react'
import { filter } from '../lib/search'

import Announcement from '../components/announcement'

const Blobs = dynamic(import('../components/blobs'), { ssr: false })

export default ({ sections }) => {
  const [data, setData] = useState(sections)

  return (
    <>
      <style jsx global>{`
        #__next {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style>

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
      {/* <Container sx={{backgroundColor: "background", padding: "16px 32px", borderRadius: "16px", border: "1px solid #993CCF"}}>
        <Grid columns={["1fr", "1fr", "1fr 1fr"]} gap={"48px"} sx={{alignItems: "center"}}>
        <Box>
          <Heading
            as="h2" sx={{fontSize: 32, mb: 2, color: "purple"}}>Jams! 🍇</Heading>
          <Text>
            Jams are the successors to our workshops, offering you a customizable project experiences perfect for clubs and friends. Whether you're inclined to <Link href="https://jams.hackclub.com/jam/3d-club-village" sx={{color: "#993CCF"}}>build a 3D village</Link>, <Link sx={{color: "#993CCF"}} href="https://jams.hackclub.com/jam/ai-travel">craft an AI travel planner</Link>, or <Link sx={{color: "#993CCF"}} href="https://jams.hackclub.com/batch/webOS">create your own web-based operating system</Link>, Jams have got you covered!
          </Text>
          <Box>
          <Button
          as="a"
          href="https://jams.hackclub.com"
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          sx={{
            color: "#993CCF",
            
            mt: [2, 3],
            transition: '.125s transform ease-in-out',
            ':hover,:focus': { transform: 'scale(1.0625)' }
          }}
        >
          Start Jamming
        </Button>
        </Box>
        </Box>
        <a target="_blank" href={"https://jams.hackclub.com"}>
        <Image sx={{borderRadius: "16px", width: "100%", height: "250px", objectFit: "cover", border: "1px solid #993CCF"}} src="https://cloud-r8id38sdk-hack-club-bot.vercel.app/0image.png"/>
        </a>
        </Grid>
      </Container> */}

      {data.map(({ key, ...section }) => (
        <Listing key={key} id={key} {...section} />
      ))}
      <Footer />
    </>
  )
}

export const getStaticProps = async () => {
  const { getWorkshopSections } = require('../lib/data')
  const sections = await getWorkshopSections()
  return { props: { sections }, revalidate: 30 }
}
