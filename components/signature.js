import { Image, useColorMode } from 'theme-ui'

const Signature = () => {
  // const [colorMode] = useColorMode()
  // return (
  //   <Image
  //     src={`https://workshops.hackclub.com/signature-${
  //       colorMode === 'dark' ? 'light' : 'dark'
  //     }.png`}
  //     width={96}
  //     alt="Zach's signature"
  //   />
  // )
  return (
    <Image
      src={`https://workshops.hackclub.com/signature-${
        'light'
      }.png`}
      width={96}
      alt="Zach's signature"
    />
  )
}

export default Signature
