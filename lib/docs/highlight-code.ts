import { toHtml } from 'hast-util-to-html'
import { common, createLowlight } from 'lowlight'

// Server-only syntax highlighter for code samples that are NOT markdown docs
// (e.g. the landing hero's <CodeBlock>). Runs at build/prerender so lowlight
// never reaches the client bundle; the output is hljs-classed HTML styled by
// the shared theme in layouts/style.css (same engine as the docs pipeline,
// which uses rehype-highlight). For markdown bodies use lib/docs/markdown.ts.

const lowlight = createLowlight(common)

// Returns the inner HTML for a `<code class="hljs">`: hljs token spans for a
// known language, or plain (escaped) text otherwise.
export function highlightCode(code: string, lang: string): string {
  const tree =
    lang && lowlight.registered(lang)
      ? lowlight.highlight(lang, code)
      : { type: 'root' as const, children: [{ type: 'text' as const, value: code }] }
  return toHtml(tree)
}
