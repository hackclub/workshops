import { map } from 'lodash'
import { Box, Container, Heading, Flex, Button } from 'theme-ui'
import Error from 'next/error'
import Link from 'next/link'
import Header from '../../components/header'
import Authors from '../../components/authors'
import Issues from '../../components/vip-newsletters'
import Content from '../../components/content'
import { NavButton } from '../../components/nav'
import { GitHub, HelpCircle } from 'react-feather'

const Page = ({ issues, slug, data, html }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading />   
  }
  if (!slug || !data) return <Error statusCode={404} />
  return (
    <>
      <Header {...data} includeMeta>
        <Authors
          text="@ChristinaAsquith, @lachlanjc, @ZachLatta"
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

export const getStaticPaths = () => {
  const { getNewsletterSlugs } = require('../../lib/data')
  const slugs = getNewsletterSlugs()
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
  return { props: { issues, slug, data, html }, revalidate: 60 }
}

export default Page
