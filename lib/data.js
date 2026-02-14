const matter = require('gray-matter')
const manifest = require('../manifest.json')
const custom = require('../custom.json')
const markdownToHtml = require('@hackclub/markdown')
const { getEditUrl, getRawFileFromRepo } = require('./github')
const { trim, dropRightWhile, update } = require('lodash')
const gql = String.raw

const graphqlFetch = async (query, variables) => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query, variables })
  })
  const json = await response.json()
  if (json.errors) {
    throw new Error(json.errors.map(e => e.message).join(', '))
  }
  if (!json.data) {
    throw new Error(`GitHub API returned no data for ${variables.owner}/${variables.name}. Check token permissions.`)
  }
  return json.data
}

const workshopsQuery = gql`
  query RepoFiles($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: "HEAD:workshops") {
        ... on Tree {
          entries {
            name
            type
            object {
              ... on Blob {
                byteSize
              }
              ... on Tree {
                entries {
                  name
                  type
                  object {
                    ... on Blob {
                      byteSize
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const newsletterQuery = gql`
  query RepoFiles($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: "HEAD:") {
        ... on Tree {
          entries {
            name
            type
            object {
              ... on Tree {
                entries {
                  name
                  type
                }
              }
            }
          }
        }
      }
    }
  }
`

const authorsQuery = gql`
  query RepoOwners($owner: String!, $name: String!, $issue: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: "main") {
        ... on Commit {
          history(first: 100, path: $issue) {
            nodes {
              author {
                user {
                  login
                }
              }
            }
          }
        }
      }
    }
  }
`

export const getWorkshopSlugs = async () =>
  (
    await graphqlFetch(workshopsQuery, {
      owner: 'hackclub',
      name: 'hackclub'
    })
  ).repository.object.entries
    .map(x => x.name)
    .filter(path => !['img', 'lib', 'README.md'].includes(path))

export const getWorkshopFile = async (slug, locale) => {
  const result = await getRawFileFromRepo(
    `/workshops/${slug}/${locale ? locale : 'README'}.md`
  )
  return result
}

export const getVIPNewsletterSlugs = async () =>
  (
    await graphqlFetch(newsletterQuery, {
      owner: 'hackclub',
      name: 'vip-newsletters'
    })
  ).repository.object.entries
    .map(x => x.name)
    .filter(path => !['.gitignore', 'README.md'].includes(path))

export const getVIPNewsletterFile = async slug =>
  await getRawFileFromRepo(
    `/${slug}/README.md`,
    'main',
    'hackclub/vip-newsletters'
  )

export const getVIPNewslettersHtml = async () => {
  const md = await getRawFileFromRepo(
    `/README.md`,
    'main',
    'hackclub/vip-newsletters'
  )
  const html = await markdownToHtml(md, 'README.md', '', true)
  return html
}

export const getLeaderNewsletterSlugs = async () => {
  const updates = (
    await graphqlFetch(newsletterQuery, {
      owner: 'hackclub',
      name: 'leaders-newsletter'
    })
  ).repository.object.entries.filter(
    x => x.name === 'updates' || x.name === 'archive'
  )

  return updates.map(folder => ({
    kind: folder.name,
    slugs: folder.object.entries.map(x => x.name.replace('.md', ''))
  }))
}

export const getLeaderNewsletterFile = async slug =>
  await getRawFileFromRepo(`/${slug}.md`, 'main', 'hackclub/leaders-newsletter')

export const getLeaderNewsletterHtml = async () => {
  const md = await getRawFileFromRepo(
    '/README.md',
    'main',
    'hackclub/leaders-newsletter'
  )
  const html = await markdownToHtml(md, 'README.md')
  return html
}

export const getLeaderNewsletterAuthors = async slug => {
  const authors = (
    await graphqlFetch(authorsQuery, {
      owner: 'hackclub',
      name: `leaders-newsletter`,
      issue: `${slug}.md`
    })
  ).repository.object.history.nodes

  return [
    ...new Set(
      authors.map(author => {
        if (author.author.user.login == 'PellMellKid')
          // Replace Holly's GH profile with more appropriate one
          return {
            name: '@HollyDelisle',
            link: 'https://hackclub.slack.com/team/U03M1H014CX',
            pic: 'https://cdn.hackclub.com/rescue?url=https://cloud-mks21dkxr-hack-club-bot.vercel.app/00image_from_ios_1_.jpg'
          }
        else return '@' + author.author.user.login
      })
    )
  ]
}

export const getNewsletterSlugs = async () =>
  (
    await graphqlFetch(newsletterQuery, {
      owner: 'hackclub',
      name: 'newsletter'
    })
  ).repository.object.entries
    .map(x => x.name)
    .filter(path => !['.gitignore', 'README.md'].includes(path))

export const getNewsletterAuthors = async slug => {
  const authors = (
    await graphqlFetch(authorsQuery, {
      owner: 'hackclub',
      name: 'newsletter',
      issue: slug
    })
  ).repository.object.history.nodes

  return [...new Set(authors.map(author => '@' + author.author.user.login))]
}

export const getNewsletterFile = async slug =>
  await getRawFileFromRepo(`/${slug}/README.md`, 'main', 'hackclub/newsletter')

export const getNewslettersHtml = async () => {
  const md = await getRawFileFromRepo(
    `/README.md`,
    'main',
    'hackclub/newsletter'
  )
  const html = await markdownToHtml(md, 'README.md', '', true)
  return html
}



export const getBannerHtml = async () => {
  const md = await getRawFileFromRepo('README.md', 'master', 'hackclub/banner')
  const html = await markdownToHtml(md, 'README.md', '', true)
  return html
}



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
  let repoDataArray = await graphqlFetch(workshopsQuery, {
    owner: 'hackclub',
    name: 'hackclub'
  })
  repoDataArray.repository.object.entries.map(x => {
    if (
      x.type == 'tree' &&
      x.object.entries.filter(y => y.name.toLowerCase() == 'readme.md').length >
        0
    ) {
      repoMDJSON[x.name] = x.object.entries.filter(
        y => y.name.toLowerCase() == 'readme.md'
      )[0].object.text
    }
  })
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
