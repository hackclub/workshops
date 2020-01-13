import { RAW_GITHUB_URL, REPO_NAME, REPO_BRANCH } from './github'
import visit from 'unist-util-visit'
import toString from 'mdast-util-to-string'
import removeNode from 'unist-util-remove'
import GithubSlugger from 'github-slugger'
// import permalinkIcon from './permalink-icon-ast'

const ABSOLUTE_URL = /^https?:\/\/|^\/\//i
// The headers will be updated to include a link to their hash
const HEADINGS = ['h2', 'h3', 'h4', 'h5', 'h6']

const removeExt = path => {
  const basePath = path.split(/#|\?/)[0]
  const i = basePath.lastIndexOf('.')

  if (i === -1) return path
  return basePath.substring(0, i) + path.substring(basePath.length)
}

const visitCard = node => {
  if (
    !node.children ||
    !node.properties ||
    !node.properties.className ||
    !node.properties.className.includes('card')
  )
    return

  const anchor = node.children.find(n => n.tagName === 'a')

  if (!anchor || !anchor.children) return

  const title = anchor.children.find(n => n.tagName === 'b')
  const text = anchor.children.find(n => n.tagName === 'small')

  if (!title || !text) return

  const titleText = title.children.pop()

  // Remove `:` from the title if it ends with it
  if (titleText && titleText.value && titleText.value.endsWith(':')) {
    titleText.value = titleText.value.slice(0, -1)
  }

  title.children.push(titleText)
  anchor.children = [{ ...title, tagName: 'h4' }, text]

  return node
}

const rehypeDocs = ({ filePath, removeTitle = true }) => {
  const slugger = new GithubSlugger()
  const anchorSlugger = new GithubSlugger()

  const visitAnchor = node => {
    if (!node.properties) return
    const { href } = node.properties
    if (!href) return

    const isDocs = href.startsWith('/')
    const [relativePath, hash] = href.split('#')

    // Reset the slugger because single pages can have multiple urls to the same hash
    anchorSlugger.reset()
    // The URL is relative at this point
    node.properties.className = 'relative'
    // Update the hash used by anchors to match the one set for headers
    node.properties.href = hash
      ? `${relativePath}#${anchorSlugger.slug(hash)}`
      : relativePath
    // Relative URL for another workshope
    if (isDocs) node.properties.href = removeExt(node.properties.href)
  }

  const visitHeading = node => {
    const text = toString(node)

    if (!text) return

    const id = slugger.slug(text)

    node.children = [
      {
        type: 'element',
        tagName: 'span',
        properties: { id }
      },
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href: `#${id}`
        },
        children: node.children
      }
      // {
      //   type: 'element',
      //   tagName: 'span',
      //   properties: { className: 'permalink' },
      //   children: [permalinkIcon]
      // }
    ]
  }

  const visitImage = node => {
    let { src } = node.properties
    if (!src) return
    // If linking to a remote image, ignore
    if (src.match(ABSOLUTE_URL)) return node
    // If linking to an internal image, replace with GitHub path
    node.properties.src = `/content/${filePath.replace(
      '/README.md',
      ''
    )}/${src}`
  }

  // remove title from beginning of docs
  const visitH1 = (node, tree) => {
    if (node.position.start.line < 4) removeNode(tree, node)
    return tree
  }

  return tree => {
    visit(tree, node => node.tagName === 'div', visitCard)
    visit(tree, node => node.tagName === 'a', visitAnchor)
    visit(tree, node => HEADINGS.includes(node.tagName), visitHeading)
    visit(tree, node => node.tagName === 'img', visitImage)
    if (removeTitle) {
      visit(
        tree,
        node => node.tagName === 'h1',
        node => visitH1(node, tree)
      )
    }
  }
}

export default rehypeDocs
