import { describe, expect, it } from 'vitest'

import {
  DEVELOPERS_API_BASE_URL,
  DEVELOPERS_SKILLS_URL,
  DEVELOPERS_STATUS_URL,
  DEVELOPERS_SWAGGER_URL,
} from '@/lib/developers'
import { buildApiCatalog, buildLlmsTxt, buildNetlifyHeaders } from '@/plugins/well-known'

describe('buildApiCatalog', () => {
  it('emits a valid RFC 9727 linkset anchored at the API base', () => {
    const doc = JSON.parse(buildApiCatalog('https://vocdoni.io/'))
    expect(Array.isArray(doc.linkset)).toBe(true)
    const entry = doc.linkset[0]
    expect(entry.anchor).toBe(DEVELOPERS_API_BASE_URL)
    expect(entry['service-desc'][0].href).toBe(DEVELOPERS_SWAGGER_URL)
    expect(entry['service-doc'][0].href).toBe('https://vocdoni.io/developers/docs')
    expect(entry.status[0].href).toBe(DEVELOPERS_STATUS_URL)
  })
})

describe('buildLlmsTxt', () => {
  it('renders an H1, summary and link sections, skipping empty ones', () => {
    const out = buildLlmsTxt('https://vocdoni.io', [
      { heading: 'Developer docs', entries: [{ title: 'Overview', url: '/en/developers/docs.md' }] },
      { heading: 'Blog', entries: [] },
    ])
    expect(out.startsWith('# Vocdoni')).toBe(true)
    expect(out).toContain('## Developer docs')
    expect(out).toContain('- [Overview](https://vocdoni.io/en/developers/docs.md)')
    expect(out).not.toContain('## Blog')
  })

  it('keeps absolute URLs untouched', () => {
    const out = buildLlmsTxt('https://vocdoni.io', [
      { heading: 'Key pages', entries: [{ title: 'OpenAPI', url: DEVELOPERS_SWAGGER_URL }] },
    ])
    expect(out).toContain(`- [OpenAPI](${DEVELOPERS_SWAGGER_URL})`)
  })
})

describe('buildNetlifyHeaders', () => {
  it('emits Link headers mirroring the discovery relations', () => {
    const out = buildNetlifyHeaders()
    expect(out.startsWith('/*\n')).toBe(true)
    expect(out).toContain('Link: </.well-known/api-catalog>; rel="api-catalog"')
    expect(out).toContain(`Link: <${DEVELOPERS_SKILLS_URL}>; rel="related"`)
    expect(out).toContain(`Link: <${DEVELOPERS_SWAGGER_URL}>; rel="service-desc"`)
    expect(out).not.toContain('noindex, nofollow')
  })

  it('adds X-Robots-Tag on noindex deploys', () => {
    const out = buildNetlifyHeaders(true)
    expect(out).toContain('  X-Robots-Tag: noindex, nofollow')
    // Still inside the /* block, right before the Link headers.
    expect(out.startsWith('/*\n  X-Robots-Tag: noindex, nofollow\n  Link: ')).toBe(true)
  })

  it('serves the extensionless api-catalog as RFC 9727 linkset+json', () => {
    for (const out of [buildNetlifyHeaders(), buildNetlifyHeaders(true)]) {
      expect(out).toContain('/.well-known/api-catalog\n  Content-Type: application/linkset+json')
    }
  })

  it('marks the raw markdown mirrors noindex with wildcard patterns', () => {
    for (const out of [buildNetlifyHeaders(), buildNetlifyHeaders(true)]) {
      for (const pattern of ['/*/developers/docs.md', '/*/developers/docs/*.md', '/*/blog/*.md']) {
        expect(out).toContain(`${pattern}\n  X-Robots-Tag: noindex\n`)
      }
    }
    // No enumerated locale paths sneaking in, and HTML pages stay indexable.
    expect(buildNetlifyHeaders()).not.toContain('/en/')
    expect(buildNetlifyHeaders()).not.toContain('/developers/docs\n')
  })

  it('is a well-formed _headers file: path lines flush left, header lines indented', () => {
    for (const out of [buildNetlifyHeaders(), buildNetlifyHeaders(true)]) {
      expect(out.endsWith('\n')).toBe(true)
      const blocks = out.trimEnd().split('\n\n')
      expect(blocks).toHaveLength(5)
      for (const bl of blocks) {
        const [pathLine, ...headerLines] = bl.split('\n')
        expect(pathLine.startsWith('/')).toBe(true)
        expect(headerLines.length).toBeGreaterThan(0)
        for (const line of headerLines) expect(line).toMatch(/^ {2}[\w-]+: \S/)
      }
    }
  })
})
