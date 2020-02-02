import visit from 'unist-util-visit'
import toString from 'mdast-util-to-string'
import removeNode from 'unist-util-remove'
import GithubSlugger from 'github-slugger'

export const handlers = {
  // Add a className to inlineCode so we can differentiate between it and code fragments
  inlineCode(h, node) {
    return {
      ...node,
      type: 'element',
      tagName: 'code',
      properties: { className: 'inline' },
      children: [
        {
          type: 'text',
          value: node.value
        }
      ]
    }
  }
}

const ABSOLUTE_URL = /^https?:\/\/|^\/\//i
// These headings will be include a link to their hash
const HEADINGS = ['h2', 'h3', 'h4', 'h5', 'h6']

const removeExt = path => {
  const basePath = path.split(/#|\?/)[0]
  const i = basePath.lastIndexOf('.')

  if (i === -1) return path
  return basePath.substring(0, i) + path.substring(basePath.length)
}

const rehypeDocs = ({ filePath, imagePrefix, removeTitle }) => {
  const slugger = new GithubSlugger()
  const anchorSlugger = new GithubSlugger()

  const visitAnchor = node => {
    if (!node.properties) return
    const { href } = node.properties
    if (!href) return

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
    if (href.startsWith('/')) {
      node.properties.href = removeExt(node.properties.href)
    }
  }

  const visitHeading = node => {
    const text = toString(node)

    if (!text) return

    const id = slugger.slug(text)
    node.properties.id = id
    node.properties.className = 'heading'

    node.children = [
      {
        type: 'element',
        tagName: 'a',
        properties: {
          href: `#${id}`
        },
        children: node.children
      }
    ]
  }

  const visitImage = node => {
    let { src } = node.properties
    if (!src) return
    // If linking to a remote image, ignore
    if (src.match(ABSOLUTE_URL)) return node
    // If linking to an internal image, possibly prefix path
    node.properties.src = `${imagePrefix}/${filePath.replace(
      '/README.md',
      ''
    )}/${src}`
  }

  // Remove title from beginning of docs
  const visitH1 = (node, tree) => {
    if (node.position.start.line < 4) removeNode(tree, node)
    return tree
  }

  return tree => {
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
