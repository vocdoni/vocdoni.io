import { describe, expect, it } from 'vitest'
import { withTrailingSlash } from '@/lib/url-form'

describe('withTrailingSlash', () => {
  it('leaves the root unchanged', () => {
    expect(withTrailingSlash('/')).toBe('/')
  })

  it('appends a slash to a simple path', () => {
    expect(withTrailingSlash('/en/pricing')).toBe('/en/pricing/')
  })

  it('appends a slash to a nested path', () => {
    expect(withTrailingSlash('/en/solutions/associations')).toBe('/en/solutions/associations/')
  })

  it('is idempotent: does not double-slash an already-slashed path', () => {
    expect(withTrailingSlash('/en/pricing/')).toBe('/en/pricing/')
  })

  it('places the slash before a query string', () => {
    expect(withTrailingSlash('/en/pricing?q=1')).toBe('/en/pricing/?q=1')
  })

  it('places the slash before a hash fragment', () => {
    expect(withTrailingSlash('/en/pricing#hero')).toBe('/en/pricing/#hero')
  })

  it('places the slash before a combined query and hash', () => {
    expect(withTrailingSlash('/en/pricing?q=1#hero')).toBe('/en/pricing/?q=1#hero')
  })

  it('does not add a slash to a path ending in .md', () => {
    expect(withTrailingSlash('/en/developers/docs.md')).toBe('/en/developers/docs.md')
  })

  it('does not add a slash to a path ending in .xml', () => {
    expect(withTrailingSlash('/sitemap.xml')).toBe('/sitemap.xml')
  })

  it('leaves external http URLs unchanged', () => {
    expect(withTrailingSlash('https://example.com/page')).toBe('https://example.com/page')
  })

  it('leaves external https URLs unchanged', () => {
    expect(withTrailingSlash('https://vocdoni.io/en/app')).toBe('https://vocdoni.io/en/app')
  })

  it('handles locale-only paths', () => {
    expect(withTrailingSlash('/en')).toBe('/en/')
  })

  it('adds a slash to a slug that contains a dot but does not end in a file extension', () => {
    expect(withTrailingSlash('/en/blog/app-2.3-release')).toBe('/en/blog/app-2.3-release/')
  })

  it('does not add a slash to a blog post filename with .md extension', () => {
    expect(withTrailingSlash('/en/blog/post.md')).toBe('/en/blog/post.md')
  })

  it('does not add a slash to .webp image paths', () => {
    expect(withTrailingSlash('/images/a.webp')).toBe('/images/a.webp')
  })
})
