import { Flex, Avatar, Text } from 'theme-ui'
import { trim } from 'lodash'

const Name = props => (
  <Text
    as="span"
    sx={{ fontSize: [1, 2], opacity: 0.75, '@media print': { color: 'black' } }}
    {...props}
  />
)

const Authors = ({
  text = '@lachlanjc',
  color = 'white',
  sx = {},
  extra = [],
  ...props
}) => (
  <Flex
    {...props}
    sx={{
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      mt: 3,
      ...sx
    }}
  >
    {extra.length ? (
      extra.map(author => (
        <Flex
          key={author.name}
          as="a"
          href={author.link}
          target="_blank"
          title={`View ${author.name}'s profile`}
          sx={{
            alignItems: 'center',
            textDecoration: 'none',
            color,
            m: [1, 2]
          }}
        >
          <Avatar
            src={author.pic}
            size={[32, 48, 64]}
            alt={author.name}
            sx={{ mr: 2 }}
          />
          <Name>{author.name}</Name>
        </Flex>
      ))
    ) : (
      <Flex />
    )}
    {text.includes('@') ? (
      text
        .split(',')
        .map(trim)
        .map(name => (
          <Flex
            key={name}
            as="a"
            href={`https://github.com/${name.replace('@', '')}`}
            target="_blank"
            title={`View ${name} on GitHub`}
            sx={{
              alignItems: 'center',
              textDecoration: 'none',
              color,
              m: [1, 2]
            }}
          >
            <Avatar
              src={`https://github.com/${name.replace('@', '')}.png`}
              size={[32, 48, 64]}
              alt={name.replace('@', '')}
              sx={{ mr: 2 }}
            />
            <Name>{name}</Name>
          </Flex>
        ))
    ) : (
      <Name>{text}</Name>
    )}
  </Flex>
)

export default Authors
