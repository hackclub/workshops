const fs = require('fs')
const matter = require('gray-matter')
const manifest = require('../manifest.json')
const { markdownToHtml } = require('./markdown-to-html')
const { getEditUrl } = require('./github')

export const getWorkshopSlugs = () =>
  fs
    .readdirSync('./public/content/workshops/')
    .filter(path => !['img', 'lib', 'README.md'].includes(path))

export const getWorkshopFile = slug =>
  fs.readFileSync(`./public/content/workshops/${slug}/README.md`, 'utf8')

export const getConductFile = () =>
  fs.readFileSync(`./public/content/CONDUCT.md`, 'utf8')

export const getWorkshopSections = () =>
  Object.keys(manifest).map(key => {
    let workshops = []
    manifest[key].slugs.forEach(slug => {
      let md = getWorkshopFile(slug)
      let { name, description } = matter(md).data
      workshops.push({ slug, name, description })
    })
    return { ...manifest[key], key, workshops }
  })

export const getWorkshopData = async (slug, md) => {
  const { content, data } = matter(md)
  data.card = `https://workshop-cards.now.sh/${encodeURIComponent(
    data?.name
  )}.png?caption=${encodeURIComponent(`By ${data?.author}`)}`
  data.bg = `/api/patterns/${slug}`
  data.editUrl = getEditUrl(`workshops/${slug}/README.md`)
  const html = await markdownToHtml(`workshops/${slug}`, content)
  return { data, html }
}
