import { ArrowLeft, Moon, GitHub } from 'react-feather'
import {
  Box,
  Container,
  IconButton,
  Link as A,
  Image,
  useColorMode
} from 'theme-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from '@emotion/styled'

const Material = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  ${props =>
    props.colorMode === 'dark'
      ? `
         background-color: rgba(0, 0, 0, 0.875);
         @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
           background-color: rgba(0, 0, 0, 0.75);
           -webkit-backdrop-filter: saturate(180%) blur(12px);
         }
         `
      : `
           background-color: rgba(255, 255, 255, 0.98);
           @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
             background-color: rgba(255, 255, 255, 0.75);
             -webkit-backdrop-filter: saturate(180%) blur(12px);
           }
         `};
  @media (prefers-reduced-transparency: reduce) {
    -webkit-backdrop-filter: auto !important;
  }
`

const Flag = () => (
  <A
    href="https://hackclub.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Hack Club homepage"
    sx={{ mt: -3, lineHeight: 0, mr: 'auto' }}
  >
    <Image
      src="https://assets.hackclub.com/flag-orpheus-top.svg"
      alt="Hack Club flag"
      sx={{ width: [96, 128] }}
    />
  </A>
)

export const NavButton = ({ color = 'red', sx, ...props }) => (
  <IconButton
    {...props}
    sx={{
      color,
      borderRadius: 'circle',
      textDecoration: 'none',
      mr: [3, 4],
      transition: 'box-shadow .125s ease-in-out',
      ':hover,:focus': {
        boxShadow: '0 0 0 2px',
        outline: 'none'
      },
      ...sx
    }}
  />
)

const BackButton = ({ to = '/', text = 'Back' }) => (
  <Link href={to} passHref>
    <NavButton
      as="a"
      title={to === '/' ? 'Back to homepage' : 'Back'}
      sx={{ display: 'flex', width: 'auto', pr: 2, mr: 'auto' }}
    >
      <ArrowLeft />
      {text}
    </NavButton>
  </Link>
)

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()
  return (
    <NavButton
      {...props}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      title="Reverse color scheme"
    >
      <Moon size={24} />
    </NavButton>
  )
}

const Nav = ({ material = false, homepage }) => {
  const [mode] = useColorMode()
  const { pathname } = useRouter()
  const home = pathname === '/'
  const standalone = pathname !== '/[slug]'
  const back = !home && !standalone
  const Background = material ? Material : Box
  return (
    <Background
      as="nav"
      colorMode={mode}
      sx={{ bg: homepage ? 'sheet' : 'none', py: 3, '@media print': { display: 'none' } }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          a: {
            fontSize: 1,
            color: 'primary',
            textDecoration: 'none'
          }
        }}
      >
        {back ? <BackButton text="All Workshops" /> : <Flag />}
        {(home || !standalone) && (
          <NavButton
            as="a"
            href="https://github.com/hackclub/workshops"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source code on GitHub"
          >
            <GitHub size={24} />
          </NavButton>
        )}
        <ColorSwitcher className="nav-color-switcher"/>
      </Container>
    </Background>
  )
}

export default Nav
