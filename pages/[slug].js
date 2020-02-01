import matter from 'gray-matter'
import { map } from 'lodash'
import { getEditUrl } from '../lib/github'

import { Button, Container } from 'theme-ui'
import Error from 'next/error'
import Header from '../components/header'
import Authors from '../components/authors'
import Content from '../components/content'

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
        >
          Edit this page on GitHub
        </Button>
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
  const { markdownToHtml } = require('../lib/markdown-to-html')
  const { slug } = params

  const md = await getWorkshopContent(slug)
  const { content, data } = matter(md)
  data.card = `https://workshop-cards.now.sh/${encodeURIComponent(
    data?.name
  )}.png?caption=${encodeURIComponent(`By ${data?.author}`)}`
  data.bg = `/api/patterns/${slug}`
  data.editUrl = getEditUrl(`workshops/${slug}/README.md`)
  const html = await markdownToHtml(`workshops/${slug}`, content)

  return { props: { slug, data, html } }
}

export default Page
