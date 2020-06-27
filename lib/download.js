const fs = require('fs')
const download = require('download-git-repo')

const repos = {
  'hackclub/hackclub#main': './public/content',
  'hackclub/vip-newsletters': './public/vip-newsletters'
}

const downloadRepo = async (repo, path) =>
  await download(
    repo,
    path,
    err =>
      err ? console.error(err) : console.log(`Successfully downloaded ${repo}!`)
  )

const getRepo = async (repo, path) => {
  try {
    return fs.readdirSync(`${path}/`).length > 1
  } catch {
    await downloadRepo(repo, path)
  }
}

Object.keys(repos).map(key => getRepo(key, repos[key]))
