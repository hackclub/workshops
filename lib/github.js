import fetch from 'isomorphic-unfetch'

export const GITHUB_URL = 'https://github.com/'
export const RAW_GITHUB_URL = 'https://raw.githubusercontent.com'
export const REPO_NAME = 'hackclub/hackclub'
export const REPO_BRANCH = 'master'

const getErrorText = res => {
  try {
    return res.text()
  } catch (err) {
    return res.statusText
  }
}

const getError = async res => {
  const errorText = await getErrorText(res)
  const error = new Error(
    `GitHub raw download error (${res.status}): ${errorText}`
  )
  error.headers = res.headers.raw()
  return error
}

export const getRawFileFromGitHub = async path => {
  const res = await fetch(RAW_GITHUB_URL + path)
  if (res.ok) return res.text()
  console.error(RAW_GITHUB_URL + path)
  throw await getError(res)
}

export const getRawFileFromRepo = path =>
  getRawFileFromGitHub(`/${REPO_NAME}/${REPO_BRANCH}/${path}`)

export const getEditUrl = path =>
  `${GITHUB_URL}/${REPO_NAME}/edit/${REPO_BRANCH}/${path}`
