import { Container, Heading, Text, Grid, Card } from 'theme-ui'
import Link from 'next/link'

const WorkshopCard = ({ slug, name, description }) => (
  <Link href={`/${slug}`} passHref>
    <Card
      as="a"
      sx={{
        display: 'block',
        color: 'text',
        textDecoration: 'none',
        backgroundColor: 'elevated',
        borderRadius: 'ultra',
        overflow: 'hidden',
        p: [3, 3],
        WebkitTapHighlightColor: 'transparent',
        transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
        ':hover,:focus': {
          transform: 'scale(1.0625)',
          boxShadow: 'elevated'
        }
      }}
    >
      <Heading as="h3" sx={{ mt: 0, mb: 1 }}>
        {name}
      </Heading>
      <Text variant="caption">{description}</Text>
    </Card>
  </Link>
)

export default ({ title, description, workshops, ...props }) => (
  <Container as="section" {...props} sx={{ color: 'text', mb: [4, 5] }}>
    <Heading as="h2" variant="headline" sx={{ textAlign: 'center' }}>
      {title}
    </Heading>
    <Text variant="caption" sx={{ textAlign: 'center' }}>
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
        <WorkshopCard key={workshop.slug} {...workshop} />
      ))}
    </Grid>
  </Container>
)
