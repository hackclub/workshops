import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  Card,
  Flex,
  Image
} from 'theme-ui'
import Link from 'next/link'
import NextImage from 'next/image'
import { ChevronDown, ChevronUp } from 'react-feather'
import { snakeCase } from 'lodash'
import { useState } from 'react'

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
      {['starters', 'web', 'bounties'].includes(section) && (
        <Box
          sx={{
            width: '100%',
            mt: 'auto',
            ...(img && { height: 0, paddingBottom: '50%' }),
            '> img': { objectFit: 'cover', objectPosition: 'center' },
            '@media print': { display: 'none' }
          }}
        >
          {/* currently Next Images only support known domains, so we can’t use them for bounties/etc with the `img` in metadata */}
          {img ? (
            <Image alt={`${name} demo`} src={img} loading="lazy" />
          ) : (
            <NextImage
              alt={`${name} demo`}
              src={`/content/workshops/${slug}/img/demo.png`}
              width={512}
              height={256}
            />
          )}
        </Box>
      )}
    </Card>
  </Link>
)

const Listing = ({ id, title, description, workshops, sx = {}, ...props }) => {
  const [isCollapsed, setisCollapsed] = useState(false)

  return (
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
          <Flex sx={{ alignItems: 'center', gap: 3 }} {...props}>
            {title}
            <Box
              as="div"
              title="click here to see more workshops"
              sx={{
                display: ['none', 'none', 'flex'],
                transition: '1s',
                cursor: 'pointer',
                alignItems: 'center',
                ':hover': { transform: 'scale(1.01)' }
              }}
              onClick={() => setisCollapsed(!isCollapsed)}
            >
              {workshops.length <= 4 ? null : isCollapsed ? (
                <ChevronUp size={32} />
              ) : (
                <ChevronDown size={32} />
              )}
            </Box>
          </Flex>
        </Heading>
        <Text variant="caption" sx={{ fontSize: 2 }}>
          {description}
        </Text>
        <Grid
          gap={[3, 4]}
          columns={[null, 2, 4]}
          sx={{
            mt: [3, 4],
            display: ['grid', 'grid', 'none'],
            '@media print': { gridTemplateColumns: 'repeat(2,1fr)' }
          }}
        >
          {workshops.map(workshop => (
            <WorkshopCard key={workshop.slug} section={id} {...workshop} />
          ))}
        </Grid>
        <Grid
          gap={[3, 4]}
          columns={[null, 2, 4]}
          sx={{
            mt: [3, 4],
            display: ['none', 'none', 'grid'],
            '@media print': { gridTemplateColumns: 'repeat(2,1fr)' }
          }}
        >
          {workshops.map((workshop, index) =>
            isCollapsed ? (
              <WorkshopCard key={workshop.slug} section={id} {...workshop} />
            ) : index <= 3 ? (
              <WorkshopCard key={workshop.slug} section={id} {...workshop} />
            ) : null
          )}
        </Grid>
      </Container>
    </Box>
  )
}

export default Listing
