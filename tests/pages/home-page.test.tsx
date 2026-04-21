import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import enCommon from '@/locales/en/common.json'
import HomePage from '@/pages/index/+Page'

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
    t: (key: string, options?: string | { defaultValue?: string; returnObjects?: boolean }) => {
      const value = getByPath(enCommon, key)
      if (value !== undefined) return value
      if (typeof options === 'string') return options
      return options?.defaultValue ?? key
    },
  }),
}))

vi.mock('@/components/Hero', () => ({
  __esModule: true,
  default: () => <div>Hero</div>,
}))

vi.mock('@/components/ComparisonSection', () => ({
  __esModule: true,
  default: () => <div>Comparison</div>,
}))

vi.mock('@/components/shadcn-studio/blocks/features-section-10/solutions-section', () => ({
  __esModule: true,
  default: () => <div>Solutions</div>,
}))

vi.mock('@/components/TestimonialsSection', () => ({
  __esModule: true,
  default: () => <div>Legacy testimonials section</div>,
}))

vi.mock('@/components/shadcn-studio/blocks/testimonials-component-03/testimonials-component-03', () => ({
  __esModule: true,
  default: (props: { eyebrow: string; title: string; description: string }) => (
    <div>
      <span>{props.eyebrow}</span>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  ),
}))

vi.mock('@/components/shadcn-studio/blocks/cta-section-09/cta-section-09', () => ({
  __esModule: true,
  default: () => <div>CTA</div>,
}))

vi.mock('@/components/shadcn-studio/blocks/about-us-page-07/about-us-page-07', () => ({
  __esModule: true,
  default: () => <div>About</div>,
}))

vi.mock('@/components/HomeFAQ', () => ({
  __esModule: true,
  default: () => <div>FAQ</div>,
}))

describe('home page', () => {
  it('uses the original testimonials heading copy only in the remaining testimonial block and keeps the CTA card', () => {
    const html = renderToStaticMarkup(<HomePage />)

    expect(html).toContain('Testimonials')
    expect(html).toContain('Real stories, real impact')
    expect(html).toContain(
      'From grassroots movements to large institutions, see how Vocdoni transforms decision-making through secure, accessible, and transparent technology.'
    )
    expect(html).not.toContain('Legacy testimonials section')
    expect(html).toContain('CTA')
  })
})
