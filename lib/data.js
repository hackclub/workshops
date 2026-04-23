const matter = require('gray-matter')
const manifest = require('../manifest.json')
const custom = require('../custom.json')
const markdownToHtml = require('@hackclub/markdown').default
const { getEditUrl, getRawFileFromRepo } = require('./github')
const { trim, dropRightWhile } = require('lodash')
const ghRest = async (p) => {
  const h = { 'Accept': 'application/vnd.github.v3+json' }
  if (process.env.GITHUB_TOKEN) h['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  const r = await fetch(`https://api.github.com${p}`, { headers: h })
  if (!r.ok) throw new Error(`GitHub REST API error (${r.status}): ${await r.text()}`)
  return r.json()
}

const ghDirs = async (repo, path = '') =>
  (await ghRest(`/repos/hackclub/${repo}/contents/${path}`))
    .filter(x => x.type === 'dir').map(x => x.name)

const ghCommitAuthors = async (repo, path) =>
  (await ghRest(`/repos/hackclub/${repo}/commits?path=${encodeURIComponent(path)}&per_page=100`))
    .filter(c => c.author).map(c => c.author.login)

export const getWorkshopSlugs = async () =>
  (await ghDirs('hackclub', 'workshops'))
    .filter(p => !['img', 'lib', 'README.md'].includes(p))

export const getWorkshopFile = async (slug, locale) =>
  getRawFileFromRepo(`/workshops/${slug}/${locale || 'README'}.md`)

export const getVIPNewsletterSlugs = async () =>
  (await ghDirs('vip-newsletters'))
    .filter(p => !['.gitignore', 'README.md'].includes(p))

export const getVIPNewsletterFile = async slug =>
  await getRawFileFromRepo(
    `/${slug}/README.md`,
    'main',
    'hackclub/vip-newsletters'
  )

export const getVIPNewslettersHtml = async () =>
  markdownToHtml(await getRawFileFromRepo('/README.md', 'main', 'hackclub/vip-newsletters'), 'README.md', '', true)

export const getLeaderNewsletterSlugs = async () => {
  const dirs = await ghDirs('leaders-newsletter')
  return Promise.all(
    dirs.filter(n => n === 'updates' || n === 'archive').map(async n => ({
      kind: n,
      slugs: (await ghRest(`/repos/hackclub/leaders-newsletter/contents/${n}`))
        .map(x => x.name.replace('.md', ''))
    }))
  )
}

export const getLeaderNewsletterFile = async slug =>
  await getRawFileFromRepo(`/${slug}.md`, 'main', 'hackclub/leaders-newsletter')

export const getLeaderNewsletterHtml = async () =>
  markdownToHtml(await getRawFileFromRepo('/README.md', 'main', 'hackclub/leaders-newsletter'), 'README.md')

export const getLeaderNewsletterAuthors = async slug => {
  const logins = await ghCommitAuthors('leaders-newsletter', `${slug}.md`)
  return [
    ...new Set(logins.map(l =>
      l == 'PellMellKid'
        ? { name: '@HollyDelisle', link: 'https://hackclub.slack.com/team/U03M1H014CX', pic: 'https://cdn.hackclub.com/rescue?url=https://cloud-mks21dkxr-hack-club-bot.vercel.app/00image_from_ios_1_.jpg' }
        : '@' + l
    ))
  ]
}

export const getNewsletterSlugs = async () =>
  (await ghDirs('newsletter'))
    .filter(p => !['.gitignore', 'README.md'].includes(p))

export const getNewsletterAuthors = async slug =>
  [...new Set((await ghCommitAuthors('newsletter', slug)).map(l => '@' + l))]

export const getNewsletterFile = async slug =>
  getRawFileFromRepo(`/${slug}/README.md`, 'main', 'hackclub/newsletter')

export const getNewslettersHtml = async () =>
  markdownToHtml(await getRawFileFromRepo('/README.md', 'main', 'hackclub/newsletter'), 'README.md', '', true)

export const getBannerHtml = async () =>
  markdownToHtml(await getRawFileFromRepo('README.md', 'master', 'hackclub/banner'), 'README.md', '', true)

const tagCreator = tagString => {
  tagString = trim(tagString)

  if (tagString.length) {
    let tags = tagString.split(',').map(ele => trim(ele))
    const maxLim = tagString.length > 5 ? 5 : tagString.length
    tags = dropRightWhile(tags, (ele, idx) => idx != maxLim - 1)
    return tags
  }
  return []
}

export const getWorkshopSections = async () => {
  let repoMDJSON = {}
  const slugsNeeded = new Set(
    Object.values(manifest).flatMap(section => section.slugs)
      .filter(slug => !Object.keys(custom).includes(slug))
  )
  await Promise.all(
    [...slugsNeeded].map(async slug => {
      try {
        const md = await getRawFileFromRepo(`/workshops/${slug}/README.md`)
        repoMDJSON[slug] = md
      } catch (e) {
        // skip workshops whose README doesn't exist
      }
    })
  )
  return Object.keys(manifest).map(key => {
    let workshops = []
    manifest[key].slugs.forEach(slug => {
      if(Object.keys(custom).includes(slug)){
        let { url, name, description, img = null, tags = [], author = null } = custom[slug]
        workshops.push({ slug: url, name, description, img, tags, author })
      }
      else {
        let md = repoMDJSON[slug]
        let { name, description, img = null, tags = [], author } = matter(md).data
        if (tags) tags = tagCreator(tags)
        workshops.push({ slug, name, description, img, tags, author })
      }
    })
    return { ...manifest[key], key, workshops }
  })
}

export const getWorkshopData = async (slug, md, branch, repo) => {
  const { content, data } = matter(md)
  const authors = (data?.author || '').includes('@')
    ? data?.author
        .replace(/@/g, ' ')
        .replace(/ad510/g, '') // user has no profile picture
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
  const imgPath = branch || repo
    ? `https://raw.githubusercontent.com/${repo || 'hackclub/hackclub'}/${branch || 'main'}`
    : '/content'
  const html = await markdownToHtml(content, `workshops/${slug}`, imgPath, true)
  return { data, html }
}

export const getVIPNewsletterData = async (slug, md) => {
  const avatars = ['christina', 'lachlan', 'zach']
    .map(
      n => `images=${encodeURIComponent('https://hackclub.com/team/')}${n}.jpg`
    )
    .join('&')
  const img = `https://workshop-cards.hackclub.com/VIP%20Newsletter%20${slug}.png?brand=HQ&${avatars}`
  const data = {
    title: `VIP Newsletter ${slug}`,
    img
  }
  // data.date = parseDate(md?.split('\n')?.[0])
  const html = await markdownToHtml(md, `vip-newsletters/${slug}`, '', true)
  return { data, html }
}

export const getLeaderNewsletterData = async (slug, md) => {
  const data = {
    title: `Leader Newsletter ${slug}`
  }
  const html = await markdownToHtml(md, `leader-newsletters/${slug}`, '', true)
  return { data, html }
}

export const getNewsletterData = async (slug, md) => {
  const avatars = ['quackduck']
    .map(n => `images=${encodeURIComponent('https://github.com/')}${n}.png`)
    .join('&')
  const img = `https://workshop-cards.hackclub.com/Newsletter%20${slug}.png?brand=HQ&${avatars}`
  const data = {
    title: `Newsletter ${slug}`,
    img
  }
  // data.date = parseDate(md?.split('\n')?.[0])
  const html = await markdownToHtml(md, `newsletter/${slug}`, '', true)
  return { data, html }
}
