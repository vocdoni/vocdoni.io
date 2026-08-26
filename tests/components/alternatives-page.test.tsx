import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { AlternativesPage, type AlternativesContent } from '@/components/alternatives/AlternativesPage'
import caCommon from '@/locales/ca/common.json'
import deCommon from '@/locales/de/common.json'
import elCommon from '@/locales/el/common.json'
import enCommon from '@/locales/en/common.json'
import esCommon from '@/locales/es/common.json'
import euCommon from '@/locales/eu/common.json'
import frCommon from '@/locales/fr/common.json'
import hiCommon from '@/locales/hi/common.json'
import itCommon from '@/locales/it/common.json'
import ptBrCommon from '@/locales/pt-br/common.json'
import ptCommon from '@/locales/pt/common.json'

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({ locale: 'en', urlLogical: '/alternatives/electionbuddy-alternatives' }),
}))

vi.mock('@/components/ui/motion-preset', () => ({
  MotionPreset: ({ children, component: Component = 'div', ...props }: any) => {
    const safeProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !['fade', 'blur', 'slide', 'delay', 'transition'].includes(key))
    )
    return <Component {...safeProps}>{children}</Component>
  },
}))

const locales = [
  caCommon,
  deCommon,
  elCommon,
  enCommon,
  esCommon,
  euCommon,
  frCommon,
  hiCommon,
  itCommon,
  ptCommon,
  ptBrCommon,
]

describe('ElectionBuddy alternatives page', () => {
  it('renders one primary action, four alternatives, and the required internal link group', () => {
    const html = renderToStaticMarkup(
      <AlternativesPage content={enCommon.alternatives.electionbuddy as AlternativesContent} />
    )

    expect(html.match(/<h1/g) ?? []).toHaveLength(1)
    expect(html).toContain('4 ElectionBuddy alternatives for organization voting')
    expect(html).toContain('Vocdoni')
    expect(html).toContain('OpaVote')
    expect(html).toContain('Simply Voting')
    expect(html).toContain('POLYAS')
    expect(html).toContain('href="/en/app"')
    expect(html).toContain('href="/en/solutions/associations"')
    expect(html).toContain('href="/en/case-studies/omnium-cultural"')
    expect(html).toContain('href="/en/learn/how-secure-online-voting-works"')
    expect(html).toContain('https://electionbuddy.com/pricing/')
    expect(html).toContain('https://opavote.com/pricing')
    expect(html).toContain('https://www.simplyvoting.com/online-voting/')
    expect(html).toContain('https://www.polyas.com/products/pricing/online-voting')
  })

  it('has complete page content and metadata in every supported locale', () => {
    for (const locale of locales) {
      const page = locale.alternatives.electionbuddy
      const meta = locale.meta.alternatives.electionbuddy

      expect(page.title).toBeTruthy()
      expect(page.criteria).toHaveLength(4)
      expect(page.alternatives).toHaveLength(4)
      expect(page.baseline_points).toHaveLength(3)
      expect(Object.values(page.related_links)).toHaveLength(4)
      expect(page.primary_cta).toBeTruthy()
      expect(page.electionbuddy_features).toBeTruthy()
      expect(meta.title).toBeTruthy()
      expect(meta.description).toBeTruthy()
      expect(locale.footer.growth_by_tin).toBeTruthy()
    }
  })
})
