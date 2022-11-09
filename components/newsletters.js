import { Grid, Card, useThemeUI } from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { formatTitle } from '../lib/format-title'

const colors = 'red,orange,yellow,green,cyan,blue,purple'.split(',')
const getColor = i => colors[Number(i - 1) % colors.length]

export default ({ issues, showAbout, kind = '' }) => {
  const { pathname, query } = useRouter()
  const active =
    pathname.startsWith('/leader-newsletters/') ||
    pathname.startsWith('/vip-newsletters/') ||
    pathname.startsWith('/newsletter/')
      ? query.slug
      : false
  const { theme } = useThemeUI()
  return (
    <>
      <Grid columns={[2, 3, 4]} gap={3} sx={{ alignItems: 'center' }}>
        {issues.map((issue, i) => (
          <Link
            href={`/${kind.length ? `${kind}-` : kind}newsletter${
              kind.length ? 's' : ''
            }/[slug]`}
            as={`/${kind.length ? `${kind}-` : kind}newsletter${
              kind.length ? 's' : ''
            }/${issue}`}
            passHref
            key={issue}
          >
            <Card
              as="a"
              variant="nav"
              sx={{ bg: getColor(i + 1), color: 'white' }}
              style={{
                boxShadow:
                  active === i + 1
                    ? `0 0 0 3px ${theme.colors.sheet}, 0 0 0 6px ${
                        theme.colors[getColor(i + 1)]
                      }`
                    : theme.shadows.card
              }}
            >
              {kind.length ? issue : formatTitle(issue)}
            </Card>
          </Link>
        ))}
      </Grid>
    </>
  )
}
