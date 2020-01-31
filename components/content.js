import { memo } from 'react'
import { BaseStyles } from 'theme-ui'
import styled from '@emotion/styled'

const areEqual = (prevProps, props) => prevProps.path === props.path

const StyledContent = styled(BaseStyles)`
  font-size: 1.25rem;

  a {
    word-break: break-word;
  }

  .heading a {
    color: inherit;
    text-decoration: none;
  }
`

const Content = ({ path, html }) => (
  <StyledContent
    as="article"
    className="docs"
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export default memo(Content, areEqual)
