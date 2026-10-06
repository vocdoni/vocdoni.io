import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// Every cURL example in the developer docs should come with its TypeScript
// integrator SDK equivalent in the same section, or say the SDK does not wrap
// that endpoint yet.

const DOCS_DIR = path.resolve(__dirname, '../../../content/developers/docs/en')

// Sections whose cURL is deliberately left without an SDK snippet beside it.
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
}

const NOT_WRAPPED = /does not wrap this endpoint/

// Fence languages the docs pipeline renders as cURL and TypeScript tabs (TAB_LABELS in lib/docs/pipeline.ts).
const CURL_FENCES = ['bash', 'sh', 'shell', 'curl']
const TS_FENCES = ['ts', 'typescript']

// `curl` counts the cURL code blocks in the section.
type Section = { key: string; curl: number; ts: boolean; notWrapped: boolean }

const sectionsOf = (file: string, markdown: string): Section[] => {
  const sections: Section[] = []
  // Anything before the first heading counts as its own section.
  let current: Section = { key: `${file}#`, curl: 0, ts: false, notWrapped: false }
  sections.push(current)
  let fence: { marker: string; lang: string; curl: boolean } | undefined
  for (const line of markdown.split('\n')) {
    // Fences may sit inside blockquotes, admonitions or list items.
    const body = line.replace(/^(\s*>)*\s*/, '')
    if (fence === undefined) {
      const open = body.match(/^(`{3,}|~{3,})(\w*)/)
      if (open) {
        fence = { marker: open[1], lang: open[2], curl: false }
        if (TS_FENCES.includes(fence.lang)) current.ts = true
        continue
      }
    } else {
      if (body.startsWith(fence.marker) && body.slice(fence.marker.length).trim() === '') {
        if (fence.curl) current.curl++
        fence = undefined
      } else if (CURL_FENCES.includes(fence.lang) && /\bcurl\b/.test(body)) {
        fence.curl = true
      }
      continue
    }
    const heading = line.match(/^#{2,6}\s+(.*)$/)
    if (heading) {
      current = { key: `${file}#${heading[1].trim()}`, curl: 0, ts: false, notWrapped: false }
      sections.push(current)
    } else if (NOT_WRAPPED.test(line)) {
      current.notWrapped = true
    }
  }
  return sections
}

const docs = readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md'))
const sections = docs.flatMap((f) => sectionsOf(f, readFileSync(path.join(DOCS_DIR, f), 'utf8')))

describe('developer docs SDK examples', () => {
  it('pairs every cURL example with a TypeScript SDK example', () => {
    // A "does not wrap" note covers a single endpoint, so it only exempts a section with one cURL block.
    const missing = sections
      .filter((s) => s.curl > 0 && !s.ts && !(s.notWrapped && s.curl === 1) && !(s.key in ALLOWED))
      .map((s) => s.key)
    expect(missing).toEqual([])
  })

  it('keeps the allowlist current', () => {
    const stale = Object.keys(ALLOWED).filter((key) => {
      const section = sections.find((s) => s.key === key)
      return !section || section.curl === 0 || section.ts
    })
    expect(stale).toEqual([])
  })

  it('splits sections on headings outside code fences, counting every cURL and TypeScript fence', () => {
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
    ].join('\n')
    expect(sectionsOf('f.md', md)).toEqual([
      { key: 'f.md#', curl: 1, ts: false, notWrapped: false },
      { key: 'f.md#A', curl: 2, ts: false, notWrapped: false },
      { key: 'f.md#B', curl: 1, ts: true, notWrapped: true },
    ])
  })
})
