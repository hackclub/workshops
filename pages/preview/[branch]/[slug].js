import { Container } from 'theme-ui'
import Error from 'next/error'
import matter from 'gray-matter'

import Header from '../../../components/header'
import Authors from '../../../components/authors'
import Content from '../../../components/content'

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
      </Container>
    </>
  )
}

Page.getInitialProps = async req => {
  const { getRawFileFromRepo } = require('../../../lib/github')
  const { markdownToHtml } = require('../../../lib/markdown-to-html')
  const { branch, slug } = req.query
  const md = await getRawFileFromRepo(`workshops/${slug}/README.md`, branch)
  const { content, data } = matter(md)
  data.card = `https://workshop-cards.now.sh/${encodeURIComponent(
    data?.name
  )}.png?caption=${encodeURIComponent(`By ${data?.author}`)}`
  data.bg = `/api/patterns/${slug}`
  const html = await markdownToHtml(`workshops/${slug}`, content)

  return { slug, data, html }
}

export default Page
