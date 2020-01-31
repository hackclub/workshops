import Header from '../components/header'
import { Button, Container } from 'theme-ui'
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
      <Header
        title={data.name}
        desc={data.description}
        img={`https://workshop-cards.now.sh/${encodeURIComponent(
          data.name
        )}.png?caption=${encodeURIComponent(`By ${data.author}`)}`}
        includeMeta
        bgImg={`/api/patterns/${slug}`}
        sx={{
          'h1, h2': { color: 'white !important' }
        }}
      >
        <Authors text={data.author} sx={{ mt: 3 }} />
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
  const { slug } = params

  const md = await getWorkshopContent(slug)
  const { content, data } = matter(md)
  data.editUrl = getEditUrl(`workshops/${slug}/README.md`)
  const html = await markdownToHtml(`workshops/${slug}`, content)

  return { props: { slug, data, html } }
}

export default Page
