import { Grid, Card, useThemeUI } from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

const colors = 'red,orange,yellow,green,cyan,blue'.split(',')
const getColor = i => colors[(Number(i) % colors.length) - 1]

export default ({ issues, showAbout }) => {
  const { pathname, query } = useRouter()
  const active = pathname.startsWith('/vip-newsletters/') ? query.slug : false
  const { theme } = useThemeUI()
  return (
    <>
      <Grid columns={[2, 3, 4]} gap={3} sx={{ alignItems: 'center' }}>
        {issues.map(issue => (
          <Link
            href="/vip-newsletters/[slug]"
            as={`/vip-newsletters/${issue}`}
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
