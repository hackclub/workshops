export const GITHUB_URL = 'https://github.com'
export const RAW_GITHUB_URL = 'https://raw.githubusercontent.com'
export const REPO_NAME = 'hackclub/hackclub'
export const REPO_BRANCH = 'main'

export const getRawFileFromGitHub = async path => {
  const url = RAW_GITHUB_URL + path
  const res = await fetch(url)
  if (res.ok) return res.text()
  let text
  try { text = await res.text() } catch { text = res.statusText }
  if (res.status !== 404) console.error(url)
  const err = new Error(`GitHub raw download error (${res.status}): ${text}`)
  err.status = res.status
  throw err
}

export const notFoundIf404 = err => {
  if (err.status === 404) return { notFound: true, revalidate: 30 }
  throw err
}

export const getRawFileFromRepo = (path, branch, repo) =>
  getRawFileFromGitHub(`/${repo || REPO_NAME}/${branch || REPO_BRANCH}/${path}`)

export const getEditUrl = path =>
  `${GITHUB_URL}/${REPO_NAME}/edit/${REPO_BRANCH}/${path}`
