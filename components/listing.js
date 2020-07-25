import { Box, Container, Heading, Text, Grid, Card, Image } from 'theme-ui'
import Link from 'next/link'

const WorkshopCard = ({ slug, name, description, section }) => (
  <Link href={`/${slug}`} passHref>
    <Card
      as="a"
      variant="interactive"
      sx={{ color: 'text', textDecoration: 'none', p: [0, 0], lineHeight: 0, display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ p: 3, lineHeight: 'body' }}>
        <Heading as="h3" sx={{ my: 1 }}>
          {name}
        </Heading>
        <Text variant="caption">{description}</Text>
      </Box>
      {(section === 'starters' || section === 'web') &&
        <Image
          alt="Demo"
          src={`/content/workshops/${slug}/img/demo.png`}
          loading="lazy"
          sx={{ width: '100%', mt: 'auto' }}
        />
      }
    </Card>
  </Link>
)

const Listing = ({ id, title, description, workshops, ...props }) => (
  <Box
    as="section"
    sx={{
      backgroundImage: theme =>
        `linear-gradient(to bottom, ${theme.colors.sheet}, ${
          theme.colors.sunken
        })`,
      py: [4, 5],
      color: 'text'
    }}
    {...props}
  >
    <Container>
      <Heading as="h2" variant="headline" sx={{ mt: 0, mb: 1 }}>
        {title}
      </Heading>
      <Text variant="caption" sx={{ fontSize: 2 }}>
        {description}
      </Text>
      <Grid
        gap={[3, 4]}
        columns={[null, 2, 4]}
        sx={{
          mt: [3, 4]
        }}
      >
        {workshops.map(workshop => (
          <WorkshopCard key={workshop.slug} section={id} {...workshop} />
        ))}
      </Grid>
    </Container>
  </Box>
)

export default Listing
