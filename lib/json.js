const fs = require('fs')
const download = require('download-git-repo')
const manifest = require('../manifest.json')
const matter = require('gray-matter')
const { trim, dropRightWhile } = require('lodash')

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

const getWorkshopFile = slug =>
  fs.readFileSync(`./public/content/workshops/${slug}/README.md`, 'utf8')

let workshops = []
Object.keys(manifest).map(key => {
  manifest[key].slugs.forEach(slug => {
    let md = getWorkshopFile(slug)
    let { name, description, img = null, tags = [] } = matter(md).data
    if (tags) tags = tagCreator(tags)
    workshops.push({ slug, name, description, img, tags })
  })
})

fs.writeFile(
  './public/workshops.json',
  JSON.stringify(workshops),
  function (err) {
    if (err) throw err
  }
)
