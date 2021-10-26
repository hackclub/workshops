import { useState } from 'react'
import {
  Card,
  Heading,
  Text,
  Grid,
  Label,
  Input,
  Button,
  Spinner,
  Alert
} from 'theme-ui'

const Loading = () => (
  <Spinner
    size={24}
    color="currentColor"
    sx={{ margin: '0 !important', textAlign: 'center', minWidth: '52px' }}
  />
)

export default ({ workshop }) => {
  const [url, setURL] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    if(url.length < 3){
      setSubmitting(false)
    }
    let submission = await fetch(
      '/api/share',
      {
        method: 'POST',
        body: JSON.stringify({ "URL": url, "Workshop": workshop }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
    if (submission.ok) {
      submission = await submission.json()
      setURL('')
      setSubmitting(false)
      setDone(true)
    } else {
      submission = await submission.json()
      setSubmitting(false)
      setError(submission.errors || 'Something went wrong')
    }
  }
  return (
    <Card sx={{ mx: 'auto', my: [3, 4] }}>
      <Heading as="h2"sx={{ mb: 1 }}>
        We'd love to see what you've made!
      </Heading>
      <Text sx={{ color: 'muted' }}>
        Share a link to your project (through Replit, GitHub etc.)
      </Text>
      <Grid
        as="form"
        onSubmit={onSubmit}
        gap={2}
        sx={{
          mt: [null, 2],
          gridTemplateColumns: [null, '1fr auto'],
          textAlign: 'left',
          alignItems: 'end',
          input: { bg: 'sunken' }
        }}
      >
        <div>
          <Input
            type="url"
            name="url"
            id="url"
            placeholder="https://website--prophetorpheus.repl.co"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            sx={{borderRadius: 6 }}
          />
        </div>
        <Button type="submit" sx={{ mt: [2, 0], borderRadius: 6 }}>
          {submitting ? <Loading /> : 'Share'}
        </Button>
      </Grid>
      {error && (
        <Alert variant="primary" sx={{ mt: [2, 3] }}>
          ⚠️ Something went wrong, please try again. 
        </Alert>
      )}
      {done && (
        <Alert variant="primary" sx={{ bg: 'green', mt: [2, 3] }}>
          🚀 Thank you for sharing, we can't wait to check it out!
        </Alert>
      )}
    </Card>
  )
}