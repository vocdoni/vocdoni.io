import { describe, expect, it } from 'vitest'

import { DEVELOPERS_API_BASE_URL, DEVELOPERS_STATUS_URL, DEVELOPERS_SWAGGER_URL } from '@/lib/developers'
import {
  AI_CATALOG_SPEC_VERSION,
  ARD_OUTPUT_PATHS,
  buildAiCatalog,
  buildAiCatalogDocument,
  URN_PUBLISHER,
} from '@/plugins/ard'

// Identifier pattern copied verbatim from the ARD spec schema
// (spec/schemas/ai-catalog.schema.json -> $defs.catalogEntry.properties.identifier.pattern).
const URN_PATTERN = /^urn:air:[a-zA-Z0-9.-]+(:[a-zA-Z0-9._-]+)+$/

const doc = buildAiCatalogDocument('https://vocdoni.io/', 'en')

describe('buildAiCatalogDocument', () => {
  it('emits the manifest-level fields the schema requires', () => {
    expect(doc.specVersion).toBe(AI_CATALOG_SPEC_VERSION)
    expect(AI_CATALOG_SPEC_VERSION).toBe('1.0')
    expect(doc.host.displayName).toBe('Vocdoni')
    expect(Array.isArray(doc.entries)).toBe(true)
    expect(doc.entries.length).toBeGreaterThan(0)
  })

  it('only carries the three top-level members the schema allows', () => {
    expect(Object.keys(doc).sort()).toEqual(['entries', 'host', 'specVersion'])
  })

  it('gives every entry the required identifier, displayName and type', () => {
    for (const entry of doc.entries) {
      expect(entry.identifier, entry.identifier).toMatch(URN_PATTERN)
      expect(entry.displayName.length, entry.identifier).toBeGreaterThan(0)
      // `type` must be an IANA media type, not a bare token.
      expect(entry.type, entry.identifier).toMatch(/^[a-z]+\/[a-z0-9.+-]+$/)
    }
  })

  it('anchors every identifier to the verifiable production domain', () => {
    expect(URN_PUBLISHER).toBe('vocdoni.io')
    for (const entry of doc.entries) {
      expect(entry.identifier.startsWith(`urn:air:${URN_PUBLISHER}:`), entry.identifier).toBe(true)
    }
  })

  it('keeps identifiers unique', () => {
    const ids = doc.entries.map((e) => e.identifier)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('carries exactly one of url or data per entry', () => {
    for (const entry of doc.entries) {
      const record = entry as unknown as Record<string, unknown>
      const present = ['url', 'data'].filter((key) => record[key] !== undefined)
      expect(present, entry.identifier).toEqual(['url'])
    }
  })

  it('resolves every entry url absolutely', () => {
    for (const entry of doc.entries) {
      expect(() => new URL(entry.url), entry.identifier).not.toThrow()
      expect(entry.url.startsWith('https://'), entry.identifier).toBe(true)
    }
  })

  it('gives every entry between 2 and 5 representativeQueries', () => {
    for (const entry of doc.entries) {
      expect(entry.representativeQueries.length, entry.identifier).toBeGreaterThanOrEqual(2)
      expect(entry.representativeQueries.length, entry.identifier).toBeLessThanOrEqual(5)
      for (const query of entry.representativeQueries) {
        expect(query.length, entry.identifier).toBeGreaterThan(0)
      }
    }
  })

  it('sources external URLs from lib/developers rather than hardcoding them', () => {
    const urls = doc.entries.map((e) => e.url)
    expect(urls).toContain(DEVELOPERS_SWAGGER_URL)
    expect(urls).toContain(DEVELOPERS_API_BASE_URL)
    expect(urls).toContain(DEVELOPERS_STATUS_URL)
  })

  it('builds site-relative URLs from the hostname option, trailing slash stripped', () => {
    const urls = doc.entries.map((e) => e.url)
    expect(urls).toContain('https://vocdoni.io/.well-known/api-catalog')
    expect(urls).toContain('https://vocdoni.io/llms.txt')
    expect(urls).toContain('https://vocdoni.io/.well-known/agent-skills/index.json')
    expect(urls).toContain('https://vocdoni.io/developers/docs')
    expect(urls).toContain('https://vocdoni.io/blog/rss.xml')
    expect(doc.host.documentationUrl).toBe('https://vocdoni.io/developers')
  })

  it('points the raw markdown docs entry at the default locale', () => {
    const md = buildAiCatalogDocument('https://vocdoni.io', 'ca').entries.find((e) => e.type === 'text/markdown')
    expect(md?.url).toBe('https://vocdoni.io/ca/developers/docs.md')
  })

  it('advertises the deploy host, not the production domain, on preview deploys', () => {
    const preview = buildAiCatalogDocument('https://deploy-preview-42--vocdoni.netlify.app', 'en')
    const llms = preview.entries.find((e) => e.url.endsWith('/llms.txt'))
    expect(llms?.url).toBe('https://deploy-preview-42--vocdoni.netlify.app/llms.txt')
    // Identity stays stable even though location moved.
    expect(llms?.identifier).toBe('urn:air:vocdoni.io:discovery:llms-txt')
  })

  it('uses no em dash anywhere, per the repo copy guidelines', () => {
    expect(JSON.stringify(doc)).not.toContain('—')
  })
})

describe('buildAiCatalog', () => {
  it('serializes to parseable JSON with a trailing newline', () => {
    const out = buildAiCatalog('https://vocdoni.io', 'en')
    expect(out.endsWith('\n')).toBe(true)
    expect(JSON.parse(out)).toEqual(doc)
  })
})

describe('ARD_OUTPUT_PATHS', () => {
  it('serves the canonical ard.json alongside the predecessor ai-catalog.json', () => {
    expect(ARD_OUTPUT_PATHS).toEqual(['.well-known/ard.json', '.well-known/ai-catalog.json'])
  })
})
