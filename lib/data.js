const matter = require('gray-matter')
const manifest = require('../manifest.json')
const markdownToHtml = require('@hackclub/markdown')
const { getEditUrl, getRawFileFromRepo } = require('./github')
const { trim, dropRightWhile } = require('lodash')
const { GraphQLClient, gql } = require('graphql-request')

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
          }
        }
      }
    }
  }
`

export const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `Bearer ${process.env.GITHUB}`
  }
})

export const getWorkshopSlugs = async () =>
  (
    await client.request(workshopsQuery, {
      owner: 'hackclub',
      name: 'hackclub'
    })
  ).repository.object.entries
    .map(x => x.name)
    .filter(path => !['img', 'lib', 'README.md'].includes(path))

export const getWorkshopFile = async (slug, locale) => {
  const result = await getRawFileFromRepo(`/workshops/${slug}/${locale ? locale : "README"}.md`)
  return result;
}
  
export const getNewsletterSlugs = async () =>
  (await(
    client.request(newsletterQuery, {
      owner: 'hackclub',
      name: 'vip-newsletters'
    })
  ))
    .repository.object.entries.map(x => x.name)
    .filter(path => !['.gitignore', 'README.md'].includes(path))

export const getNewsletterFile = async slug =>
  await getRawFileFromRepo(
    `/${slug}/README.md`,
    'main',
    'hackclub/vip-newsletters'
  )

export const getNewslettersHtml = async () => {
  const md = await getRawFileFromRepo(
    `/README.md`,
    'main',
    'hackclub/vip-newsletters'
  )
  const html = await markdownToHtml(md, 'README.md', '', true)
  return html
}

export const getConductHtml = async () => {
  const md = await getRawFileFromRepo('CODE_OF_CONDUCT.md')
  const html = await markdownToHtml(md, 'CODE_OF_CONDUCT.md', '/content', true)
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
  let repoDataArray = await client.request(workshopsQuery, {
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
      let md = repoMDJSON[slug]
      let { name, description, img = null, tags = [], author } = matter(md).data
      if (tags) tags = tagCreator(tags)
      workshops.push({ slug, name, description, img, tags, author })
    })
    return { ...manifest[key], key, workshops }
  })
}

export const getWorkshopData = async (slug, md, branch) => {
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
  const imgPath = branch
    ? `https://raw.githubusercontent.com/hackclub/hackclub/${branch}`
    : '/content'
  const html = await markdownToHtml(content, `workshops/${slug}`, imgPath, true)
  return { data, html }
}

export const getNewsletterData = async (slug, md) => {
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
