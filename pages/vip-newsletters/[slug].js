import { map } from 'lodash'
import { Box, Container, Heading, Flex, Button, Spinner } from 'theme-ui'
import Error from 'next/error'
import Link from 'next/link'
import Header from '../../components/header'
import Authors from '../../components/authors'
import Issues from '../../components/newsletters'
import Content from '../../components/content'
import { NavButton } from '../../components/nav'
import { GitHub, HelpCircle } from 'react-feather'
import { useRouter } from 'next/router'

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
      <Header {...data} includeMeta>
        <Authors
          text="@ChristinaAsquith, @ZachLatta"
          color="secondary"
        />
      </Header>
      <Container variant="copy" as="main" pb={4}>
        <Content html={html} />
        <Button
          as="a"
          href={`https://github.com/hackclub/vip-newsletters/blob/main/${slug}/README.md`}
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
              mb: 3,
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <Heading variant="headline" mt={0} mr={3} mb={2}>
              Recent issues
            </Heading>
            <Link href="/vip-newsletters" passHref>
              <NavButton
                as="a"
                color="muted"
                sx={{
                  display: 'inline-flex',
                  width: 'auto',
                  pr: 2,
                  mb: 2,
                  svg: { mr: 2 }
                }}
              >
                <HelpCircle size={24} />
                What are these?
              </NavButton>
            </Link>
          </Flex>
          <Issues issues={issues} showAbout />
        </Container>
      </Box>
    </>
  )
}

export const getStaticPaths = async () => {
  const { getVIPNewsletterSlugs } = require('../../lib/data')
  const slugs = await getVIPNewsletterSlugs()
  const paths = map(slugs, slug => ({ params: { slug } }))
  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }) => {
  const {
    getVIPNewsletterSlugs,
    getVIPNewsletterFile,
    getVIPNewsletterData
  } = require('../../lib/data')
  const { slug } = params
  const issues = await getVIPNewsletterSlugs()
  const md = await getVIPNewsletterFile(slug)
  const { data, html } = await getVIPNewsletterData(slug, md)
  return { props: { issues, slug, data, html }, revalidate: 30 }
}

export default Page
