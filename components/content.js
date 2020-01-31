import { memo } from 'react'
import { Box } from 'theme-ui'

const areEqual = (prevProps, props) => prevProps.path === props.path

const Content = ({ path, html }) => (
  <>
    <Box
      as="article"
      className="docs"
      dangerouslySetInnerHTML={{ __html: html }}
    />
    <style jsx global>{`
      img,
      a {
        max-width: 100%;
      }
      .docs h1,
      .docs h2,
      .docs h3 {
        margin: 0;
      }
      .docs a {
        color: #0074de;
        text-decoration: none;
        transition: color 0.2s ease;
      }
      .docs a:hover {
        color: #68b5fb;
      }
      code {
        font-size: 0.9em;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
          DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
          serif;
      }
      code:before,
      code:after {
        content: '\`';
      }
      pre code:before,
      pre code:after {
        content: none;
      }

      code[class*='language-'],
      pre[class*='language-'] {
        color: #f8f8f2;
        text-shadow: 0 1px rgba(0, 0, 0, 0.3);
        direction: ltr;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        line-height: 1.5;
        tab-size: 4;
        hyphens: none;
      }
      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: #7c7c7c;
      }
      .token.punctuation {
        color: #c5c8c6;
      }
      .namespace {
        opacity: 0.7;
      }
      .token.property,
      .token.keyword,
      .token.tag {
        color: #96cbfe;
      }
      .token.class-name {
        color: #ffffb6;
      }
      .token.boolean,
      .token.constant {
        color: #99cc99;
      }
      .token.symbol,
      .token.deleted {
        color: #f92672;
      }
      .token.number {
        color: #ff73fd;
      }
      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin,
      .token.inserted {
        color: #a8ff60;
      }
      .token.variable {
        color: #c6c5fe;
      }
      .token.operator {
        color: #ededed;
      }
      .token.entity {
        color: #ffffb6;
        cursor: help;
      }
      .token.url {
        color: #96cbfe;
      }
      .language-css .token.string,
      .style .token.string {
        color: #87c38a;
      }
      .token.atrule,
      .token.attr-value {
        color: #f9ee98;
      }
      .token.function {
        color: #dad085;
      }
      .token.regex {
        color: #e9c062;
      }
      .token.important {
        color: #fd971f;
      }
      .token.important,
      .token.bold {
        font-weight: bold;
      }
      .token.italic {
        font-style: italic;
      }

      .docs {
        font-size: 1.25rem;
      }

      /* Headings */
      .docs h1 {
        font-size: 3rem;
        font-weight: 700;
      }
      .docs h2 {
        font-size: 2rem;
      }
      .docs h3 {
        font-size: 1.5rem;
      }
      .docs h4 {
        font-size: 1.2rem;
      }
      .docs h5 {
        font-size: 1rem;
      }
      .docs .heading {
        margin: 3.5rem 0 2rem 0;
        font-weight: 600;
      }
      .docs .heading > span[id] {
        display: block;
        position: absolute;
        visibility: hidden;
        margin-top: -128px;
        padding-top: 128px;
      }
      .docs .heading > a {
        color: inherit;
      }
      .docs .heading > a:hover {
        color: inherit;
        border-bottom: 1px dotted;
      }
      .docs .heading > a:hover ~ .permalink {
        visibility: visible;
      }
      .docs .heading > .permalink {
        visibility: hidden;
        display: none;
      }

      @media (min-width: 992px) {
        .docs .heading > a {
          margin-right: 0.5rem;
        }
        .docs .heading > .permalink {
          display: inline-block;
        }
      }

      .docs p {
        margin: 1.25rem 0;
      }

      /* Inline code */
      .docs code.inline {
        color: rgb(212, 0, 255);
        font-size: 0.9em;
        white-space: pre-wrap;
        transition: color 0.2s ease;
      }

      /* Code */
      .docs pre {
        background: #1d1f21;
        white-space: pre;
        overflow: auto;
        padding: 1.5rem;
        margin: 1.5rem 0;
        border-radius: 3px;
        -webkit-overflow-scrolling: touch;
      }
      .docs pre > code {
        font-size: 14px;
        line-height: 20px;
      }

      /* Links */
      .docs a.absolute > code.inline {
        color: #0074de;
      }
      .docs a.absolute:hover > code.inline {
        color: #68b5fb;
      }
      .docs a.relative {
        color: inherit;
        font-size: inherit;
        border-bottom: 1px dotted;
      }
      .docs a.relative:hover {
        color: gray;
        text-decoration: none;
      }
      .docs a.relative:hover > code.inline {
        color: gray;
      }

      /* details */
      .docs details {
        margin: 1.5rem 0;
        padding: 0.5rem 1rem;
        background: #fafafa;
        border: 1px solid #eaeaea;
        border-radius: 3px;
      }
      .docs details[open] {
        overflow: hidden;
      }
      .docs details > summary {
        font-weight: 500;
        outline: none;
        cursor: pointer;
      }

      /* Quotes */
      .docs blockquote {
        color: #666666;
        background: #fafafa;
        border: 1px solid #eaeaea;
        border-radius: 3px;
        padding: 1rem 1.25rem;
        margin: 1.5rem 0;
      }
      .docs blockquote p {
        margin: 0;
      }

      /* Card */
      .docs .card {
        margin: 1.5rem 0;
        border-radius: 5px;
        border: 1px solid #eaeaea;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        transition: box-shadow 0.2s ease;
      }
      .docs .card:hover {
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
      }
      .docs .card > a {
        display: flex;
        flex-direction: column;
        width: 100%;
        color: #666666;
        padding: 1.5rem;
        border: none;
        transition: color 0.2s ease;
      }
      .docs .card > a:hover {
        color: #111;
      }
      .docs .card > a > h4 {
        font-size: 1rem;
        font-weight: 600;
        color: #111;
        margin-top: 0;
        margin-bottom: 0.25rem;
      }
      .docs .card > a > small {
        font-size: 0.875rem;
        color: inherit;
      }

      /* Misc */
      .docs hr {
        border: 0;
        border-top: 1px solid #eaeaea;
        margin: 1.25rem 0;
      }
      .docs ul,
      .docs ol {
        padding-left: 1.5rem;
        margin: 1.25rem 0;
      }
      .docs ul {
        list-style-type: none;
      }
      .docs li {
        margin-bottom: 0.625rem;
      }
      .docs ul :global(li:before) {
        content: '-';
        color: #999999;
        position: absolute;
        margin-left: -1rem;
      }
    `}</style>
  </>
)

export default memo(Content, areEqual)
