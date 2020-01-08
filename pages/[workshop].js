import Header from '../components/header'
import { Container } from '@theme-ui/components'
import { map } from 'lodash'
import MDX from '@mdx-js/runtime'

export default ({ name, description, content }) => (
  <>
    <Header title={name} desc={description} includeMeta />
    <Container sx={{ py: [3, 4] }}>
      <MDX>{content}</MDX>
    </Container>
  </>
)

export async function unstable_getStaticPaths() {
  const { getWorkshopSlugs } = require('../lib/data')
  const slugs = getWorkshopSlugs()
  return map(slugs, workshop => ({ params: { workshop } }))
}

export async function unstable_getStaticProps({ params }) {
  const { getWorkshopContent } = require('../lib/data')
  const { workshop } = params
  const content = getWorkshopContent(workshop)
  return { props: { name: workshop, description: 'Test', content } }
}
