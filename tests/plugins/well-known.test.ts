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
    expect(out.startsWith('/*')).toBe(true)
    expect(out).toContain('Link: </.well-known/api-catalog>; rel="api-catalog"')
    expect(out).toContain(`Link: <${DEVELOPERS_SKILLS_URL}>; rel="related"`)
    expect(out).toContain(`Link: <${DEVELOPERS_SWAGGER_URL}>; rel="service-desc"`)
  })
})
