import { Image, useColorMode } from 'theme-ui'

const Signature = () => {
  const [colorMode] = useColorMode()
  return (
    <Image
      src={
        colorMode === 'dark'
          ? 'https://lh6.googleusercontent.com/zN4HoAfUfEqjJpCwkxutNWpyxUQaeDAbIJ4gNfC69N_aP7AYo8szr7yYZKIQpVkvEmCy5LG24GxWWW3p1TaBvlm8FcEwmCcYq9oV_izt0hp8elRyQhbT7bSLc3MKKJMVkMZj9kZq'
          : 'https://lh4.googleusercontent.com/cWSIcZNYFMWe1_Ka3Yt4pIuvrj3fZElBrZbuOLSl6wZYaLUTE1OsY_wq_h5Ta4nT4RxLag1er_w5W-Vi99Yu0qBNUZZ0JtobuRPNgJZecro-qL61sYkYhnVdIVAyIC5ISeszyo-h'
      }
      width={96}
      alt="Zach's signature"
    />
  )
}

export default Signature
