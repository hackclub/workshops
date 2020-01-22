import Header from '../components/header'
import Listing from '../components/listing'

export default ({ sections }) => (
  <>
    <Header
      title="Hack Club Workshops"
      desc="All the workshops, from the Hack Club community."
    />
    {sections.map(section => (
      <Listing key={section} id={section} {...section} />
    ))}
  </>
)

export const unstable_getStaticProps = async () => {
  const { getWorkshopSections } = require('../lib/data')
  const sections = await getWorkshopSections()
  return { props: { sections } }
}
