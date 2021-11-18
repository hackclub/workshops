import { map } from 'lodash'
import { Button, Container, Flex, Spinner } from 'theme-ui'
import Error from 'next/error'
import Header from '../components/header'
import Authors from '../components/authors'
import Content from '../components/content'
import Footer from '../components/footer'
import Share from '../components/share'
import { useRouter } from 'next/router'

///////

import MarkedRenderer from "../components/MarkedRenderer";

export const GITHUB_URL = 'https://github.com'
export const RAW_GITHUB_URL = 'https://raw.githubusercontent.com'
export const REPO_NAME = 'hackclub/hackclub'
export const REPO_BRANCH = 'main'

const getErrorText = res => {
  try {
    return res.text()
  } catch (err) {
    return res.statusText
  }
}

const getError = async res => {
  const errorText = await getErrorText(res)
  const error = new Error(
    `GitHub raw download error (${res.status}): ${errorText}`
  )
  error.headers = res.headers.raw()
  return error
}

const getRawFileFromGitHub = async path => {
  const res = await fetch(RAW_GITHUB_URL + path)
  if (res.ok) return res.text()
  console.error(RAW_GITHUB_URL + path)
  throw await getError(res)
}

const getRawFileFromRepo = (path, branch, repo) =>
  getRawFileFromGitHub(`/${repo || REPO_NAME}/${branch || REPO_BRANCH}/${path}`)

const getWorkshopFile = async slug => {
  const result = await getRawFileFromRepo(`/workshops/${slug}/README.md`)
  return result;
}

////

const Page = ({ slug, data, html, md }) => {
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

  const removeFrontMatter = markdown => markdown.split("---")[2];

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
        <MarkedRenderer md={removeFrontMatter(md)} />
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
  return { props: { slug, data, html, md }, revalidate: 30 }
}

export default Page
