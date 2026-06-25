import { describe, expect, it } from 'vitest'

import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { matchRawDocRequest, outputPathFor, processDoc } from '@/plugins/docs-markdown'

describe('processDoc', () => {
  it('strips frontmatter and resolves tokens', () => {
    const source = `---\ntitle: Quickstart\ngroup: get_started\n---\n# Quickstart\n\nBase: {{API_BASE_URL}}\n`
    const out = processDoc(source)
    expect(out).not.toContain('title: Quickstart')
    expect(out.startsWith('# Quickstart')).toBe(true)
    expect(out).toContain(`Base: ${DEVELOPERS_API_BASE_URL}`)
  })

  it('leaves a file without frontmatter intact (tokens still resolved)', () => {
    expect(processDoc('Hello {{API_BASE_URL}}')).toBe(`Hello ${DEVELOPERS_API_BASE_URL}`)
  })
})

describe('outputPathFor', () => {
  it('mirrors the page route + .md', () => {
    expect(outputPathFor('en', 'quickstart')).toBe('en/developers/docs/quickstart.md')
    expect(outputPathFor('es', 'census')).toBe('es/developers/docs/census.md')
  })

  it('maps the overview to /<locale>/developers/docs.md', () => {
    expect(outputPathFor('fr', 'overview')).toBe('fr/developers/docs.md')
  })
})

describe('matchRawDocRequest', () => {
  it('matches a localized slug request', () => {
    expect(matchRawDocRequest('/en/developers/docs/quickstart.md')).toEqual({ locale: 'en', slug: 'quickstart' })
    expect(matchRawDocRequest('/es/developers/docs/census.md?x=1')).toEqual({ locale: 'es', slug: 'census' })
  })

  it('matches the overview request', () => {
    expect(matchRawDocRequest('/de/developers/docs.md')).toEqual({ locale: 'de', slug: 'overview' })
  })

  it('returns null for non-doc or non-md requests', () => {
    expect(matchRawDocRequest('/en/developers/docs/quickstart')).toBeNull()
    expect(matchRawDocRequest('/about-us')).toBeNull()
    expect(matchRawDocRequest('/developers/docs/en/quickstart.md')).toBeNull() // old scheme no longer matches
  })

  it('rejects path traversal', () => {
    expect(matchRawDocRequest('/en/developers/docs/../../etc/passwd.md')).toBeNull()
  })
})
