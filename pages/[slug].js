import { map } from 'lodash'
import { Button, Container } from 'theme-ui'
import Error from 'next/error'
import Header from '../components/header'
import Authors from '../components/authors'
import Content from '../components/content'
import Footer from '../components/footer'

//This is  a comment

const Page = ({ slug, data, html }) => {
  if (!slug || !data) return <Error statusCode={404} />
  return (
    <>
      <Header
        title={data.name}
        desc={data.description}
        img={data.card}
        bgImg={data.bg}
        includeMeta
      >
        <Authors text={data.author} />
      </Header>
      <Container variant="copy" as="main">
        <Content html={html} />
        <Button
          as="a"
          href={data.editUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ marginY: '2rem' }}
        >
          Edit this page on GitHub
        </Button>
      </Container>
      <Footer />
    </>
  )
}

export const getStaticPaths = () => {
  const { getWorkshopSlugs } = require('../lib/data')
  const slugs = getWorkshopSlugs()
  const paths = map(slugs, (slug) => ({ params: { slug } }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  const { getWorkshopFile, getWorkshopData } = require('../lib/data')
  const { slug } = params
  const md = await getWorkshopFile(slug)
  const { data, html } = await getWorkshopData(slug, md)
  return { props: { slug, data, html } }
}

export default Page
