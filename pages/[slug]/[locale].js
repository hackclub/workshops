import BasePage from '../[slug]/index'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Page = ({ slug, data, html, locale }) => {
  const clientData = useSWR(`/api/locales?slug=${slug}`, fetcher)
  console.log(clientData)
  console.log(`/api/locales?slug=${slug}`)
  return (
    <BasePage
      slug={slug}
      data={data}
      locales={clientData.data?.locales.replace(locale, 'en')}
      html={html}
    />
  )
}

export const getServerSideProps = async ({ params }) => {
  const { getWorkshopFile, getWorkshopData } = require('../../lib/data')
  const { slug, locale } = params
  try {
    const md = await getWorkshopFile(slug, locale)
    const { data, html } = await getWorkshopData(slug, md)
    return { props: { slug, data, html, locale } }
  } catch {
    return {
      redirect: {
        destination: `/${slug}`,
        permanent: false
      }
    }
  }
}

export default Page
