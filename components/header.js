import { Box, Container, Heading, useColorMode } from 'theme-ui'
import Nav from './nav'
import Head from 'next/head'
import Meta from '@hackclub/meta'

export default ({
  title,
  desc,
  img,
  bgImg,
  children,
  includeMeta = false,
  hideNav = false,
  sx = {}
}) => {
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
    hideNav ? null : <Nav key="nav" material={!!bgImg} />,
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
        ...sx
      }}
    >
      {includeMeta && (
        <Meta as={Head} title={title} description={desc} image={img} />
      )}
      <Container variant="copy">
        <Heading
          as="h1"
          variant="title"
          sx={{ color: 'primary' }}
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
