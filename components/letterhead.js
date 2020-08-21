import Head from 'next/head'
import Meta from '@hackclub/meta'
import Header from '../components/header'
import Authored from '../components/authored'
import { Container, Button } from 'theme-ui'
import { GitHub } from 'react-feather'
import { Styled as Content } from '../components/content'

const Letterhead = ({
  title,
  desc,
  author = { name: null, avatar: null, url: null },
  date,
  img,
  path,
  includeMeta = true,
  hideGitHub = false,
  children,
  ...props
}) => (
  <>
    {includeMeta && (
      <Meta
        as={Head}
        title="COVID-19"
        description={
          author?.name && date
            ? `${desc} Written by ${author.name} on ${date}.`
            : desc
        }
        image={img}
      />
    )}
    <Header title={title} desc={desc} {...props}>
      {author?.name && <Authored {...author} date={date} />}
    </Header>
    <Container as={Content} variant="copy" pt={3} pb={[4, 5]}>
      {children}
      {!hideGitHub && (
        <Button
          as="a"
          target="_blank"
          href={`https://github.com/hackclub/workshops/blob/main/pages/${path}`}
          variant="outline"
          sx={{
            mt: 2,
            fontSize: 1,
            textDecoration: 'none !important'
          }}
        >
          <GitHub />
          Edit on GitHub
        </Button>
      )}
    </Container>
  </>
)

export default Letterhead
