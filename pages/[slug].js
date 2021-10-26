import { map } from 'lodash'
import { Button, Container, Flex, Spinner } from 'theme-ui'
import Error from 'next/error'
import Header from '../components/header'
import Authors from '../components/authors'
import Content from '../components/content'
import Footer from '../components/footer'
import Share from '../components/share'
import { useRouter } from 'next/router'

const Page = ({ slug, data, html }) => {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Flex
        sx={{
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Spinner />
      </Flex>
    )
  }
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
        <Share workshop={data.name} />
      </Container>
      <Footer />
    </>
  )
}

export const getStaticPaths = async () => {
  const { getWorkshopSlugs } = require('../lib/data')
  const slugs = await getWorkshopSlugs()
  const paths = map(slugs, slug => ({ params: { slug } }))
  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }) => {
  const { getWorkshopFile, getWorkshopData } = require('../lib/data')
  const { slug } = params
  const md = await getWorkshopFile(slug)
  const { data, html } = await getWorkshopData(slug, md)
  return { props: { slug, data, html }, revalidate: 30 }
}

export default Page
