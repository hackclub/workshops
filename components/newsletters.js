import { Grid, Card } from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { formatTitle } from '../lib/format-title'

const colors = 'red,orange,yellow,green,cyan,blue,purple'.split(',')
const getColor = i => colors[Number(i - 1) % colors.length]

export default ({ issues, showAbout, kind = '' }) => {
  const { pathname, query, isReady } = useRouter()
  const [active, setActive] = useState(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    if (isReady) {
      const isActive =
        pathname.startsWith('/leader-newsletters/') ||
        pathname.startsWith('/vip-newsletters/') ||
        pathname.startsWith('/newsletter/')
      setActive(isActive ? query.slug : null)
    }
  }, [isReady, pathname, query.slug])
  
  return (
    <>
      <Grid columns={[1, 2, 3]} gap={3} sx={{ alignItems: 'stretch' }}>
        {issues.map((issue, i) => (
          <Link
            href={`/${kind.length ? `${kind}-` : kind}newsletter${
              kind.length ? 's' : ''
            }/[slug]`}
            as={`/${kind.length ? `${kind}-` : kind}newsletter${
              kind.length ? 's' : ''
            }/${issue}`}
            key={issue}
            style={{ textDecoration: 'none' }}>
            <Card
              variant="nav"
              sx={{
                bg: getColor(i + 1),
                color: 'white',
                height: '100%',
                boxShadow: mounted && active === issue
                  ? theme => `0 0 0 3px ${theme.colors.sheet}, 0 0 0 6px ${theme.colors[getColor(i + 1)]}`
                  : 'card'
              }}
            >
              {kind.length ? issue : formatTitle(issue)}
            </Card>
          </Link>
        ))}
      </Grid>
    </>
  );
}
