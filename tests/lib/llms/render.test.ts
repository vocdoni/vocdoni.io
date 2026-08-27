import { describe, expect, it } from 'vitest'

import { allLinks, parseLlmsTxt } from '@/lib/llms/parse'
import { type LlmsDocument, renderLlms } from '@/lib/llms/render'

const HOST = 'https://vocdoni.io'

const fixture: LlmsDocument = {
  title: 'Vocdoni',
  summary: 'Open-source, end-to-end verifiable online voting for organizations.',
  intro: ['First paragraph of prose.', 'Second paragraph of prose.'],
  sections: [
    {
      heading: 'Products',
      links: [
        { title: 'Vocdoni App', url: `${HOST}/en/app`, note: 'Self-service online voting.' },
        { title: 'Vocdoni API', url: `${HOST}/en/developers`, note: 'Build voting into your product.' },
      ],
    },
    {
      heading: 'Elsewhere',
      links: [{ title: 'GitHub', url: 'https://github.com/vocdoni' }],
    },
  ],
}

describe('renderLlms', () => {
  it('emits H1, blockquote summary, prose, then sections in that order', () => {
    const out = renderLlms(fixture, HOST)
    const structural = out.split('\n').filter((l) => l.trim())

    expect(structural[0]).toBe('# Vocdoni')
    expect(structural[1]).toBe('> Open-source, end-to-end verifiable online voting for organizations.')
    expect(structural[2]).toBe('First paragraph of prose.')
    expect(structural[3]).toBe('Second paragraph of prose.')
    expect(structural[4]).toBe('## Products')
  })

  it('places every intro paragraph after the blockquote and before the first heading', () => {
    const out = renderLlms(fixture, HOST)
    const firstHeading = out.indexOf('## ')
    for (const paragraph of fixture.intro) {
      expect(out.indexOf(paragraph)).toBeGreaterThan(out.indexOf('> '))
      expect(out.indexOf(paragraph)).toBeLessThan(firstHeading)
    }
  })

  it('resolves relative URLs against the hostname and leaves absolute URLs untouched', () => {
    const out = renderLlms(
      {
        ...fixture,
        sections: [
          {
            heading: 'Mixed',
            links: [
              { title: 'Relative', url: '/en/app' },
              { title: 'Absolute', url: 'https://davinci.vote' },
            ],
          },
        ],
      },
      'https://vocdoni.io/'
    )

    expect(out).toContain('- [Relative](https://vocdoni.io/en/app)')
    expect(out).toContain('- [Absolute](https://davinci.vote)')
  })

  it('skips sections with no links', () => {
    const out = renderLlms({ ...fixture, sections: [...fixture.sections, { heading: 'Empty', links: [] }] }, HOST)
    expect(out).not.toContain('## Empty')
  })
})

describe('render/parse round trip', () => {
  it('parses back to the exact structure it was rendered from', () => {
    expect(parseLlmsTxt(renderLlms(fixture, HOST))).toEqual(fixture)
  })

  it('survives a note containing a colon', () => {
    const doc: LlmsDocument = {
      ...fixture,
      sections: [
        {
          heading: 'Tricky',
          links: [
            { title: 'Guide', url: `${HOST}/en/learn`, note: 'Two guarantees: recorded as cast, counted as recorded.' },
          ],
        },
      ],
    }
    const parsed = parseLlmsTxt(renderLlms(doc, HOST))
    expect(allLinks(parsed)[0].note).toBe('Two guarantees: recorded as cast, counted as recorded.')
  })

  it('survives titles containing brackets, pipes and colons', () => {
    const doc: LlmsDocument = {
      ...fixture,
      sections: [
        {
          heading: 'Tricky titles',
          links: [{ title: 'AGM [2026]: voting | Vocdoni', url: `${HOST}/en/app`, note: 'Note.' }],
        },
      ],
    }
    expect(allLinks(parseLlmsTxt(renderLlms(doc, HOST)))[0].title).toBe('AGM [2026]: voting | Vocdoni')
  })
})
