import fs from 'fs/promises'
import path from 'path'
import markdownToHtml from '@hackclub/markdown'

export const getConductHtml = async (language = 'english') => {
  try {
    const filePath = path.join(process.cwd(), 'conduct', `${language}.md`)
    const md = await fs.readFile(filePath, 'utf8')
    const html = await markdownToHtml(md, `conduct/${language}.md`, '/content', true)
    return html
  } catch (error) {
    if (language !== 'english') {
      return getConductHtml('english')
    }
    throw error
  }
}

export const getAvailableConductLanguages = async () => {
  try {
    const conductDir = path.join(process.cwd(), 'conduct')
    const files = await fs.readdir(conductDir)
    
    const languages = files
      .filter(file => file.endsWith('.md') && file.toLowerCase() !== 'readme.md')
      .map(file => file.replace('.md', ''))
    
    return languages
  } catch (error) {
    return ['english']
  }
}

export const getPrivacyHtml = async () => {
  const filePath = path.join(process.cwd(), 'privacy', 'privacy_and_terms.md')
  const md = await fs.readFile(filePath, 'utf8')
  const html = await markdownToHtml(md, 'privacy/privacy_and_terms.md', '/content', true)
  return html
}

export const getSafeguardingHtml = async () => {
  const filePath = path.join(process.cwd(), 'safeguarding', 'safeguarding_policy.md')
  const md = await fs.readFile(filePath, 'utf8')
  const html = await markdownToHtml(md, 'safeguarding/safeguarding_policy.md', '/content', true)
  return html
}
