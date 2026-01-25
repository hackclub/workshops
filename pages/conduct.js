import { Container, Box, Select } from 'theme-ui'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '../components/header'
import Content from '../components/content'

const Page = ({ html, initialLanguage, availableLanguages }) => {
  const router = useRouter()
  const [language, setLanguage] = useState(initialLanguage)
  const [loading, setLoading] = useState(false)

  const handleLanguageChange = async (e) => {
    const newLanguage = e.target.value
    setLoading(true)
    
    // Refresh the page with the new language
    window.location.href = `/conduct?lang=${newLanguage}`
  }



  // Position the dropdown to the left of the theme toggle
  useEffect(() => {
    const themeSwitcher = document.querySelector('.nav-color-switcher')
    const languageSelect = document.querySelector('#language-dropdown-container')
    
    if (themeSwitcher && languageSelect) {
      // Insert the language dropdown before the theme switcher
      themeSwitcher.parentNode.insertBefore(languageSelect, themeSwitcher)
    }
  }, [])

  return (
    <>
      <Box
        id="language-dropdown-container"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          '@media print': { display: 'none' }
        }}
      >
        <Select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          disabled={loading}
          sx={{
            bg: 'transparent',
            color: 'primary',
            border: 'none',
            borderRadius: 'default',
            px: 2,
            py: 1,
            fontSize: 1,
            fontFamily: 'body',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minWidth: '150px',
            mr: [3, 4],
            '&:hover': {
              bg: 'sunken'
            },
            '&:focus': {
              outline: 'none',
              bg: 'sunken'
            },
            '&:disabled': {
              opacity: 0.5,
              cursor: 'not-allowed'
            }
          }}
        >
          {availableLanguages.map(lang => {
            const languageNames = {
              english: 'English',
              spanish: 'Español',
              french: 'Français',
              swedish: 'Svenska',
              chinese: '中文',
              german: 'Deutsch',
              italian: 'Italiano',
              portuguese: 'Português',
              japanese: '日本語',
              korean: '한국어',
              dutch: 'Nederlands'
            }
            return (
              <option key={lang} value={lang}>
                {languageNames[lang] || lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            )
          })}
        </Select>
      </Box>
      
      <Header
        title="Code of Conduct"
        desc="The required standards of conduct for the Hack Club community & events."
        img="https://workshop-cards.hackclub.com/Code%20of%20Conduct.png?theme=light&fontSize=300px"
        includeMeta
        sx={{ mb: 0 }}
      />
      
      <Container variant="copy" sx={{ py: [3, 4] }}>
        <Content html={html} />
      </Container>
    </>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { getConductHtml, getAvailableConductLanguages } = require('../lib/data-server')
  
  // Get available languages
  const availableLanguages = await getAvailableConductLanguages()
  
  // Get requested language or default to english
  const requestedLanguage = query.lang || 'english'
  const language = availableLanguages.includes(requestedLanguage) ? requestedLanguage : 'english'
  
  // Get the HTML content for the selected language
  const html = await getConductHtml(language)
  
  return { 
    props: { 
      html, 
      initialLanguage: language,
      availableLanguages 
    }
  }
}

export default Page
