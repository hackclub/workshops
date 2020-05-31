const fs = require('fs')
const matter = require('gray-matter')
const manifest = require('../manifest.json')
const markdownToHtml = require('@hackclub/markdown')
const { getEditUrl, getRawFileFromRepo } = require('./github')
const { trim } = require('lodash')

export const getWorkshopSlugs = () =>
  fs
    .readdirSync('./public/content/workshops/')
    .filter(path => !['img', 'lib', 'README.md'].includes(path))

export const getWorkshopFile = slug =>
  fs.readFileSync(`./public/content/workshops/${slug}/README.md`, 'utf8')

export const getNewsletterSlugs = () =>
  fs
    .readdirSync('./public/vip-newsletters/')
    .filter(path => !['README.md'].includes(path))

export const getNewsletterFile = slug =>
  fs.readFileSync(`./public/vip-newsletters/${slug}/README.md`, 'utf8')

export const getNewslettersHtml = async () => {
  const md = fs.readFileSync(`./public/vip-newsletters/README.md`, 'utf8')
  const html = await markdownToHtml(md, 'README.md', '', true)
  return html
}

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
  Object.keys(manifest).map(key => {
    let workshops = []
    manifest[key].slugs.forEach(slug => {
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
        u => `&images=${encodeURIComponent(`https://github.com/${u}.png`)}`
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

export const getNewsletterData = async (slug, md) => {
  const avatars = ['christina', 'lachlan', 'zach'].map(n => `images=${encodeURIComponent('https://hackclub.com/team/')}${n}.jpg`).join('&')
  const img = `https://workshop-cards.hackclub.com/VIP%20Newsletter%20${slug}.png?brand=HQ&${avatars}`
  const data = {
    title: `VIP Newsletter ${slug}`,
    img
  }
  // data.date = parseDate(md?.split('\n')?.[0])
  const html = await markdownToHtml(md, `vip-newsletters/${slug}`, '', true)
  return { data, html }
}
