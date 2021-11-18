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
		<div className="md-container" style={{padding: "20px"}} dangerouslySetInnerHTML={{ __html: marked.parse(md) }}></div>
	</>
}

const prism_css = `/* PrismJS 1.25.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript */
code[class*=language-],pre[class*=language-]{color:#000;background:0 0;text-shadow:0 1px #fff;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}code[class*=language-] ::-moz-selection,code[class*=language-]::-moz-selection,pre[class*=language-] ::-moz-selection,pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}code[class*=language-] ::selection,code[class*=language-]::selection,pre[class*=language-] ::selection,pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{code[class*=language-],pre[class*=language-]{text-shadow:none}}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:not(pre)>code[class*=language-],pre[class*=language-]{background:#f5f2f0}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#708090}.token.punctuation{color:#999}.token.namespace{opacity:.7}.token.boolean,.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag{color:#905}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#690}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url{color:#9a6e3a;background:hsla(0,0%,100%,.5)}.token.atrule,.token.attr-value,.token.keyword{color:#07a}.token.class-name,.token.function{color:#dd4a68}.token.important,.token.regex,.token.variable{color:#e90}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}
`

const styles = () => {
	const css = `
		${prism_css}
		html,
		body {
		  font-family: "Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
		  margin: none;
		  padding: none;
		  font-weight: 400;
		  font-size: 1.15rem;
		}

		h1 {
		  font-size: 32px;
		  font-weight: 800;
		  margin: 0;
		}

		@media screen and (min-width: 32em) {
		  h1 {
		    font-size: 48px;
		  }
		}

		@media screen and (min-width: 48em) {
		  h1 {
		    font-size: 64px;
		  }
		}

		h2 {
		  font-size: 32px;
		  margin: 0;
		}

		h3 {
		  font-size: 28px;
		  margin: 0;
		}

		h4 {
		  font-size: 20px;
		  margin: 0;
		}

		h5 {
		  font-size: 16px;
		  margin: 0;
		}

		.md-container img {
			width: 300px;
		}

		p {
		    color: var(--text);
		    font-weight: 400;
		    line-height: 1.5;
		    margin-top: 16px;
		    margin-bottom: 16px;
		}

		body {
		  margin: 0;
		}

		a {
			color: var(--primary, #ec3750);
		    -webkit-text-decoration: underline;
		    text-decoration: underline;
		    text-underline-position: under;
		}

		a:hover {
			text-decoration-style: wavy;
		}

		pre {
			font-size: .9rem !important;
		}

		code {
			color: var(--purple);
    		font-size: 1rem;
    		font-family: "SF Mono", "Roboto Mono", Menlo, Consolas, monospace;
		    background-color: var(--sunken);
		    border-radius: 4px;
    		margin-left: 4px;
    		margin-right: 4px;
    		padding-left: 4px;
    		padding-right: 4px;
		}

		/* boxes */

		.container {
		  margin: 3% 8% 3% 8%;
		}

		.box {
		  margin: 0;
		  background-color: #e0e6ed;
		  padding: 16px;
		  border-radius: 12px;
		  word-wrap: break-word;
		  overflow-x: auto;
		}

		/*colors and shadows! */

		:root {
			--darker: #121217;
		    --dark: #17171d;
		    --darkless: #252429;
		    --black: #1f2d3d;
		    --steel: #273444;
		    --slate: #3c4858;
		    --muted: #8492a6;
		    --smoke: #e0e6ed;
		    --snow: #f9fafc;
		    --white: #ffffff;
		    --red: #ec3750;
		    --orange: #ff8c37;
		    --yellow: #f1c40f;
		    --green: #33d6a6;
		    --cyan: #5bc0de;
		    --blue: #338eda;
		    --purple: #a633d6;
		    --twitter: #1da1f2;
		    --facebook: #3b5998;
		    --instagram: #e1306c;
		    --text: #1f2d3d;
		    --background: #ffffff;
		    --elevated: #ffffff;
		    --sheet: #f9fafc;
		    --sunken: #e0e6ed;
		    --border: #e0e6ed;
		    --placeholder: #8492a6;
		    --secondary: #3c4858;
		    --primary: #ec3750;
		    --accent: #338eda;
		 		--text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.125);
		  	--small-shadow: 0 1px 2px rgba(0, 0, 0, 0.0625), 0 2px 4px rgba(0, 0, 0, 0.0625);
		  	--card-shadow: 0 4px 8px rgba(0, 0, 0, 0.125);
		  	--elevated-shadow: 0 1px 2px rgba(0, 0, 0, 0.0625), 0 8px 12px rgba(0, 0, 0, 0.125);
		}

		/* buttons */
		.button-fill {
		  color: var(--white);
		  font-size: 1rem;
		  background-color: var(--primary);
		  padding: 15px 20px 15px 20px;
		  border: none;
		  border-radius: 30px;
		  font-weight: 900;
		}

		.lg-button-fill {
		  color: var(--white);
		  font-size: 1rem;
		  background-color: var(--primary);
		  padding: 20px 30px 20px 30px;
		  border: none;
		  border-radius: 100px;
		  font-weight: 900;
		}

		.button-outline {
		  color: var(--primary);
		  font-size: 1rem;
		  background-color: transparent;
		  padding: 15px 20px 15px 20px;
		  border: 3px solid var(--primary);
		  border-radius: 30px;
		  font-weight: 900;
		}

		.lg-button-outline {
		  color: var(--primary);
		  font-size: 1rem;
		  background-color: transparent;
		  padding: 20px 30px 20px 30px;
		  border: 3px solid var(--primary);
		  border-radius: 40px;
		  font-weight: 900;
		}
	`
	return <style>{css}</style>
}









