import base from '@hackclub/theme'

const theme = base

theme.colors.purple = '#a633d6'

theme.cards.nav = {
  bg: 'elevated',
  color: 'text',
  p: 3,
  borderRadius: 'extra',
  boxShadow: 'card',
  textDecoration: 'none',
  position: 'relative',
  overflow: 'hidden',
  fontSize: 2,
  fontWeight: 'bold',
  lineHeight: 'title',
  WebkitTapHighlightColor: 'transparent',
  transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
  ':hover,:focus': {
    transform: 'scale(1.0625)',
    boxShadow: 'elevated'
  }
}

export default theme
