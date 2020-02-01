const fs = require('fs')
const matter = require('gray-matter')
const manifest = require('../manifest.json')

export const getWorkshopSlugs = () =>
  fs
    .readdirSync('./public/content/workshops/')
    .filter(path => !['img', 'lib', 'README.md'].includes(path))

export const getWorkshopContent = slug =>
  fs.readFileSync(`./public/content/workshops/${slug}/README.md`, 'utf8')

export const getConductContent = () =>
  fs.readFileSync(`./public/content/CONDUCT.md`, 'utf8')

export const getWorkshopSections = () =>
  Object.keys(manifest).map(key => {
    let workshops = []
    manifest[key].slugs.forEach(slug => {
      let md = getWorkshopContent(slug)
      let { name, description } = matter(md).data
      workshops.push({ slug, name, description })
    })
    return { ...manifest[key], key, workshops }
  })
