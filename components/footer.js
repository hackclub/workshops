import { Container, Box } from 'theme-ui'
import Footer from './footer.mdx'

export default () => (
  <Box
    as="footer"
    sx={{ bg: 'sunken', textAlign: 'center', px: 2, py: [3, 4] }}
  >
    <Container
      variant="narrow"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { color: 'secondary', fontSize: 2 },
        a: { color: 'primary' }
      }}
    >
      <Footer />
    </Container>
  </Box>
)
