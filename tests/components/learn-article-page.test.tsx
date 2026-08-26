import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { ArticlePage, type ArticleContent } from '@/components/learn/ArticlePage'
import enCommon from '@/locales/en/common.json'

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
})
