import { Avatar, Badge, Flex } from 'theme-ui'

const Authored = ({ name, avatar, url, date, ...props }) => (
  <Flex
    mt={3}
    {...props}
    sx={{
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      'a, span, time': {
        mt: 0,
        mb: 2,
        bg: 'white',
        color: 'muted',
        border: '1px solid',
        borderColor: 'background',
        bg: 'sunken',
        fontSize: 2,
        fontWeight: 'body',
        lineHeight: '36px'
      }
    }}
  >
    <Badge
      variant="pill"
      as={url ? 'a' : 'span'}
      href={url}
      sx={{
        mr: [2, 3],
        pl: 1,
        pr: 3,
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none'
      }}
    >
      <Avatar src={avatar} alt={name} size={36} mr={2} />
      {name}
    </Badge>
    <Badge
      variant="pill"
      as="time"
      px={3}
      dateTime={date?.startsWith('20') ? date : undefined}
    >
      {date}
    </Badge>
  </Flex>
)

export default Authored
