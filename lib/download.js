const fs = require('fs')
const download = require('download-git-repo')

const downloadRepo = async () => {
  await download('hackclub/hackclub', 'public/content', function(err) {
    console.log(err ? 'Error' : 'Successfully downloaded')
  })
}

const getRepo = async () => {
  try {
    return fs.readdirSync('./public/content/').length > 1
  } catch {
    await downloadRepo()
  }
}

getRepo()
