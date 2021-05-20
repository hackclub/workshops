/** @jsxImportSource theme-ui */

import { ArrowLeft, Moon, GitHub, Search, X } from 'react-feather'
import { Box, Container, IconButton, Image, useColorMode } from 'theme-ui'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { useState, useRef, Fragment } from 'react'
import { cloneDeep } from 'lodash'

const Material = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  ${props =>
    props.colorMode === 'dark'
      ? `
         background-color: rgba(0, 0, 0, 0.875);
         @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
           background-color: rgba(0, 0, 0, 0.75);
           -webkit-backdrop-filter: saturate(180%) blur(12px);
        }
         `
      : `
           background-color: rgba(255, 255, 255, 0.98);
           @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
             background-color: rgba(255, 255, 255, 0.75);
             -webkit-backdrop-filter: saturate(180%) blur(12px);
           }
         `};
  @media (prefers-reduced-transparency: reduce) {
    -webkit-backdrop-filter: auto !important;
  }
`

const parentVariant = {
  hidden: {
    backgroundColor: 'transparent',
    paddingLeft: '0px',
    x: '0px',
    border: '0px none rgba(1,1,0,0)',
    when: 'beforeChildren'
  },
  visible: {
    width: 250,
    backgroundColor: 'var(--theme-ui-colors-background)',
    paddingLeft: '16px',
    x: '-32px',
    border: '2px solid rgba(236,55,80,1)',
    transition: {
      border: {
        duration: 0.2
      }
    }
  },
  mobVisible: {
    width: 250,
    backgroundColor: 'var(--theme-ui-colors-background)',
    paddingLeft: '16px',
    x: '0px',
    border: '2px solid rgba(236,55,80,1)',
    transition: {
      border: {
        duration: 0.2
      }
    }
  }
}

const childVariant = {
  hidden: {
    opacity: 0,
    scale: 0,
    display: 'none'
  },
  visible: {
    opacity: 1,
    scale: 1,
    display: 'inline-flex'
  }
}

const flagVariant = {
  hidden: {
    opacity: 0,
    scale: 0,
    display: 'none'
  },
  visible: {
    opacity: 1,
    scale: 1,
    display: 'inline'
  }
}

const colorSwitcherVariant = cloneDeep(flagVariant)
colorSwitcherVariant['visible'].display = 'inline-flex'

const Flag = ({ visible }) => {
  const retAnim = visible => {
    if (visible) {
      return window.innerWidth <= 512 ? 'hidden' : 'visible'
    } else {
      return 'visible'
    }
  }

  return (
    <Fragment>
      <motion.a
        variants={flagVariant}
        animate={retAnim(visible)}
        href="https://hackclub.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hack Club homepage"
        sx={{
          mr: 'auto',
          mt: -3,
          lineHeight: 0
        }}
      >
        <Image
          src="https://assets.hackclub.com/flag-orpheus-top.svg"
          alt="Hack Club flag"
          sx={{ width: [96, 128] }}
        />
      </motion.a>
    </Fragment>
  )
}

export const NavButton = ({ color = 'red', csx, ...props }) => (
  <IconButton
    {...props}
    sx={{
      display: ['none', 'initial'],
      color,
      borderRadius: 'circle',
      textDecoration: 'none',
      mr: [3, 4],
      transition: 'box-shadow .125s ease-in-out',
      ':hover,:focus': {
        boxShadow: '0 0 0 2px',
        outline: 'none'
      },
      ...csx
    }}
  />
)

const IconWrapper = ({ csx, children, ...props }) => {
  return (
    <motion.div
      {...props}
      sx={{
        display: 'inline-flex',
        padding: '4px',
        color: 'red',
        borderRadius: 'circle',
        textDecoration: 'none',
        mr: [3, 4],
        cursor: 'pointer',
        transition: 'box-shadow .125s ease-in-out',
        ':hover,:focus': {
          boxShadow: '0 0 0 2px',
          outline: 'none'
        },
        ...csx
      }}
    >
      {children}
    </motion.div>
  )
}

const SearchBar = ({ setVisible, visible, search, ...props }) => {
  const inp = useRef(null)

  const handle_focus = () => {
    const display_val = inp.current.style.display

    if (display_val == 'none') inp.current.blur()
    else inp.current.focus()
  }

  const onClick = () => {
    setVisible(!visible)
  }

  const retAnim = visible => {
    if (visible) {
      return window.innerWidth <= 512 ? 'mobVisible' : 'visible'
    }
    return 'hidden'
  }

  return (
    <motion.div
      variants={parentVariant}
      animate={retAnim(visible)}
      sx={{
        display: 'flex',
        borderRadius: 'circle',
        py: [1]
      }}
      layout
      onAnimationComplete={handle_focus}
    >
      <IconWrapper
        variants={childVariant}
        animate={visible ? 'hidden' : 'visible'}
        onClick={onClick}
      >
        <Search size={24} />
      </IconWrapper>

      <motion.input
        {...props}
        variants={childVariant}
        autoFocus
        sx={{
          flex: 1,
          py: 1,
          borderRadius: 'circle',
          border: '0px none',
          outline: 'none',
          backgroundColor: 'background',
          color: 'text'
        }}
        ref={inp}
        onChange={ele => {
          search(inp.current.value)
        }}
        placeholder="Search Workshops"
      />

      <IconWrapper
        variants={childVariant}
        onClick={onClick}
        csx={{
          padding: '2px',
          mr: [2],
          transition: 'box-shadow .125s ease-in-out',
          ':hover,:focus': {
            transform: `scale(1.1)`
          }
        }}
      >
        <X size={20} />
      </IconWrapper>
    </motion.div>
  )
}

const BackButton = ({ to = '/', text = 'Back' }) => (
  <Link href={to} passHref>
    <NavButton
      as="a"
      title={to === '/' ? 'Back to homepage' : 'Back'}
      csx={{
        display: 'flex',
        width: 'auto',
        pr: 2,
        mr: 'auto'
      }}
    >
      <ArrowLeft />
      {text}
    </NavButton>
  </Link>
)

const ColorSwitcher = props => {
  const [mode, setMode] = useColorMode()

  const retAnim = visible => {
    if (visible) {
      return window.innerWidth <= 512 ? 'hidden' : 'visible'
    } else {
      return 'visible'
    }
  }

  return (
    <IconWrapper
      variants={colorSwitcherVariant}
      animate={retAnim(props.visible)}
      {...props}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      title="Reverse color scheme"
    >
      <Moon size={24} />
    </IconWrapper>
  )
}

const Nav = ({ material = false, homepage, search }) => {
  const [visible, setVisible] = useState(false)
  const [mode] = useColorMode()
  const { pathname } = useRouter()
  const home = pathname === '/'
  const standalone = pathname !== '/[slug]'
  const back = !home && !standalone
  const Background = material ? Material : Box
  return (
    <Background
      as="nav"
      colorMode={mode}
      sx={{
        bg: homepage ? 'sheet' : 'none',
        py: 3,
        '@media print': { display: 'none' }
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: ['space-around'],
          a: {
            fontSize: 1,
            color: 'primary',
            textDecoration: 'none'
          }
        }}
      >
        {back ? (
          <BackButton text="All Workshops" />
        ) : (
          <Flag visible={visible} />
        )}
        {(home || !standalone) && (
          <Fragment>
            {back ? null : (
              <SearchBar
                search={search}
                setVisible={setVisible}
                visible={visible}
              />
            )}
            <NavButton
              as="a"
              href="https://github.com/hackclub/workshops"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
              visible={visible}
            >
              <GitHub size={24} />
            </NavButton>
          </Fragment>
        )}
        <ColorSwitcher visible={visible} className="nav-color-switcher" />
      </Container>
    </Background>
  )
}

export default Nav
