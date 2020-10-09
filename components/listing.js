import { Box, Container, Heading, Text, Grid, Card, Image } from 'theme-ui'
import Link from 'next/link'
import { snakeCase } from 'lodash'

const WorkshopCard = ({ slug, name, description, img, section }) => (
  <Link href={`/${slug}`} passHref>
    <Card
      as="a"
      variant="interactive"
      sx={{
        color: 'text',
        textDecoration: 'none',
        p: [0, 0],
        lineHeight: 0,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ p: 3, lineHeight: 'body' }}>
        <Heading as="h3" sx={{ my: 1 }}>
          {name}
        </Heading>
        <Text variant="caption">{description}</Text>
      </Box>
      {(section === 'starters' || section === 'web' || section === 'bounties') && (
        <Image
          alt="Demo"
          src={img || `/content/workshops/${slug}/img/demo.png`}
          loading="lazy"
          sx={{
            width: '100%',
            mt: 'auto',
            '@media print': { display: 'none' }
          }}
        />
      )}
    </Card>
  </Link>
)

const Listing = ({ id, title, description, workshops, ...props }) => (
  <Box
    as="section"
    id={snakeCase(title)}
    sx={{
      backgroundImage: theme =>
        `linear-gradient(to bottom, ${theme.colors.sheet}, ${theme.colors.sunken})`,
      py: [4, 5],
      color: 'text',
      '@media print': { background: 'none !important' }
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
          mt: [3, 4],
          '@media print': { gridTemplateColumns: 'repeat(2,1fr)' }
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
