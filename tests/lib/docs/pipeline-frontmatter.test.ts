import { listDocsMeta, loadDoc, parseFrontmatter } from '@/lib/docs/pipeline'
import { afterEach, describe, expect, it, vi } from 'vitest'

const FILES = {
  '/content/developers/docs/en/overview.md': [
    '---',
    'title: Overview',
    'lead: How the pieces fit together.',
    'group: get_started',
    'order: 0',
    'reference:',
    '  title: Where to go next',
    '  columns: 3',
    '  items:',
    '    - title: Quickstart',
    '      description: Run a full election in a few API calls.',
    '      href: /developers/docs/quickstart',
    '      icon: rocket',
    '---',
    '',
    '## Section',
    '',
    'Body.',
    '',
  ].join('\n'),
}

afterEach(() => {
  vi.unstubAllGlobals()
})

// gray-matter casts every input through `Buffer.from()`, so it took the whole
// docs pipeline down in the browser (`ReferenceError: Buffer is not defined`)
// the moment a remote version was selected. Nothing on this path may reach for
// a Node global again.
describe('the docs pipeline without a Buffer global', () => {
  it('loads and compiles a doc with nested frontmatter', () => {
    vi.stubGlobal('Buffer', undefined)

    const doc = loadDoc('overview', 'en', FILES)

    expect(doc?.frontmatter.title).toBe('Overview')
    expect(doc?.frontmatter.reference?.columns).toBe(3)
    expect(doc?.frontmatter.reference?.items[0].href).toBe('/developers/docs/quickstart')
    expect(doc?.html).toContain('<h2')
  })

  it('indexes frontmatter for the navigation', () => {
    vi.stubGlobal('Buffer', undefined)

    expect(listDocsMeta(FILES)).toEqual([
      { slug: 'overview', group: 'get_started', order: 0, titles: { en: 'Overview' } },
    ])
  })
})

describe('parseFrontmatter', () => {
  it('reads a leading yaml block and returns the body after it', () => {
    expect(parseFrontmatter('---\ntitle: A\n---\nbody\n')).toEqual({ data: { title: 'A' }, content: 'body\n' })
  })

  it('tolerates CRLF line endings and a leading BOM', () => {
    expect(parseFrontmatter('---\r\ntitle: A\r\n---\r\nbody\r\n')).toEqual({
      data: { title: 'A' },
      content: 'body\r\n',
    })
    expect(parseFrontmatter('﻿---\ntitle: A\n---\nbody\n')).toEqual({ data: { title: 'A' }, content: 'body\n' })
  })

  it('returns the source untouched when there is no frontmatter', () => {
    expect(parseFrontmatter('# Title\n\nbody\n')).toEqual({ data: {}, content: '# Title\n\nbody\n' })
    expect(parseFrontmatter('')).toEqual({ data: {}, content: '' })
  })

  it('does not mistake a horizontal rule for an opening delimiter', () => {
    expect(parseFrontmatter('----\nbody\n')).toEqual({ data: {}, content: '----\nbody\n' })
  })

  it('treats an empty or comment-only block as no data', () => {
    expect(parseFrontmatter('---\n\n---\nbody\n')).toEqual({ data: {}, content: 'body\n' })
    expect(parseFrontmatter('---\n# note\n---\nbody\n')).toEqual({ data: {}, content: 'body\n' })
  })

  it('falls back to no data instead of throwing on malformed yaml', () => {
    expect(parseFrontmatter('---\ntitle: "unterminated\n  bad: [1, 2\n---\nbody\n')).toEqual({
      data: {},
      content: 'body\n',
    })
  })

  it('ignores scalar and sequence frontmatter, which has no fields to read', () => {
    expect(parseFrontmatter('---\njust a string\n---\nbody\n')).toEqual({ data: {}, content: 'body\n' })
    expect(parseFrontmatter('---\n- one\n- two\n---\nbody\n')).toEqual({ data: {}, content: 'body\n' })
  })
})
