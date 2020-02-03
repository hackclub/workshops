const fs = require('fs')
const matter = require('gray-matter')
const manifest = require('../manifest.json')
const markdownToHtml = require('@hackclub/markdown')
const { getEditUrl } = require('./github')

export const getWorkshopSlugs = () =>
  fs
    .readdirSync('./public/content/workshops/')
    .filter(path => !['img', 'lib', 'README.md'].includes(path))

export const getWorkshopFile = slug =>
  fs.readFileSync(`./public/content/workshops/${slug}/README.md`, 'utf8')

export const getConductHtml = async () => {
  const md = fs.readFileSync(`./public/content/CONDUCT.md`, 'utf8')
  const html = await markdownToHtml(md, 'CONDUCT.md', '/content', true)
  return html
}

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
  const html = await markdownToHtml(
    content,
    `workshops/${slug}`,
    '/content',
    true
  )
  return { data, html }
}
