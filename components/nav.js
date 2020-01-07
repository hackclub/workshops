import { useColorMode } from 'theme-ui'
import { useRouter } from 'next/router'
import { Box, Container, IconButton, Link as A } from '@theme-ui/components'
import Link from 'next/link'
import { Home, Moon, GitHub } from 'react-feather'

const NavButton = ({ sx, ...props }) => (
  <IconButton
    {...props}
    sx={{
      color: 'red',
      borderRadius: 'circle',
      transition: 'box-shadow .125s ease-in-out',
      ':hover,:focus': {
        boxShadow: '0 0 0 2px',
        outline: 'none'
      },
      ...sx
    }}
  />
)

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <NavButton
      {...props}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      title="Cycle Color Mode"
    >
      <Moon size={24} />
    </NavButton>
  )
}

export default () => {
  const [mode] = useColorMode()
  const router = useRouter()
  const home = router.pathname === '/'
  return (
    <Box
      as="nav"
      sx={{
        bg: mode === 'dark' ? 'darkless' : 'snow',
        color: 'nav',
        py: 3
      }}
      key="nav"
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          a: {
            fontSize: 1,
            color: 'primary',
            textDecoration: 'none',
            mr: [3, 4]
          }
        }}
      >
        <A
          href="https://hackclub.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hack Club homepage"
          sx={{ mt: -3, mr: 'auto !important' }}
        >
          <Box
            as="img"
            src="https://hackclub.com/orpheus_flag.svg"
            alt="Hack Club flag"
            sx={{ width: [96, 128] }}
          />
        </A>
        {!home && (
          <Link href="/">
            <NavButton as="a" aria-label="Go to homepage">
              <Home size={24} />
            </NavButton>
          </Link>
        )}
        <NavButton
          as="a"
          href="https://github.com/lachlanjc/hackathons"
          aria-label="View source code on GitHub"
        >
          <GitHub size={24} />
        </NavButton>
        <ColorSwitcher />
      </Container>
    </Box>
  )
}
