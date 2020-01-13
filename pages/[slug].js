import Header from '../components/header'
import { Container } from '@theme-ui/components'
import { map } from 'lodash'
import Authors from '../components/authors'
import Content from '../components/content'
import manifest from '../manifest.json'

import { useRouter } from 'next/router'
import Error from 'next/error'
import matter from 'gray-matter'
import { getPaths, findRouteByPath } from '../lib/page'
import { getRawFileFromRepo, getEditUrl } from '../lib/github'
import markdownToHtml from '../lib/markdown-to-html'

const Page = ({ routes, route, data, html }) => {
  console.log(route, data)
  if (!route) {
    return <Error statusCode={404} />
  }

  const router = useRouter()
  const { asPath } = router
  const title = data.title || route.title

  return (
    <>
      <Header title={title} desc={data.description} includeMeta>
        <Authors text={data.author} sx={{ mt: 3 }} />
      </Header>
      <Container variant="copy" sx={{ py: [3, 4] }}>
        <Content html={html} />
        <a href={data.editUrl} target="_blank" rel="noopener noreferrer">
          Edit this page on GitHub
        </a>
      </Container>
    </>
  )
}

export const unstable_getStaticPaths = () => getPaths(manifest.routes)

export const unstable_getStaticProps = async ({ params }) => {
  const { routes } = manifest
  const { slug } = params
  const route = findRouteByPath(slug, routes)
  if (!route) return {}

  const md = await getRawFileFromRepo(`workshops/${route.path}/README.md`)
  const { content, data } = matter(md)
  data.editUrl = getEditUrl(`workshops/${route.path}/README.md`)
  const html = await markdownToHtml(`workshops/${route.path}`, content)

  return { props: { routes, data, route, html } }
}

export default Page
