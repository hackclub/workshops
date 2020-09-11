import { BaseStyles } from 'theme-ui'
import theme from '@hackclub/theme'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown/with-html'

export const Styled = styled(BaseStyles)`
  font-size: 1.25rem;

  a {
    word-break: break-word;
  }

  .heading a {
    color: inherit;
    text-decoration: none;
  }

  @media print {
    font-size: 1rem;
    color: black;

    pre,
    code,
    pre code span {
      background-color: ${theme.colors.snow};
      color: black;
      font-size: 1rem !important;
    }

    a {
      color: ${theme.colors.blue};
    }
    a::after {
      content: ' (' attr(href) ') ';
    }

    .red {
      color: red;
    }
  }
`

const Content = ({ html }) => (
  <Styled
    as="article"
    className="docs"
    //dangerouslySetInnerHTML={{ __html: html }}
  >
    <ReactMarkdown source={html} escapeHtml={false} />
  </Styled>
)

export default Content
