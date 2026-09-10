import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import en from '@/locales/en/common.json'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: unknown) => {
      const value = key.split('.').reduce<unknown>((acc, part) => (acc as Record<string, unknown>)?.[part], en)
      if (value === undefined) return typeof options === 'string' ? options : key
      return value
    },
  }),
}))

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({ locale: 'en', urlLogical: '/solutions/decidim' }),
}))

vi.mock('@/assets/logos/logo_decidim_colour.webp', () => ({ default: '/decidim.webp' }))
vi.mock('@/assets/logos/logo_omnium_colour.webp', () => ({ default: '/omnium.webp' }))
vi.mock('@/assets/logos/erc.webp', () => ({ default: '/erc-full.webp' }))
vi.mock('@/assets/logos/barcelona.webp', () => ({ default: '/bcn-full.webp' }))
vi.mock('@/assets/logos/logo_plataforma_colour.webp', () => ({ default: '/plataforma.webp' }))
vi.mock('@/assets/logos/logo_cec_colour.webp', () => ({ default: '/cec.webp' }))

const { default: Page } = await import('@/pages/solutions/decidim/+Page')

describe('Decidim solutions page', () => {
  const html = renderToStaticMarkup(<Page />)

  it('names the module by its product name, never by its gem name', () => {
    expect(html).toContain('Decidim Secure Elections')
    // The repository name survives only inside the links that lead to the
    // repository. It must never appear in copy the reader is asked to read.
    const gemMentions = html.match(/decidim-secure_elections/g) ?? []
    const repoLinks = html.match(/github\.com\/vocdoni\/decidim-secure_elections/g) ?? []
    expect(gemMentions.length).toBe(repoLinks.length)
  })

  it('opens with the partner credential and the two hero asks', () => {
    expect(html).toContain('Official Decidim partner')
    expect(html).toContain('Talk with us')
    expect(html).toContain('View the code on GitHub')
    expect(html).toContain('/decidim.webp')
    expect(html).not.toContain('registered trademark')
    expect(html).toContain('anonymous')
  })

  it('shows the full customer marks, not the round crops, and no timeline', () => {
    expect(html).toContain('/erc-full.webp')
    expect(html).toContain('/bcn-full.webp')
    expect(html).not.toContain('id="timeline"')
    expect(html).not.toContain('What a member actually does')
    expect(html).not.toContain('id="for-your-board"')
    expect(html).not.toContain('id="resources"')
    expect(html).toContain('https://decidim.org/blog/2025-11-20-new-version-0-31-0/')
  })

  it('states the three guarantees affirmatively, without a repeated answer label', () => {
    expect(html).toContain('Anonymity')
    expect(html).toContain('End-to-end verifiability')
    expect(html).toContain('Data protection by design')
    expect(html).not.toContain('What changes with Decidim Secure Elections')
  })

  it('renders the comparison with a signal on every compared cell', () => {
    expect(html).toContain('data-status="negative"')
    expect(html).toContain('data-status="positive"')
    expect(html).toContain('data-status="neutral"')
  })

  it('renders the sections in the order the page composes them', () => {
    const order = ['overview', 'partner', 'stakes', 'comparison', 'how-it-runs', 'legal-validity', 'engagement']
    const positions = order.map((id) => html.indexOf(`id="${id}"`))
    expect(positions.every((position) => position > 0)).toBe(true)
    expect([...positions].sort((a, b) => a - b)).toEqual(positions)
  })

  it('carries no pricing ask, since commercial terms are agreed in conversation', () => {
    expect(html).not.toContain('/plans')
  })
})
