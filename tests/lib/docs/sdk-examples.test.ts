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

type Section = { key: string; curl: boolean; ts: boolean; notWrapped: boolean }

const sectionsOf = (file: string, markdown: string): Section[] => {
  const sections: Section[] = []
  let current: Section | undefined
  let fence: string | undefined
  for (const line of markdown.split('\n')) {
    const open = line.match(/^```(\w*)/)
    if (fence === undefined && open) {
      fence = open[1]
      if (current && fence === 'ts') current.ts = true
      continue
    }
    if (fence !== undefined) {
      if (line.startsWith('```')) fence = undefined
      else if (current && ['bash', 'sh'].includes(fence) && /\bcurl\b/.test(line)) current.curl = true
      continue
    }
    const heading = line.match(/^#{2,6}\s+(.*)$/)
    if (heading) {
      current = { key: `${file}#${heading[1].trim()}`, curl: false, ts: false, notWrapped: false }
      sections.push(current)
    } else if (current && NOT_WRAPPED.test(line)) {
      current.notWrapped = true
    }
  }
  return sections
}

const docs = readdirSync(DOCS_DIR).filter((f) => f.endsWith('.md'))
const sections = docs.flatMap((f) => sectionsOf(f, readFileSync(path.join(DOCS_DIR, f), 'utf8')))

describe('developer docs SDK examples', () => {
  it('pairs every cURL example with a TypeScript SDK example', () => {
    const missing = sections.filter((s) => s.curl && !s.ts && !s.notWrapped && !(s.key in ALLOWED)).map((s) => s.key)
    expect(missing).toEqual([])
  })

  it('keeps the allowlist current', () => {
    const stale = Object.keys(ALLOWED).filter((key) => {
      const section = sections.find((s) => s.key === key)
      return !section || !section.curl || section.ts
    })
    expect(stale).toEqual([])
  })

  it('splits sections on headings outside code fences only', () => {
    const md = ['## A', '```bash', '# not a heading', 'curl x', '```', '## B', '```ts', 'client.x()', '```'].join('\n')
    expect(sectionsOf('f.md', md)).toEqual([
      { key: 'f.md#A', curl: true, ts: false, notWrapped: false },
      { key: 'f.md#B', curl: false, ts: true, notWrapped: false },
    ])
  })
})
