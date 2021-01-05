import { Container } from 'theme-ui'
import Error from 'next/error'
import Header from '../../../../components/header'
import Authors from '../../../../components/authors'
import Content from '../../../../components/content'

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
  const { getRawFileFromRepo } = require('../../../../lib/github')
  const { getWorkshopData } = require('../../../../lib/data')
  const { branch, repo, slug } = req.query
  const md = await getRawFileFromRepo(`workshops/${slug}/README.md`, branch, repo)
  const { data, html } = await getWorkshopData(slug, md, branch)
  return { slug, data, html }
}

export default Page
