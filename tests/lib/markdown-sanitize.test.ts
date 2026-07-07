import { describe, expect, it } from 'vitest'
import { compile } from '@/lib/docs/markdown'

// The markdown pipeline runs with `allowDangerousHtml` so our own plugins can
// inject trusted SVG icons. These tests lock in that author-supplied content
// cannot ride that passthrough into a persistent XSS (see rehypeSanitizeSource).
describe('compile — source HTML sanitization', () => {
  it('escapes literal <script> blocks instead of emitting them', () => {
    const html = compile('<script>alert(1)</script>')
    expect(html).not.toContain('<script>')
    expect(html).not.toContain('</script>')
  })

  it('escapes inline raw HTML so no live tag (and thus no event handler) renders', () => {
    const html = compile('before <img src=x onerror=alert(1)> after')
    // The tag survives only as inert, escaped text - never as a real element.
    expect(html).not.toMatch(/<img[\s/>]/)
    expect(html).toContain('&#x3C;img')
  })

  it('keeps placeholder-like tokens as visible text', () => {
    const html = compile('Use <your-api-key> in the header')
    expect(html).not.toContain('<your-api-key>')
    expect(html).toContain('your-api-key')
  })

  it('strips javascript: link hrefs but keeps the link text', () => {
    const html = compile('[click me](javascript:alert(1))')
    expect(html).not.toContain('javascript:')
    expect(html).toContain('click me')
  })

  it('preserves safe http(s) links and standard markdown', () => {
    const html = compile('A [link](https://example.com) and **bold** text')
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('<strong>bold</strong>')
  })
})
