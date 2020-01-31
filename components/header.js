import { Box, Container, Heading, useColorMode } from 'theme-ui'
import Head from 'next/head'
import { Meta } from '@hackclub/components'

export default ({
  centered = true,
  title,
  desc,
  img,
  children,
  includeMeta = false,
  sx = {}
}) => {
  const dark = useColorMode()[0] === 'dark'
  return (
    <Box
      as="header"
      sx={{
        bg: dark ? 'darkless' : 'snow',
        color: 'text',
        pt: [4, null, null, null, 5],
        pb: [4, 5, null, null, 6],
        mb: [4, 5, null, null, 6],
        textAlign: centered && 'center',
        ...sx
      }}
    >
      {includeMeta && (
        <Head>
          <Meta title={title} description={desc} image={img} />
        </Head>
      )}
      <Container>
        <Heading
          as="h1"
          variant="title"
          sx={{
            color: 'primary',
            maxWidth: 'copyPlus',
            mx: centered && 'auto'
          }}
          children={title}
        />
        {desc && (
          <Heading
            as="h2"
            variant="subtitle"
            sx={{
              mt: 3,
              color: 'text',
              mx: centered && 'auto'
            }}
            children={desc}
          />
        )}
        {children}
      </Container>
    </Box>
  )
}
