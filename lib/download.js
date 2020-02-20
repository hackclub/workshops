const fs = require('fs')
const download = require('download-git-repo')

const downloadRepo = async () =>
  await download(
    'hackclub/hackclub',
    './public/content',
    err =>
      err ? console.error(err) : console.log('Successfully downloaded content!')
  )

const getRepo = async () => {
  try {
    return fs.readdirSync('./public/content/').length > 1
  } catch {
    await downloadRepo()
  }
}

getRepo()
