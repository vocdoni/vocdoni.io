import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import AboutUs03 from '@/components/shadcn-studio/blocks/about-us-page-03/about-us-page-03'
import AboutUs07 from '@/components/shadcn-studio/blocks/about-us-page-07/about-us-page-07'
import Portfolio from '@/components/shadcn-studio/blocks/portfolio-16/portfolio-16'
import SuccessStories from '@/components/shadcn-studio/blocks/use-cases/success-stories'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: string | { defaultValue?: string; returnObjects?: boolean }) => {
      // Handle returnObjects for arrays
      if (typeof options === 'object' && options?.returnObjects) {
        return []
      }
      if (typeof options === 'string') return options
      return options?.defaultValue ?? key
    },
  }),
}))

vi.mock('@/components/ui/motion-preset', () => ({
  MotionPreset: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, asChild, ...props }: any) =>
    asChild ? <>{children}</> : <button {...props}>{children}</button>,
}))

vi.mock('@/components/Link', () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('@/components/ui/card', async () => {
  const actual = await vi.importActual('@/components/ui/card')
  return {
    ...actual,
    Card: ({ children }: any) => <div>{children}</div>,
    CardContent: ({ children }: any) => <div>{children}</div>,
    CardDescription: ({ children }: any) => <div>{children}</div>,
    CardHeader: ({ children }: any) => <div>{children}</div>,
    CardTitle: ({ children }: any) => <div>{children}</div>,
  }
})

vi.mock('@/components/CalBookingDialog', () => ({
  CalBookingDialog: ({ children }: any) => <>{children}</>,
}))

vi.mock('vike-react/usePageContext', () => ({
  usePageContext: () => ({ locale: 'en', urlLogical: '/use-cases' }),
}))

describe('Image dimensions regression tests', () => {
  it('renders about-us page 03 image with real intrinsic dimensions', () => {
    const html = renderToStaticMarkup(
      <AboutUs03 aboutUsData={{ contentTitle: 'Test', contentDescription: 'Desc', tabs: [] }} />
    )
    expect(html).toContain('width="1400"')
    expect(html).toContain('height="1205"')
  })

  it('renders about-us page 07 image with real intrinsic dimensions', () => {
    const html = renderToStaticMarkup(
      <AboutUs07
        statCards={[{ title: 'Test', description: 'Desc' }]}
        featureCards={[{ title: 'Test', description: 'Desc' }]}
      />
    )
    expect(html).toContain('width="684"')
    expect(html).toContain('height="696"')
  })

  it('renders Portfolio with per-item image dimensions', () => {
    const portfolioItems = [
      {
        id: 1,
        title: 'Test Project',
        description: 'Test Description',
        link: '#',
        imageUrl: '/test.jpg',
        imageAlt: 'Test Image',
        imageWidth: 585,
        imageHeight: 391,
      },
    ]
    const html = renderToStaticMarkup(<Portfolio portfolioItems={portfolioItems} />)
    expect(html).toContain('width="585"')
    expect(html).toContain('height="391"')
  })

  it('renders bellpuig success story with correct dimensions (1000x1157)', () => {
    const html = renderToStaticMarkup(<SuccessStories />)
    expect(html).toContain('width="1000"')
    expect(html).toContain('height="1157"')
  })
})
