import { useColorMode } from 'theme-ui'

export default ({ theme }) => {
  // const [colorMode, setColorMode] = useColorMode()
  // setColorMode(theme)
  return (
    <style>{`
      .nav-color-switcher {
        display: none !important;
      }
    `}</style>
  )
}
