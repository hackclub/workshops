const fs = require('fs')

export const getWorkshopSlugs = () =>
  fs
    .readdirSync('./public/content/workshops/')
    .filter(path => !['img', 'lib', 'README.md'].includes(path))

export const getWorkshopContent = slug =>
  fs.readFileSync(`./public/content/workshops/${slug}/README.md`, 'utf8')
