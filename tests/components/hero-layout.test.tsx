import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import Hero from '@/components/Hero'
import AlternativeHero from '@/components/AlternativeHero'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { returnObjects?: boolean }) => {
      if (key === 'hero.dynamicWords' && options?.returnObjects) {
        return ['fast']
      }
      return key
    },
  }),
}))

vi.mock('@/components/ui/motion-preset', () => ({
  MotionPreset: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: new Proxy(
    {},
    {
      get: () =>
        ({ children, ...props }: { children?: React.ReactNode }) =>
          <div {...props}>{children}</div>,
    }
  ),
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

  it('does not add extra top padding on the alternative hero section', () => {
    const html = renderToStaticMarkup(<AlternativeHero />)
    expect(html).not.toContain('pt-28')
  })
})
