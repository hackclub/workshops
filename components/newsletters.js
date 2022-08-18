import { Grid, Card, useThemeUI } from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

const colors = 'red,orange,yellow,green,cyan,blue,purple'.split(',')
const getColor = i => colors[Number(i - 1) % colors.length]

export default ({ issues, showAbout, vip = true }) => {
  const { pathname, query } = useRouter()
  const active = pathname.startsWith('/vip-newsletters/') || pathname.startsWith('/newsletters/') ? query.slug : false
  const { theme } = useThemeUI()
  return (
    <>
      <Grid columns={[2, 3, 4]} gap={3} sx={{ alignItems: 'center' }}>
        {issues.map(issue => (
          <Link
            href={`/${vip ? 'vip-' : ''}newsletters/[slug]`}
            as={`/${vip ? 'vip-' : ''}newsletters/${issue}`}
            passHref
            key={issue}
          >
            <Card
              as="a"
              variant="nav"
              sx={{ bg: getColor(issue), color: 'white' }}
              style={{
                boxShadow:
                  active === issue
                    ? `0 0 0 3px ${theme.colors.sheet}, 0 0 0 6px ${
                        theme.colors[getColor(issue)]
                      }`
                    : theme.shadows.card
              }}
            >
              {issue}
            </Card>
          </Link>
        ))}
      </Grid>
    </>
  )
}
