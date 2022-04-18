import { map } from 'lodash'
import { Button, Container, Flex, Spinner, Box, Text } from 'theme-ui'
import Error from 'next/error'
import Link from 'next/link'
import langs from '../../lib/langs'
import Header from '../../components/header'
import Authors from '../../components/authors'
import Content from '../../components/content'
import Footer from '../../components/footer'
import Share from '../../components/share'
import { useRouter } from 'next/router'
import { Edit3 } from 'react-feather'

const LocaleLink = ({ href, children, slug }) => {
  return (
    <Link href={href == 'en' ? `/${slug}` : `/${slug}/${href}`}>
      {children}
    </Link>
  )
}

const Page = ({ slug, data, html, locales }) => {
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
  if (locales) data.locales = locales
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

      <Container
        sx={{
          bottom: '25px',
          position: 'fixed',
          right: '0',
          width: 'auto'
        }}
      >
        <Button
          as="a"
          variant="outline"
          href={`https://github.com/hackclub/hackclub/edit/main/workshops/${slug}/README.md`}
          sx={{
            backgroundColor: 'background',
            svg: {
              mr: [0, 2]
            },
            py: ['14px', 2]
          }}
        >
          <Edit3 />
          <Text
            sx={{
              display: ['none', 'inline']
            }}
          >
            Edit this page!
          </Text>
        </Button>
      </Container>

      <Container variant="copy" as="main">
        <Content html={html} />
        {data.locales && (
          <Content>
            This workshop is also available in{' '}
            <LocaleLink href={data.locales.split(',')[0]} slug={slug}>
              {langs[data.locales.split(',')[0]].nameEnglish}
            </LocaleLink>
            {data.locales
              .split(',')
              .slice(1)
              .map((localeCode, index) => (
                <>
                  {index == data.locales.split(',').length - 2 ? ' &' : ','}{' '}
                  <LocaleLink
                    href={localeCode.trim()}
                    key={`locale-${index}`}
                    slug={slug}
                  >
                    {langs[localeCode.trim()].nameEnglish}
                  </LocaleLink>
                </>
              ))}
            .
          </Content>
        )}
        <Share workshop={data.name} />
      </Container>
      <Footer />
    </>
  )
}

export const getStaticPaths = async () => {
  const { getWorkshopSlugs } = require('../../lib/data')
  const slugs = await getWorkshopSlugs()
  const paths = map(slugs, slug => ({ params: { slug } }))
  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }) => {
  const { getWorkshopFile, getWorkshopData } = require('../../lib/data')
  const { slug } = params
  const md = await getWorkshopFile(slug)
  const { data, html } = await getWorkshopData(slug, md)
  return { props: { slug, data, html }, revalidate: 30 }
}

export default Page
