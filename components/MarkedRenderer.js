import { marked } from "marked";
const prism = require('prismjs')

marked.setOptions({
  highlight: (code, lang) => {
    if(prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang)
    } else {
      return code
    }
  }
})

export default function MarkedRenderer({ md }) {
	return <>
		{styles()}
		<div className="md-container" dangerouslySetInnerHTML={{ __html: marked.parse(md) }}></div>
	</>
}

const prism_css = `/* PrismJS 1.25.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript */
code[class*='language-'], pre[class*='language-'] {color: #000;background: 0 0;font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;font-size: 1em;text-align: left;white-space: pre;word-spacing: normal;word-break: normal;word-wrap: normal;line-height: 1.5;-moz-tab-size: 4;-o-tab-size: 4;tab-size: 4;-webkit-hyphens: none;-moz-hyphens: none;-ms-hyphens: none;hyphens: none;}code[class*='language-'] ::-moz-selection, code[class*='language-']::-moz-selection, pre[class*='language-'] ::-moz-selection, pre[class*='language-']::-moz-selection {text-shadow: none;background: #b3d4fc;}code[class*='language-'] ::selection, code[class*='language-']::selection, pre[class*='language-'] ::selection, pre[class*='language-']::selection {text-shadow: none;background: #b3d4fc;}@media print {code[class*='language-'], pre[class*='language-'] {text-shadow: none;}}pre[class*='language-'] {padding: 1em;margin: 0.5em 0;overflow: auto;}:not(pre) > code[class*='language-'], pre[class*='language-'] {background: #f5f2f0;}:not(pre) > code[class*='language-'] {padding: 0.1em;border-radius: 0.3em;white-space: normal;}.token.cdata, .token.comment, .token.doctype, .token.prolog {color: #708090;}.token.punctuation {color: #999;}.token.namespace {opacity: 0.7;}.token.boolean, .token.constant, .token.deleted, .token.number, .token.property, .token.symbol, .token.tag {color:var(--theme-ui-colors-red);}.token.attr-name, .token.builtin, .token.char, .token.inserted, .token.selector, .token.string {color:  var(--theme-ui-colors-purple);}.language-css .token.string, .style .token.string, .token.entity, .token.operator, .token.url {color: #9a6e3a;}.token.atrule, .token.attr-value, .token.keyword {color: var(--theme-ui-colors-blue);}.token.class-name, .token.function {color: var(--theme-ui-colors-cyan);}.token.important, .token.regex, .token.variable {color: var(--theme-ui-colors-orange);}.token.bold, .token.important {font-weight: 700;}.token.italic {font-style: italic;}.token.entity {cursor: help;}
`

const styles = () => {
	const css = `
		${prism_css}
		.md-container {
		  font-size: 1.25rem;
			margin-top: -16px;
		}

		.md-container h1 {
		  font-size: 32px;
		  font-weight: 800;
		  margin: 0;
		}

		@media screen and (min-width: 32em) {
		  .md-container h1 {
		    font-size: 48px;
		  }
		}

		@media screen and (min-width: 48em) {
		  .md-container h1 {
		    font-size: 64px;
		  }
		}

		.md-container h2 {
		  font-size: 32px;
		  margin: 0;
		}

		.md-container h3 {
		  font-size: 28px;
		  margin: 0;
		}

		.md-container h4 {
		  font-size: 20px;
		  margin: 0;
		}

		.md-container h5 {
		  font-size: 16px;
		  margin: 0;
		}

		.md-container img {
			width: 100%;
		}

		p {
		    color: var(--text);
		    font-weight: 400;
		    line-height: 1.5;
		    margin-top: 16px;
		    margin-bottom: 16px;
		}

		.md-container a {
			color: var(--primary, #ec3750);
		    -webkit-text-decoration: underline;
		    text-decoration: underline;
		    text-underline-position: under;
		}

		.md-container a:hover {
			text-decoration-style: wavy;
		}

		.md-container pre {
			font-family: "SF Mono", "Roboto Mono", Menlo, Consolas, monospace;
	    font-size: 16px;
	    padding: 16px;
	    color: var(--theme-ui-colors-text);
	    background-color: var(--theme-ui-colors-sunken);
	    overflow: auto;
	    border-radius: 8px;
		}

		.md-container code {
			color: var(--theme-ui-colors-purple);
			font-size: 1rem;
			font-family: "SF Mono", "Roboto Mono", Menlo, Consolas, monospace;
			background-color: var(--theme-ui-colors-sunken);
			border-radius: 4px;
			margin-left: 4px;
			margin-right: 4px;
			padding-left: 4px;
			padding-right: 4px;
		}
	`
	return <style jsx>{css}</style>
}









