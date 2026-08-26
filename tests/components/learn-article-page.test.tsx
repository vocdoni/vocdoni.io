import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { ArticlePage, type ArticleContent } from '@/components/learn/ArticlePage'
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

function getByPath(source: unknown, path: string) {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, source)
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => getByPath(enCommon, key) ?? fallback ?? key,
  }),
}))

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({ locale: 'en', urlLogical: '/learn/how-secure-online-voting-works' }),
}))

vi.mock('@/components/ui/motion-preset', () => ({
  MotionPreset: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

const content: ArticleContent = {
  eyebrow: 'Guide',
  title: 'How secure online voting works',
  intro: 'A concise introduction.',
  sections: [{ heading: 'Core protections', paragraphs: ['A clear explanation.'] }],
  takeaways_title: 'Key takeaways',
  takeaways: ['One takeaway.'],
  faq_title: 'Questions',
  faq: [],
  cta_title: 'Run a vote',
  cta_text: 'Start with Vocdoni.',
  cta_label: 'Start free',
}

describe('Learn article related guides', () => {
  it('has complete quorum guide content and metadata in every supported locale', () => {
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
      const guide = locale.learn.quorum_meaning_for_online_voting
      const card = locale.learn_index.cards.quorum_meaning_for_online_voting
      const meta = locale.meta.learn.quorum_meaning_for_online_voting

      expect(guide.title).toBeTruthy()
      expect(guide.sections).toHaveLength(6)
      expect(guide.takeaways).toHaveLength(5)
      expect(guide.faq).toHaveLength(5)
      expect(guide.cta_label).toBeTruthy()
      expect(card.title).toBeTruthy()
      expect(meta.title).toBeTruthy()
      expect(meta.description).toBeTruthy()
    }
  })

  it('links to three contextual guides without linking to the current guide', () => {
    const html = renderToStaticMarkup(<ArticlePage content={content} currentGuide='how_secure_online_voting_works' />)

    expect(html).toContain('Related guides')
    expect(html).toContain('/en/learn/verifiable-voting-explained')
    expect(html).toContain('/en/learn/anonymous-voting-explained')
    expect(html).toContain('/en/learn/how-to-prevent-election-fraud-online')
    expect(html).not.toContain('href="/en/learn/how-secure-online-voting-works"')
  })

  it('renders translated guide titles rather than raw i18n keys', () => {
    const html = renderToStaticMarkup(<ArticlePage content={content} currentGuide='how_secure_online_voting_works' />)

    expect(html).toContain('Verifiable voting explained')
    expect(html).toContain('Anonymous voting explained')
    expect(html).toContain('How to prevent election fraud in online voting')
    expect(html).not.toContain('learn_index.cards.')
  })

  it('connects the AGM guide to the quorum guide without growing the related-links group', () => {
    const html = renderToStaticMarkup(
      <ArticlePage content={content} currentGuide='how_to_run_a_legally_valid_agm_online' />
    )

    expect(html).toContain('/en/learn/quorum-meaning-for-online-voting')
    expect(html).not.toContain('/en/learn/how-to-prevent-election-fraud-online')
    const relatedGuides = html.match(/<aside[\s\S]*?<\/aside>/)?.[0] ?? ''
    expect(relatedGuides.match(/<a /g) ?? []).toHaveLength(3)
  })

  it('links the quorum guide to the closest practical guides', () => {
    const html = renderToStaticMarkup(<ArticlePage content={content} currentGuide='quorum_meaning_for_online_voting' />)

    expect(html).toContain('/en/learn/how-to-run-a-legally-valid-agm-online')
    expect(html).toContain('/en/learn/gdpr-requirements-for-digital-voting')
    expect(html).toContain('/en/learn/how-secure-online-voting-works')
    expect(html).not.toContain('href="/en/learn/quorum-meaning-for-online-voting"')
  })
})
