import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ComparisonPage, type ComparisonContent } from '@/components/compare/ComparisonPage'
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
  usePageContext: () => ({ locale: 'en', urlLogical: '/compare/vocdoni-vs-electionbuddy' }),
}))

vi.mock('@/components/ui/motion-preset', () => ({
  MotionPreset: ({ children, component: Component = 'div', ...props }: any) => {
    const { fade: _fade, blur: _blur, slide: _slide, delay: _delay, transition: _transition, ...htmlProps } = props
    return <Component {...htmlProps}>{children}</Component>
  },
}))

describe('Vocdoni vs ElectionBuddy comparison page', () => {
  beforeEach(() => {
    ;(globalThis as any).APP_URL = 'https://app.vocdoni.io'
  })

  it('has complete localized content and metadata in every supported locale', () => {
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

    for (const locale of locales) {
      const page = locale.compare_pages.vocdoni_vs_electionbuddy
      const meta = locale.meta.compare.vocdoni_vs_electionbuddy

      expect(page.title).toBeTruthy()
      expect(page.rows).toHaveLength(4)
      expect(page.vocdoni_fit).toHaveLength(3)
      expect(page.electionbuddy_fit).toHaveLength(3)
      expect(page.faq).toHaveLength(3)
      expect(meta.title).toBeTruthy()
      expect(meta.description).toBeTruthy()
    }
  })

  it('renders one primary action, official evidence, and grouped internal links', () => {
    const content = enCommon.compare_pages.vocdoni_vs_electionbuddy as ComparisonContent
    const html = renderToStaticMarkup(<ComparisonPage content={content} />)

    expect(html).toContain('href="https://app.vocdoni.io"')
    expect(html.match(/href="https:\/\/app\.vocdoni\.io"/g)).toHaveLength(1)
    expect(html).toContain('https://electionbuddy.com/pricing/')
    expect(html).toContain('https://electionbuddy.com/features/online-voting/')
    expect(html).toContain('/en/solutions/associations')
    expect(html).toContain('/en/learn/verifiable-voting-explained')
    expect(html).toContain('/en/learn/anonymous-voting-explained')
    expect(html).toContain('/en/case-studies/omnium-cultural')
  })
})
