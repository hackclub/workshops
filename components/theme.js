export const breakpoints = [32, 48, 64, 96, 128].map(w => `${w}em`)

const heading = {
  color: 'text',
  lineHeight: 'heading',
  fontWeight: 'bold'
}

export const palette = {
  darker: '#121217',
  dark: '#17171d',
  darkless: '#252429',

  black: '#1f2d3d',
  steel: '#273444',
  slate: '#3c4858',
  muted: '#8492a6',
  smoke: '#e0e6ed',
  snow: '#f9fafc',
  white: '#ffffff',

  red: '#ec3750',
  orange: '#ff8c37',
  yellow: '#f1c40f',
  green: '#33d6a6',
  cyan: '#5bc0de',
  blue: '#338eda',

  twitter: '#1da1f2',
  facebook: '#3b5998',
  instagram: '#e1306c'
}

export const theme = {
  breakpoints,
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 16, 20, 24, 32, 48, 64, 96, 128],
  initialColorMode: 'light',
  useColorSchemeMediaQuery: true,
  colors: {
    ...palette,
    text: palette.black,
    background: palette.white,
    elevated: palette.white,
    sunken: palette.smoke,
    border: palette.smoke,
    placeholder: palette.muted,
    secondary: palette.slate,
    primary: palette.red,
    muted: palette.muted,
    accent: palette.blue,
    modes: {
      dark: {
        text: palette.white,
        background: palette.dark,
        elevated: palette.darkless,
        sunken: palette.darker,
        border: palette.darkless,
        placeholder: palette.slate,
        secondary: palette.muted,
        muted: palette.muted,
        accent: palette.cyan
      }
    }
  },
  fonts: {
    body:
      '"Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    monospace: '"SFMono-Regular", "Roboto Mono", Menlo, Consolas, monospace'
  },
  lineHeights: {
    title: 1,
    heading: 1.125,
    subheading: 1.25,
    body: 1.5
  },
  fontWeights: {
    body: 400,
    bold: 700
  },
  letterSpacings: {
    title: '-0.009em',
    headline: '0.009em'
  },
  sizes: {
    widePlus: 2048,
    wide: 1536,
    layoutPlus: 1200,
    layout: 1024,
    copyPlus: 768,
    copy: 680,
    narrowPlus: 600,
    narrow: 512
  },
  radii: {
    default: 6,
    extra: 9,
    circle: 99999
  },
  shadows: {
    small: '0 1px 2px rgba(0, 0, 0, 0.0625), 0 2px 4px rgba(0, 0, 0, 0.0625)',
    card: '0 4px 8px rgba(0, 0, 0, 0.125)',
    elevated: '0 1px 2px rgba(0, 0, 0, 0.0625), 0 8px 12px rgba(0, 0, 0, 0.125)'
  },
  text: {
    heading: {
      fontWeight: 'bold',
      lineHeight: 'heading'
    },
    title: {
      fontWeight: 'bold',
      lineHeight: 'title',
      letterSpacing: 'title',
      fontSize: [4, 5, 6]
    },
    subtitle: {
      fontSize: [2, 3, null, null, 4],
      fontWeight: 'body',
      letterSpacing: 'headline',
      lineHeight: 'subheading'
    },
    headline: {
      fontWeight: 'bold',
      lineHeight: 'heading',
      letterSpacing: 'headline',
      fontSize: 4,
      mt: 3,
      mb: 3
    },
    subheadline: {
      fontWeight: 'bold',
      lineHeight: 'heading',
      letterSpacing: 'headline',
      fontSize: 2,
      mt: 0,
      mb: 3
    },
    caption: {
      color: 'muted',
      fontWeight: 'medium',
      letterSpacing: 'headline'
    }
  },
  alerts: {
    primary: {
      color: 'invertedText',
      bg: 'orange',
      fontWeight: 'body'
    }
  },
  badges: {
    pill: {
      borderRadius: 'circle'
    }
  },
  buttons: {
    primary: {
      bg: 'primary',
      color: 'background',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontWeight: 'bold',
      svg: { ml: -1, mr: 2 }
    },
    inverted: {
      bg: 'invertedPrimary',
      color: 'invertedText',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontWeight: 'bold',
      svg: { ml: -1, mr: 2 }
    }
  },
  forms: {
    input: {
      bg: 'elevated',
      color: 'text',
      fontFamily: 'inherit',
      borderRadius: 'base',
      boxShadow: 'small',
      transition: 'box-shadow .125s ease-in-out',
      border: 0,
      ':hover,:focus': { boxShadow: 'card' },
      '::-webkit-input-placeholder': { color: 'placeholder' },
      '::-moz-placeholder': { color: 'placeholder' },
      ':-ms-input-placeholder': { color: 'placeholder' },
      '&[type="search"]::-webkit-search-decoration': { display: 'none' }
    },
    label: {
      color: 'text',
      fontWeight: 'medium'
    },
    hidden: {
      position: 'absolute',
      height: '1px',
      width: '1px',
      overflow: 'hidden',
      clip: 'rect(1px, 1px, 1px, 1px)',
      whiteSpace: 'nowrap'
    }
  },
  cards: {
    primary: {
      bg: 'elevated',
      color: 'text',
      p: [3, 4],
      borderRadius: 'extra',
      boxShadow: 'card',
      input: { boxShadow: 'none !important' }
    },
    sunken: {
      bg: 'sunken',
      p: [3, 4],
      borderRadius: 'extra',
      'input, a': { bg: 'header', boxShadow: 'none !important' }
    }
  },
  layout: {
    container: {
      width: '100%',
      maxWidth: ['layout', null, 'layoutPlus', null, 'wide'],
      mx: 'auto',
      px: 3
    },
    wide: {
      width: '100%',
      maxWidth: ['wide', null, null, null, 'widePlus'],
      mx: 'auto',
      px: 3
    },
    copy: {
      width: '100%',
      maxWidth: ['copy', null, null, null, 'copyPlus'],
      mx: 'auto',
      px: 3
    },
    narrow: {
      width: '100%',
      maxWidth: ['narrow', null, 'narrowPlus', null, 'layout'],
      mx: 'auto',
      px: 3
    }
  },
  styles: {
    h1: {
      ...heading,
      fontSize: 5
    },
    h2: {
      ...heading,
      fontSize: 4
    },
    h3: {
      ...heading,
      fontSize: 3
    },
    h4: {
      ...heading,
      fontSize: 2
    },
    h5: {
      ...heading,
      fontSize: 1
    },
    h6: {
      ...heading,
      fontSize: 0
    },
    p: {
      color: 'text',
      fontFamily: 'inherit',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'primary'
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    img: {
      maxWidth: '100%'
    },
    hr: {
      borderColor: 'border',
      my: [3, 4]
    }
  }
}
theme.styles.root = {
  fontFamily: theme.fonts.body,
  lineHeight: theme.lineHeights.body,
  fontWeight: theme.fontWeights.body,
  color: theme.colors.text,
  margin: 0,
  minHeight: '100vh'
}

export default theme
