import { Box, Container, Text, Heading, Image, useColorMode } from 'theme-ui'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from './nav'

const Header = ({
  title,
  desc,
  img,
  bgImg,
  children,
  includeMeta = false,
  hideNav = false,
  navBg = true,
  sx = {},
  ...props
}) => {
  const { pathname } = useRouter()
  const [mode] = useColorMode()
  if (bgImg) {
    const shades = mode === 'dark' ? [0.5, 0.75] : [0.125, 0.25]
    sx = {
      ...sx,
      backgroundImage: `linear-gradient(rgba(0,0,0,${shades[0]}), rgba(0,0,0,${shades[1]})),
        url('${bgImg}')`,
      backgroundSize: 'cover',
      textShadow: 'text',
      'h1, h2': { color: 'white !important' }
    }
  }
  return [
    hideNav ? null : (
      <Nav {...props} key="nav" homepage={navBg} material={!!bgImg} />
    ),

    <Box
      key="print"
      aria-hidden
      sx={{
        display: 'none',
        mb: 3,
        '@media print': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
    >
      <Image
        src="https://assets.hackclub.com/flag-standalone.svg"
        width={128}
        mx={3}
      />
      {(pathname === '/' || pathname === '/[slug]') && (
        <Heading
          as="h1"
          variant="subheadline"
          sx={{
            textTransform: 'uppercase',
            letterSpacing: 'subhead',
            color: 'primary'
          }}
        >
          Workshops
        </Heading>
      )}
    </Box>,
    <Box
      key="header"
      as="header"
      sx={{
        bg: 'sheet',
        color: 'text',
        pt: bgImg ? 6 : 2,
        pb: bgImg ? [4, 5] : [3, 4],
        mb: bgImg ? [4, 5] : [3, 4],
        textAlign: 'center',
        ...sx,
        '@media print': {
          bg: 'white !important',
          backgroundImage: 'none',
          textShadow: 'none',
          pt: 0,
          pb: 0,
          'h1, h2': { color: 'black !important' }
        }
      }}
    >
      {includeMeta && (
        <Meta as={Head} title={title} description={desc} image={img} />
      )}
      <Container variant="copy">
        <Heading
          as="h1"
          variant="title"
          sx={{ color: 'primary', '@media print': { fontSize: 5 } }}
          children={title}
        />
        {desc && (
          <Heading
            as="h2"
            variant="subtitle"
            sx={{ mt: 3, color: 'text' }}
            children={desc}
          />
        )}
        {children}
      </Container>
    </Box>
  ]
}

export default Header
