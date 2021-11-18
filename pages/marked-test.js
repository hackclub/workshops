import MarkedRenderer from "../components/MarkedRenderer";

export const GITHUB_URL = 'https://github.com'
export const RAW_GITHUB_URL = 'https://raw.githubusercontent.com'
export const REPO_NAME = 'hackclub/hackclub'
export const REPO_BRANCH = 'main'

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

const getRawFileFromGitHub = async path => {
  const res = await fetch(RAW_GITHUB_URL + path)
  if (res.ok) return res.text()
  console.error(RAW_GITHUB_URL + path)
  throw await getError(res)
}

const getRawFileFromRepo = (path, branch, repo) =>
  getRawFileFromGitHub(`/${repo || REPO_NAME}/${branch || REPO_BRANCH}/${path}`)

const getWorkshopFile = async slug => {
  const result = await getRawFileFromRepo(`/workshops/${slug}/README.md`)
  return result;
}


const md = `
# header 1
## header 2
### header 3
#### header 4
##### header 5

**bold**

*italic*

[link](google.com)

regular text

<video 
       src="https://user-images.githubusercontent.com/27078897/140564568-53c34ce8-2520-41bc-b341-e24c8bde100f.mov"
       width="320" height="240" controls>
</video>

\`\`\`javascript
console.log("Test it");
\`\`\`

\`\`\`html
<script
  type="text/paperscript"
  canvas="splatterPaint"
  src="/script.js"
></script>
\`\`\`

\`inline code\`

`

export default function main({ md }) {
	console.log(md);

	return <MarkedRenderer md={md} />
}

export const getStaticProps = async () => {
  const md = await (await getWorkshopFile("stressed_ball"));

  return { props: { md }, revalidate: 30 }
}












