import { useState } from 'react'
import { Box, Container, Heading, Text, Grid, Card, Image } from 'theme-ui'
import Link from 'next/link'
import NextImage from 'next/image'
import { snakeCase } from 'lodash'
import Icon from '@hackclub/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
      {['starters', 'web', 'hack-lab'].includes(section) && (
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

function Listing({ id, title, description, workshops, ...props }) {
  const [copied, setCopied] = useState(false)
  return (
    <Box
      as="section"
      id={snakeCase(title)}
      sx={{
        backgroundImage: `theme.util.gx('sheet', 'sunken')`,
        py: [4, 5],
        flex: workshops.length == 0 ? 1 : null, //fix for floating footer on fallback data being rendered
        color: 'text',
        '@media print': { background: 'none !important' }
      }}
      {...props}
    >
      <Container>
        <CopyToClipboard
          text={`https://workshops.hackclub.com#${snakeCase(title)}`}
          onCopy={() => {
            setCopied(true)
            setTimeout(() => {
              setCopied(false)
            }, 3000)
          }}
        >
          <Box sx={{ display: 'table-cell', verticalAlign: 'middle' }}>
            <Heading
              as="h2"
              variant="headline"
              sx={{ mt: 0, mb: 1, display: 'inline', width: 'fit-content' }}
            >
              {title}
            </Heading>
            <Box
              sx={{
                position: 'relative',
                display: 'inline',
                width: 'fit-content',
                color: 'muted',
                pl: '5px',
                ':hover,:focus': {
                  cursor: 'pointer',
                  '> span': {
                    display: 'block'
                  }
                }
              }}
            >
              <Icon glyph="link" size={24} />
              <Text
                sx={{
                  position: 'absolute',
                  right: '-350%',
                  bottom: '0',
                  display: 'none',
                  backgroundColor: '#1f2d3d',
                  color: 'white',
                  opacity: '80%',
                  px: '5px',
                  py: '2px',
                  borderRadius: '5px',
                  width: '350%',
                  textAlign: 'center'
                }}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </Text>
            </Box>
          </Box>
        </CopyToClipboard>
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
}
export default Listing
