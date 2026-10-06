import { toString } from 'mdast-util-to-string'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { SKIP, visit } from 'unist-util-visit'
import { describe, expect, it } from 'vitest'

import { parseFrontmatter, TAB_LABELS } from '@/lib/docs/pipeline'

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
// A paragraph holding only an admonition marker line, like `[!NOTE] Not in the SDK yet`.
const ADMONITION_TITLE = /^\[![A-Z]+\][^\n]*$/

// Fence languages the docs pipeline renders as cURL and TypeScript tabs.
const fencesLabelled = (label: string) => Object.keys(TAB_LABELS).filter((lang) => TAB_LABELS[lang] === label)
const CURL_FENCES = fencesLabelled('cURL')
const TS_FENCES = fencesLabelled('TypeScript')

// Per section: `curl` counts the cURL code blocks, `tabbed` those sharing a tab group with a TypeScript tab,
// and `excused` those a "does not wrap" note right after them covers. `strayNotes` counts notes with no
// untabbed cURL block before them to cover - left behind once the endpoint got an SDK snippet.
type Section = { key: string; curl: number; tabbed: number; excused: number; strayNotes: number }

type Code = { type: 'code'; lang?: string | null; value: string }
const isCurl = (node: Code) => CURL_FENCES.includes(node.lang ?? '') && /\bcurl\b/.test(node.value)
const isTs = (node: Code) => TS_FENCES.includes(node.lang ?? '')

// Parsed with the syntax plugins of lib/docs/pipeline.ts (its other remark plugins only transform the tree),
// so fences, headings, tables and directives read the same way.
const parser = unified().use(remarkParse).use(remarkGfm).use(remarkDirective)

// Response samples may sit between a cURL block and the note that covers it.
const SAMPLE_FENCES = ['json', 'jsonc']

const sectionsOf = (file: string, markdown: string): Section[] => {
  const sections: Section[] = []
  // Anything before the first heading counts as its own section.
  const section = (key: string): Section => ({ key, curl: 0, tabbed: 0, excused: 0, strayNotes: 0 })
  let current = section(`${file}#`)
  sections.push(current)
  // Untabbed cURL blocks right before this point (response samples may follow them) that "does not wrap"
  // notes may still cover, one block per note. Any other content in between ends it, so a note only covers
  // the cURL block it sits right after.
  let awaitingNotes = 0
  visit(parser.parse(parseFrontmatter(markdown).content), (node) => {
    if (node.type === 'heading' && node.depth >= 2) {
      current = section(`${file}#${toString(node).trim()}`)
      sections.push(current)
      awaitingNotes = 0
    } else if (node.type === 'containerDirective' && node.name === 'code-tabs') {
      const codes = node.children.filter((c): c is Code => c.type === 'code')
      const curls = codes.filter(isCurl).length
      current.curl += curls
      if (codes.some(isTs)) current.tabbed += curls
      awaitingNotes = codes.some(isTs) ? 0 : curls
      return SKIP
    } else if (node.type === 'code') {
      if (isCurl(node)) {
        current.curl++
        awaitingNotes = 1
      } else if (!SAMPLE_FENCES.includes(node.lang ?? '')) awaitingNotes = 0
    } else if (node.type === 'paragraph' && NOT_WRAPPED.test(toString(node))) {
      if (awaitingNotes > 0) {
        current.excused++
        awaitingNotes--
      } else current.strayNotes++
    } else if (node.type === 'paragraph' && ADMONITION_TITLE.test(toString(node))) {
      // the title line of an admonition whose body holds the note
    } else if (['paragraph', 'table', 'list', 'thematicBreak', 'html'].includes(node.type)) {
      awaitingNotes = 0
    }
  })
  return sections
}

const unpaired = (s: Section) => s.curl - s.tabbed - s.excused

const docs = readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md'))
const sections = docs.flatMap((f) => sectionsOf(f, readFileSync(path.join(DOCS_DIR, f), 'utf8')))

describe('developer docs SDK examples', () => {
  it('tabs every cURL example with a TypeScript SDK example', () => {
    const missing = sections.filter((s) => unpaired(s) > 0 && !(s.key in ALLOWED)).map((s) => s.key)
    expect(missing).toEqual([])
  })

  it('places every "does not wrap" note right after the cURL block it covers', () => {
    expect(sections.filter((s) => s.strayNotes > 0).map((s) => s.key)).toEqual([])
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
      '---',
      'title: T',
      '---',
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
      '',
      'The SDK does not wrap this endpoint either.',
      '## D',
      '```bash',
      'curl -X POST $B/processes',
      '```',
      '```jsonc',
      '{ "processId": "..." }',
      '```',
      'An unrelated paragraph.',
      '',
      'The SDK does not wrap this endpoint yet.',
      '## E',
      '```bash',
      'curl -X DELETE $B/processes/x/census',
      '```',
      '```jsonc',
      '{ "removed": 2 }',
      '```',
      '> [!NOTE] Not in the SDK yet',
      '> The SDK does not wrap this endpoint yet.',
      '## F',
      '```bash',
      'curl f',
      '```',
      '---',
      'The SDK does not wrap this endpoint yet.',
      '## G',
      '```bash',
      'curl g',
      '```',
      '',
      '<!-- unrelated -->',
      '',
      'The SDK does not wrap this endpoint yet.',
      '## H',
      '```bash',
      'curl h',
      '```',
      '> [!NOTE] Not in the SDK yet',
      '>',
      '> The SDK does not wrap this endpoint yet.',
      '## I',
      ':::code-tabs',
      '```bash',
      'curl i1',
      '```',
      '```sh',
      'curl i2',
      '```',
      ':::',
      '',
      'The SDK does not wrap this endpoint yet.',
      '',
      'The SDK does not wrap this endpoint (the second one) either.',
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
      { key: 'f.md#', curl: 1, tabbed: 0, excused: 0, strayNotes: 0 },
      // a quoted fence still counts, untabbed
      { key: 'f.md#A', curl: 2, tabbed: 1, excused: 0, strayNotes: 0 },
      // a TypeScript block outside the group does not pair it, and the notes after it are not adjacent
      { key: 'f.md#B', curl: 1, tabbed: 0, excused: 0, strayNotes: 2 },
      // a note only covers the cURL block it sits right after (response samples may come between)
      { key: 'f.md#D', curl: 1, tabbed: 0, excused: 0, strayNotes: 1 },
      { key: 'f.md#E', curl: 1, tabbed: 0, excused: 1, strayNotes: 0 },
      // a thematic break or raw HTML in between also breaks adjacency
      { key: 'f.md#F', curl: 1, tabbed: 0, excused: 0, strayNotes: 1 },
      { key: 'f.md#G', curl: 1, tabbed: 0, excused: 0, strayNotes: 1 },
      // an admonition title on its own line does not
      { key: 'f.md#H', curl: 1, tabbed: 0, excused: 1, strayNotes: 0 },
      // a group of several untabbed cURL blocks takes one note per block
      { key: 'f.md#I', curl: 2, tabbed: 0, excused: 2, strayNotes: 0 },
      // an indented heading still splits; indented code is not a fence; an unclosed fence runs to the end
      { key: 'f.md#C', curl: 1, tabbed: 0, excused: 0, strayNotes: 0 },
    ])
  })
})
