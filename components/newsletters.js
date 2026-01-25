import { Grid, Card } from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { formatTitle } from '../lib/format-title'

const colors = 'red,orange,yellow,green,cyan,blue,purple'.split(',')
const getColor = i => colors[Number(i - 1) % colors.length]

export default ({ issues, showAbout, kind = '' }) => {
  const { pathname, query, isReady } = useRouter()
  const [active, setActive] = useState(false)
  
  useEffect(() => {
    if (isReady) {
      const isActive =
        pathname.startsWith('/leader-newsletters/') ||
        pathname.startsWith('/vip-newsletters/') ||
        pathname.startsWith('/newsletter/')
      setActive(isActive ? query.slug : false)
    }
  }, [isReady, pathname, query.slug])
  
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
            key={issue}>
            <Card
              as="a"
              variant="nav"
              sx={{
                bg: getColor(i + 1),
                color: 'white',
                boxShadow: active === issue
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
