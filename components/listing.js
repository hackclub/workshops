import { Container } from '@theme-ui/components'

export default props => (
  <Container
    as="article"
    sx={{
      '> h2, > p': { textAlign: 'center' },
      h2: { mb: 0, '+ p': { mt: 0 } },
      ul: {
        width: '100%',
        display: 'grid',
        gridGap: [3, 4],
        gridTemplateColumns: [null, 'repeat(2, 1fr)', 'repeat(4, 1fr)'],
        listStyle: 'none',
        p: 0,
        m: 0
      },
      li: {
        width: '100%',
        minHeight: 128
      },
      a: {
        display: 'block',
        backgroundColor: 'sunken',
        color: 'text',
        textDecoration: 'none',
        backgroundColor: 'elevated',
        borderRadius: 'extra',
        overflow: 'hidden',
        p: 3,
        WebkitTapHighlightColor: 'transparent',
        transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
        ':hover,:focus': {
          transform: 'scale(1.0625)',
          boxShadow: 'elevated'
        },
        strong: {
          display: 'block'
        },
        em: {
          fontStyle: 'normal'
        }
      }
    }}
    {...props}
  />
)
