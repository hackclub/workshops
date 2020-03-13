import { BaseStyles } from 'theme-ui'
import styled from '@emotion/styled'

export const Styled = styled(BaseStyles)`
  font-size: 1.25rem;

  a {
    word-break: break-word;
  }

  .heading a {
    color: inherit;
    text-decoration: none;
  }
`

const Content = ({ html }) => (
  <Styled
    as="article"
    className="docs"
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export default Content
