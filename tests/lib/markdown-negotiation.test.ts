import { describe, expect, it } from 'vitest'

import { markdownTwinFor, mergeVary, parseAcceptHeader, prefersMarkdown } from '@/lib/markdown-negotiation'
import { locales } from '@/locales'

const twin = (pathname: string) => markdownTwinFor(pathname, locales)

describe('parseAcceptHeader', () => {
  it('keeps header order and defaults q to 1', () => {
    expect(parseAcceptHeader('text/markdown, text/html')).toEqual([
      { type: 'text/markdown', quality: 1, specificity: 2, index: 0 },
      { type: 'text/html', quality: 1, specificity: 2, index: 1 },
    ])
  })

  it('reads q-values, lowercases and trims, and ignores other parameters', () => {
    expect(parseAcceptHeader(' TEXT/Markdown ;charset=utf-8; q=0.7 ')).toEqual([
      { type: 'text/markdown', quality: 0.7, specificity: 2, index: 0 },
    ])
  })

  it('scores wildcard ranges by specificity', () => {
    expect(parseAcceptHeader('*/*;q=0.8, text/*;q=0.9').map((e) => e.specificity)).toEqual([0, 1])
  })

  it('clamps out-of-range q-values and falls back to 1 when unparsable', () => {
    expect(parseAcceptHeader('text/markdown;q=5').map((e) => e.quality)).toEqual([1])
    expect(parseAcceptHeader('text/markdown;q=-2').map((e) => e.quality)).toEqual([0])
    expect(parseAcceptHeader('text/markdown;q=nope').map((e) => e.quality)).toEqual([1])
  })

  it('drops empty and malformed entries', () => {
    expect(parseAcceptHeader('')).toEqual([])
    expect(parseAcceptHeader(null)).toEqual([])
    expect(parseAcceptHeader('text/markdown, , markdown')).toHaveLength(1)
  })
})

describe('prefersMarkdown', () => {
  it('accepts an explicit markdown-only request', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true)
  })

  it('does not trigger on a wildcard Accept (curl default) or a missing header', () => {
    expect(prefersMarkdown('*/*')).toBe(false)
    expect(prefersMarkdown('text/*')).toBe(false)
    expect(prefersMarkdown(null)).toBe(false)
    expect(prefersMarkdown('')).toBe(false)
  })

  it('does not trigger on a real browser Accept header', () => {
    const chrome = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
    expect(prefersMarkdown(chrome)).toBe(false)
    expect(prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')).toBe(false)
  })

  it('respects q-value precedence between markdown and html', () => {
    expect(prefersMarkdown('text/html;q=0.9, text/markdown')).toBe(true)
    expect(prefersMarkdown('text/markdown;q=0.5, text/html')).toBe(false)
    expect(prefersMarkdown('text/markdown;q=0.9, text/html;q=0.8')).toBe(true)
  })

  it('lets a wildcard stand in for html', () => {
    expect(prefersMarkdown('text/markdown;q=0.5, */*')).toBe(false)
    expect(prefersMarkdown('text/markdown, */*;q=0.1')).toBe(true)
  })

  it('breaks a q-value tie by specificity, then by header order', () => {
    // Explicitly naming markdown beats a wildcard of the same quality.
    expect(prefersMarkdown('*/*, text/markdown')).toBe(true)
    // Two concrete types at the same quality: the one listed first wins.
    expect(prefersMarkdown('text/markdown, text/html')).toBe(true)
    expect(prefersMarkdown('text/html, text/markdown')).toBe(false)
  })

  it('ignores markdown offered at q=0', () => {
    expect(prefersMarkdown('text/markdown;q=0')).toBe(false)
    expect(prefersMarkdown('text/markdown;q=0, text/html;q=0')).toBe(false)
  })
})

describe('markdownTwinFor', () => {
  it('maps the docs overview', () => {
    expect(twin('/en/developers/docs')).toBe('/en/developers/docs.md')
  })

  it('maps a docs page', () => {
    expect(twin('/en/developers/docs/quickstart')).toBe('/en/developers/docs/quickstart.md')
  })

  it('maps a blog post', () => {
    expect(twin('/en/blog/hello-world')).toBe('/en/blog/hello-world.md')
  })

  it('handles every served locale, including the hyphenated one', () => {
    for (const locale of locales) {
      expect(twin(`/${locale}/blog/post`)).toBe(`/${locale}/blog/post.md`)
    }
    expect(twin('/pt-br/developers/docs')).toBe('/pt-br/developers/docs.md')
  })

  it('rejects an unknown locale segment', () => {
    expect(twin('/zz/blog/post')).toBeNull()
    expect(twin('/blog/post')).toBeNull()
    expect(twin('/developers/docs')).toBeNull()
  })

  it('tolerates trailing slashes and query strings', () => {
    expect(twin('/en/blog/post/')).toBe('/en/blog/post.md')
    expect(twin('/en/developers/docs/')).toBe('/en/developers/docs.md')
    expect(twin('/en/blog/post?utm_source=x')).toBe('/en/blog/post.md')
    expect(twin('/en/blog/post#anchor')).toBe('/en/blog/post.md')
  })

  it('returns null for pages with no markdown twin', () => {
    expect(twin('/en/about-us')).toBeNull()
    expect(twin('/en')).toBeNull()
    expect(twin('/')).toBeNull()
    expect(twin('/en/blog')).toBeNull()
    expect(twin('/en/blog/category/governance')).toBeNull()
    expect(twin('/en/developers')).toBeNull()
    expect(twin('/en/developers/docs/nested/deep')).toBeNull()
    expect(twin('/en/solutions/associations')).toBeNull()
  })

  it('never negotiates a twin again, so fetching it cannot loop', () => {
    expect(twin('/en/blog/post.md')).toBeNull()
    expect(twin('/en/developers/docs.md')).toBeNull()
    expect(twin('/en/developers/docs/quickstart.md')).toBeNull()
  })

  it('rejects traversal and non-absolute paths', () => {
    expect(twin('/en/blog/../../etc/passwd')).toBeNull()
    expect(twin('en/blog/post')).toBeNull()
    expect(twin('/en//blog/post')).toBeNull()
  })
})

describe('mergeVary', () => {
  it('adds Accept when there is nothing to preserve', () => {
    expect(mergeVary(null, 'Accept')).toBe('Accept')
    expect(mergeVary('', 'Accept')).toBe('Accept')
  })

  it('keeps what Netlify already set', () => {
    // Clobbering this is the bug: caches would stop varying on encoding.
    expect(mergeVary('Accept-Encoding', 'Accept')).toBe('Accept-Encoding, Accept')
    expect(mergeVary('Accept-Encoding, Cookie', 'Accept')).toBe('Accept-Encoding, Cookie, Accept')
  })

  it('does not duplicate a field that is already listed, whatever its case', () => {
    expect(mergeVary('Accept', 'Accept')).toBe('Accept')
    expect(mergeVary('accept', 'Accept')).toBe('accept')
    expect(mergeVary('Accept-Encoding, accept', 'Accept')).toBe('Accept-Encoding, accept')
  })

  it('leaves a wildcard alone, since it already covers everything', () => {
    expect(mergeVary('*', 'Accept')).toBe('*')
  })
})
