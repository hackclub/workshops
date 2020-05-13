const fs = require('fs')
const matter = require('gray-matter')
const manifest = require('../manifest.json')
const markdownToHtml = require('@hackclub/markdown')
const { getEditUrl, getRawFileFromRepo } = require('./github')
const { trim } = require('lodash')

export const getWorkshopSlugs = () =>
  fs
    .readdirSync('./public/content/workshops/')
    .filter((path) => !['img', 'lib', 'README.md'].includes(path))

export const getWorkshopFile = (slug) =>
  fs.readFileSync(`./public/content/workshops/${slug}/README.md`, 'utf8')

export const getConductHtml = async () => {
  const md = fs.readFileSync(`./public/content/CONDUCT.md`, 'utf8')
  const html = await markdownToHtml(md, 'CONDUCT.md', '/content', true)
  return html
}

export const getBannerHtml = async () => {
  const md = await getRawFileFromRepo('README.md', 'master', 'hackclub/banner')
  const html = await markdownToHtml(md, 'README.md', '', true)
  return html
}

export const getWorkshopSections = () =>
  Object.keys(manifest).map((key) => {
    let workshops = []
    manifest[key].slugs.forEach((slug) => {
      let md = getWorkshopFile(slug)
      let { name, description } = matter(md).data
      workshops.push({ slug, name, description })
    })
    return { ...manifest[key], key, workshops }
  })

export const getWorkshopData = async (slug, md, branch) => {
  const { content, data } = matter(md)
  const authors = (data?.author || '').includes('@')
    ? data?.author
        .replace('@', '')
        .replace('ad510', '') // user has no profile picture
        .split(',')
        .map(trim)
        .map(
          (u) => `&images=${encodeURIComponent(`https://github.com/${u}.png`)}`
        )
        .join('')
    : ''
  data.card = `https://workshop-cards.hackclub.com/${encodeURIComponent(
    data?.name
  )}.png?brand=Workshops${authors}&caption=${encodeURIComponent(
    `By ${data?.author}`
  )}`
  data.bg = `/api/patterns/${slug}`
  data.editUrl = getEditUrl(`workshops/${slug}/README.md`)
  const imgPath = branch
    ? `https://raw.githubusercontent.com/hackclub/hackclub/${branch}`
    : '/content'
  const html = await markdownToHtml(content, `workshops/${slug}`, imgPath, true)
  return { data, html }
}
