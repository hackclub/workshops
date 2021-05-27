import { Box, Container } from 'theme-ui'

export default function Loading() {
  return (
    <Container
      sx={{
        justifyContent: 'center',
        justifyItems: 'center',
        alignContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Box>Loading...</Box>
    </Container>
  )
}
