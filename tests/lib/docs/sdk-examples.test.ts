import { toString } from 'mdast-util-to-string'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import remarkDirective from 'remark-directive'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { describe, expect, it } from 'vitest'

// Every cURL example in the developer docs should come with its TypeScript
// integrator SDK equivalent in the same section, or say the SDK does not wrap
// that endpoint yet.

const DOCS_DIR = path.resolve(__dirname, '../../../content/developers/docs/en')

// Sections whose cURL blocks deliberately outnumber the SDK snippets beside them.
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

// `curl` and `ts` count the cURL and TypeScript code blocks in the section.
type Section = { key: string; curl: number; ts: number; notWrapped: boolean }

// Parsed with the same remark stack as lib/docs/pipeline.ts, so fences and headings follow CommonMark.
const parser = unified().use(remarkParse).use(remarkDirective)

const sectionsOf = (file: string, markdown: string): Section[] => {
  const sections: Section[] = []
  // Anything before the first heading counts as its own section.
  let current: Section = { key: `${file}#`, curl: 0, ts: 0, notWrapped: false }
  sections.push(current)
  const tree = parser.parse(markdown.replace(/^---\n[\s\S]*?\n---\n/, ''))
  visit(tree, (node) => {
    if (node.type === 'heading' && node.depth >= 2) {
      current = { key: `${file}#${toString(node).trim()}`, curl: 0, ts: 0, notWrapped: false }
      sections.push(current)
    } else if (node.type === 'code') {
      if (TS_FENCES.includes(node.lang ?? '')) current.ts++
      else if (CURL_FENCES.includes(node.lang ?? '') && /\bcurl\b/.test(node.value)) current.curl++
    } else if (node.type === 'paragraph' && NOT_WRAPPED.test(toString(node))) {
      current.notWrapped = true
    }
  })
  return sections
}

const docs = readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md'))
const sections = docs.flatMap((f) => sectionsOf(f, readFileSync(path.join(DOCS_DIR, f), 'utf8')))

describe('developer docs SDK examples', () => {
  it('pairs every cURL example with a TypeScript SDK example', () => {
    // One SDK snippet per cURL block; a "does not wrap" note stands in for exactly one of them.
    const missing = sections
      .filter((s) => s.ts + (s.notWrapped ? 1 : 0) < s.curl && !(s.key in ALLOWED))
      .map((s) => s.key)
    expect(missing).toEqual([])
  })

  it('keeps the allowlist current', () => {
    const stale = Object.keys(ALLOWED).filter((key) => {
      const section = sections.find((s) => s.key === key)
      return !section || section.ts + (section.notWrapped ? 1 : 0) >= section.curl
    })
    expect(stale).toEqual([])
  })

  it('splits sections on CommonMark headings, counting every cURL and TypeScript code block', () => {
    const md = [
      '```shell',
      'curl y',
      '```',
      '## A',
      '```bash',
      '# not a heading',
      'curl x',
      '```',
      '> ```bash',
      '> curl z',
      '> ```',
      '## B',
      '~~~typescript',
      'client.x()',
      '~~~',
      '````sh',
      '```',
      'curl w',
      '````',
      'The SDK does not wrap this endpoint yet.',
      '## C',
      '```bash',
      'curl v',
      '````',
      '## D',
      '   ## E',
      '',
      '    ```bash',
      '    curl u',
      '    ```',
      '',
      '```bash',
      'curl t',
    ].join('\n')
    expect(sectionsOf('f.md', md)).toEqual([
      { key: 'f.md#', curl: 1, ts: 0, notWrapped: false },
      { key: 'f.md#A', curl: 2, ts: 0, notWrapped: false },
      { key: 'f.md#B', curl: 1, ts: 1, notWrapped: true },
      { key: 'f.md#C', curl: 1, ts: 0, notWrapped: false },
      { key: 'f.md#D', curl: 0, ts: 0, notWrapped: false },
      // an indented heading still splits; indented code is not a fence; an unclosed fence runs to the end
      { key: 'f.md#E', curl: 1, ts: 0, notWrapped: false },
    ])
  })
})
