import { map } from 'lodash'
import { Box, Container, Heading, Flex, Button, Spinner, Text } from 'theme-ui'
import Error from 'next/error'
import Link from 'next/link'
import Header from '../../../components/header'
import Authors from '../../../components/authors'
import Issues from '../../../components/newsletters'
import Content from '../../../components/content'
import { ArrowLeftCircle, GitHub } from 'react-feather'
import { useRouter } from 'next/router'

const Page = ({ issues, slug, data, html, authors }) => {
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
  const githubAuthors = authors.filter(
    author => typeof author === 'string' && author.startsWith('@')
  )
  let otherAuthors = authors.filter(author => author.name && author.pic)
  return (
    <>
      <Header {...data} includeMeta>
        <Authors
          text={githubAuthors.join()}
          color="secondary"
          extra={otherAuthors}
        />
      </Header>
      <Container variant="copy" as="main" pb={4}>
        <Link href="/leader-newsletters" passHref>
          <Box
            sx={{
              mb: 4,
              display: 'inline-flex',
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
          href={
            `https://github.com/hackclub/leaders-newsletter/blob/main/updates/${slug}.md` /* TODO */
          }
          variant="outline"
          sx={{ color: 'muted', mt: 3 }}
        >
          <GitHub />
          View on GitHub
        </Button>
      </Container>
      <Box as="footer" bg="sheet" pt={[3, 4]} pb={[4, 5]}>
        <Container>
          <Heading
            variant="headline"
            mt={0}
            mb={3}
            sx={{ textAlign: 'center' }}
          >
            Recent issues
          </Heading>
          <Issues issues={issues} showAbout kind="leader" />
        </Container>
      </Box>
    </>
  )
}

export const getStaticPaths = async () => {
  const { getLeaderNewsletterSlugs } = require('../../../lib/data')
  const slugs = (await getLeaderNewsletterSlugs()).find(
    x => x.kind === 'archive'
  ).slugs
  const paths = map(slugs, slug => ({ params: { slug } }))
  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }) => {
  const {
    getLeaderNewsletterSlugs,
    getLeaderNewsletterFile,
    getLeaderNewsletterData,
    getLeaderNewsletterAuthors
  } = require('../../../lib/data')
  const { slug } = params
  const issues = (await getLeaderNewsletterSlugs()).find(
    x => x.kind === 'updates'
  ).slugs
  const md = await getLeaderNewsletterFile(`archive/${slug}`)
  const { data, html } = await getLeaderNewsletterData(slug, md)
  const authors = [
    ...new Set([
      ...(await getLeaderNewsletterAuthors(`archive/${slug}`)),
      '@MatthewStanciu'
    ])
  ]
  return { props: { issues, slug, data, html, authors }, revalidate: 30 }
}

export default Page
