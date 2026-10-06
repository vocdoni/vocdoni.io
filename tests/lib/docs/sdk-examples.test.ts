import { toString } from 'mdast-util-to-string'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import remarkDirective from 'remark-directive'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { SKIP, visit } from 'unist-util-visit'
import { describe, expect, it } from 'vitest'

// Every cURL example in the developer docs should sit in a `:::code-tabs` group
// with its TypeScript integrator SDK equivalent, so readers can switch between
// them, or say the SDK does not wrap that endpoint yet.

const DOCS_DIR = path.resolve(__dirname, '../../../content/developers/docs/en')

// Sections whose cURL blocks are deliberately not tabbed with an SDK snippet.
const ALLOWED: Record<string, string> = {
  'quickstart.md#Create a managed organization':
    'the SDK variant lives in "The same flow with TypeScript, C# and Python"',
  'quickstart.md#Add a member': 'see "The same flow with TypeScript, C# and Python"',
  'quickstart.md#Create an all-members group': 'see "The same flow with TypeScript, C# and Python"',
  'quickstart.md#Create a voting process': 'see "The same flow with TypeScript, C# and Python"',
  'quickstart.md#Publish on-chain': 'see "The same flow with TypeScript, C# and Python"',
  'quickstart.md#Read the results': 'see "The same flow with TypeScript, C# and Python"',
  'casting-votes.md#The two rounds':
    'the raw blind exchange; the SDK runs it via signBlindCspBallots in the parent section',
  'casting-votes.md#Doing the signing yourself': 'the raw protocol for clients not using the SDK',
  'casting-votes.md#Casting a multi-question process in one batch':
    'one SDK snippet covers the sign-batch, POST /votes and job-poll cURL calls',
}

const NOT_WRAPPED = /does not wrap this endpoint/

// Fence languages the docs pipeline renders as cURL and TypeScript tabs (TAB_LABELS in lib/docs/pipeline.ts).
const CURL_FENCES = ['bash', 'sh', 'shell', 'curl']
const TS_FENCES = ['ts', 'typescript']

// `curl` counts the cURL code blocks in the section, `tabbed` those sharing a tab group with a TypeScript tab.
type Section = { key: string; curl: number; tabbed: number; notWrapped: boolean }

type Code = { type: 'code'; lang?: string | null; value: string }
const isCurl = (node: Code) => CURL_FENCES.includes(node.lang ?? '') && /\bcurl\b/.test(node.value)
const isTs = (node: Code) => TS_FENCES.includes(node.lang ?? '')

// Parsed with the same remark stack as lib/docs/pipeline.ts, so fences, headings and directives follow it.
const parser = unified().use(remarkParse).use(remarkDirective)

const sectionsOf = (file: string, markdown: string): Section[] => {
  const sections: Section[] = []
  // Anything before the first heading counts as its own section.
  let current: Section = { key: `${file}#`, curl: 0, tabbed: 0, notWrapped: false }
  sections.push(current)
  const tree = parser.parse(markdown.replace(/^---\n[\s\S]*?\n---\n/, ''))
  visit(tree, (node) => {
    if (node.type === 'heading' && node.depth >= 2) {
      current = { key: `${file}#${toString(node).trim()}`, curl: 0, tabbed: 0, notWrapped: false }
      sections.push(current)
    } else if (node.type === 'containerDirective' && node.name === 'code-tabs') {
      const codes = node.children.filter((c): c is Code => c.type === 'code')
      const curls = codes.filter(isCurl).length
      current.curl += curls
      if (codes.some(isTs)) current.tabbed += curls
      return SKIP
    } else if (node.type === 'code' && isCurl(node)) {
      current.curl++
    } else if (node.type === 'paragraph' && NOT_WRAPPED.test(toString(node))) {
      current.notWrapped = true
    }
  })
  return sections
}

// A "does not wrap" note covers a single endpoint, so it stands in for exactly one cURL block.
const unpaired = (s: Section) => s.curl - s.tabbed - (s.notWrapped ? 1 : 0)

const docs = readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md'))
const sections = docs.flatMap((f) => sectionsOf(f, readFileSync(path.join(DOCS_DIR, f), 'utf8')))

describe('developer docs SDK examples', () => {
  it('tabs every cURL example with a TypeScript SDK example', () => {
    const missing = sections.filter((s) => unpaired(s) > 0 && !(s.key in ALLOWED)).map((s) => s.key)
    expect(missing).toEqual([])
  })

  it('keeps the allowlist current', () => {
    const stale = Object.keys(ALLOWED).filter((key) => {
      const section = sections.find((s) => s.key === key)
      return !section || unpaired(section) <= 0
    })
    expect(stale).toEqual([])
  })

  it('splits sections on CommonMark headings, counting cURL blocks tabbed with TypeScript', () => {
    const md = [
      '```shell',
      'curl y',
      '```',
      '## A',
      ':::code-tabs',
      '```bash',
      '# not a heading',
      'curl x',
      '```',
      '```ts',
      'client.x()',
      '```',
      ':::',
      '> ```bash',
      '> curl z',
      '> ```',
      '## B',
      ':::code-tabs[label]',
      '```bash',
      'curl w',
      '```',
      '```python',
      'post()',
      '```',
      ':::',
      '```ts',
      'client.y()',
      '```',
      'The SDK does not wrap this endpoint yet.',
      '   ## C',
      '',
      '    ```bash',
      '    curl u',
      '    ```',
      '',
      '```bash',
      'curl t',
    ].join('\n')
    expect(sectionsOf('f.md', md)).toEqual([
      { key: 'f.md#', curl: 1, tabbed: 0, notWrapped: false },
      // a quoted fence still counts, untabbed
      { key: 'f.md#A', curl: 2, tabbed: 1, notWrapped: false },
      // a TypeScript block outside the group does not pair it
      { key: 'f.md#B', curl: 1, tabbed: 0, notWrapped: true },
      // an indented heading still splits; indented code is not a fence; an unclosed fence runs to the end
      { key: 'f.md#C', curl: 1, tabbed: 0, notWrapped: false },
    ])
  })
})
