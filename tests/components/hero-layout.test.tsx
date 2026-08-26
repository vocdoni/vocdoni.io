import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import Hero from '@/components/Hero'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (key === 'hero.dynamic_words' && options?.returnObjects) {
        return ['fast']
      }
      if (key === 'hero.headline') {
        return 'Run secure, verifiable elections for your organization'
      }
      return key
    },
  }),
}))

vi.mock('@/components/ui/motion-preset', () => ({
  MotionPreset: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@/components/MobileHeroScroll', () => ({
  __esModule: true,
  default: () => <div />,
}))

vi.mock('@/components/HeroCards', () => ({
  CensusCard: () => <div />,
  ResultsCard: () => <div />,
  VotingCard: () => <div />,
}))

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({ locale: 'en', urlLogical: '/' }),
}))

describe('Hero layout spacing', () => {
  it('does not add extra top padding on the hero section', () => {
    const html = renderToStaticMarkup(<Hero />)
    expect(html).not.toContain('pt-28')
  })

  it('renders one clear H1 before one primary activation CTA', () => {
    const html = renderToStaticMarkup(<Hero />)

    expect(html.match(/<h1/g) ?? []).toHaveLength(1)
    expect(html).toContain('Run secure, verifiable elections for your organization')
    expect(html.match(/data-hero-cta="primary"/g) ?? []).toHaveLength(1)
    expect(html.indexOf('<h1')).toBeLessThan(html.indexOf('data-hero-cta="primary"'))
  })
})
