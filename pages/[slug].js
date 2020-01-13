import Header from '../components/header'
import { Container } from '@theme-ui/components'
import { map } from 'lodash'
import Authors from '../components/authors'
import Content from '../components/content'

import Error from 'next/error'
import matter from 'gray-matter'
import { getEditUrl } from '../lib/github'
import markdownToHtml from '../lib/markdown-to-html'

const Page = ({ slug, data, html }) => {
  if (!slug || !data) return <Error statusCode={404} />

  return (
    <>
      <Header title={data.name} desc={data.description} includeMeta>
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

export const unstable_getStaticPaths = () => {
  const { getWorkshopSlugs } = require('../lib/data')
  const slugs = getWorkshopSlugs()
  return map(slugs, slug => ({ params: { slug } }))
}

export const unstable_getStaticProps = async ({ params }) => {
  const { getWorkshopContent } = require('../lib/data')
  const { slug } = params

  const md = await getWorkshopContent(slug)
  const { content, data } = matter(md)
  data.editUrl = getEditUrl(`workshops/${slug}/README.md`)
  const html = await markdownToHtml(`workshops/${slug}`, content)

  return { props: { slug, data, html } }
}

export default Page
