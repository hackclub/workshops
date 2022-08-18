import { map } from 'lodash'
import { Box, Container, Heading, Flex, Button, Spinner, Text } from 'theme-ui'
import Error from 'next/error'
import Link from 'next/link'
import Header from '../../components/header'
import Authors from '../../components/authors'
import Issues from '../../components/newsletters'
import Content from '../../components/content'
import { NavButton } from '../../components/nav'
import { GitHub, HelpCircle, ArrowLeftCircle } from 'react-feather'
import { useRouter } from 'next/router'
import { formatTitle } from '../../lib/format-title'

const Page = ({ issues, slug, data, html }) => {
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
      <Header title="Community Newsletter" />
      <Container variant="copy" as="main" pb={4}>
        <Link href="/newsletters" passHref>
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              alignItems: 'center',
              ':hover': { color: 'red', cursor: 'pointer' }
            }}
          >
            <ArrowLeftCircle />
            <Text sx={{ fontSize: [2, 3], ml: 2 }}>Back</Text>
          </Box>
        </Link>
        <Content html={html} />
        <Button
          as="a"
          href={`https://github.com/hackclub/newsletter/blob/main/${slug}/README.md`}
          variant="outline"
          sx={{ color: 'muted' }}
        >
          <GitHub />
          View on GitHub
        </Button>
      </Container>
      <Box as="footer" bg="sheet" pt={[3, 4]} pb={[4, 5]}>
        <Container>
          <Flex
            sx={{
              mb: 5,
              alignContent: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              flexDirection: 'column'
            }}
          >
            <Heading variant="headline" mt={0} mr={3} mb={2}>
              Recent issues
            </Heading>
            <Link href="/newsletters" passHref>
              <Container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'muted',
                  ':hover': { cursor: 'pointer' }
                }}
              >
                <HelpCircle size={24} />
                <Heading sx={{ ml: 2 }}>What are these?</Heading>
              </Container>
            </Link>
          </Flex>
          <Issues issues={issues} vip={false} showAbout />
        </Container>
      </Box>
    </>
  )
}

export const getStaticPaths = async () => {
  const { getNewsletterSlugs } = require('../../lib/data')
  const slugs = await getNewsletterSlugs()
  const paths = map(slugs, slug => ({ params: { slug } }))
  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }) => {
  const {
    getNewsletterSlugs,
    getNewsletterFile,
    getNewsletterData
  } = require('../../lib/data')
  const { slug } = params
  const issues = await getNewsletterSlugs()
  const md = await getNewsletterFile(slug)
  const { data, html } = await getNewsletterData(slug, md)
  data.title =
    data.title.split(' ')[0] + ' ' + formatTitle(data.title.split(' ')[1])
  return { props: { issues, slug, data, html }, revalidate: 30 }
}

export default Page
