import { Card, Text } from 'theme-ui'
import { Flag } from 'react-feather'

const Announcement = ({
  caption,
  copy,
  iconLeft,
  iconRight,
  iconColor,
  sx = {},
  ...props
}) => (
  <Card
    as={props.href ? 'a' : 'div'}
    variant="interactive"
    sx={{
      mx: 'auto',
      maxWidth: 'narrow',
      width: '100%',
      textAlign: 'left',
      textDecoration: 'none',
      lineHeight: 'caption',
      display: 'flex',
      alignItems: 'center',
      p: [2, 2],
      px: 3,
      svg: { flexShrink: 'none' },
      ...sx
    }}
    {...props}
  >
    {iconLeft && <Flag color={iconColor} size={24} style={{ margin: '8px' }} />}
    <Text
      as="p"
      sx={{ flex: '1 1 auto', strong: { display: ['inline', 'block'] } }}
    >
      <strong>{copy}</strong>
      {caption && (
        <Text as="span" variant="caption" color="secondary">
          {' '}
          {caption}
        </Text>
      )}
    </Text>
    {iconRight && <Flag color={iconColor} size={24} />}
  </Card>
)

export default Announcement
