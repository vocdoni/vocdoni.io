import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonials-component-03'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue ?? key,
  }),
}))

describe('TestimonialsComponent', () => {
  it('renders the transferred heading copy and not the legacy hero carousel heading', () => {
    const html = renderToStaticMarkup(
      <TestimonialsComponent
        eyebrow='Testimonials'
        title='Real stories, real impact'
        description='From grassroots movements to large institutions.'
        heroSlides={[
          {
            description: 'Legacy hero slide',
            logo: '/logo.png',
            alt: 'Legacy logo',
          },
        ]}
        testimonials={[
          {
            name: 'Jordi Estiarte',
            handle: 'Mayor · Bellpuig City Council',
            avatar: '/avatar.png',
            rating: 5,
            title: 'The future of real elections',
            content: 'Vocdoni made elections easier.',
            platformName: 'Bellpuig',
            platformImage: '/logo.png',
          },
        ]}
      />
    )

    expect(html).toContain('Testimonials')
    expect(html).toContain('Real stories, real impact')
    expect(html).toContain('From grassroots movements to large institutions.')
    expect(html).toContain('class="text-foreground z-1 inline-block text-3xl font-bold sm:text-4xl lg:text-5xl"')
    expect(html).not.toContain('&quot;just amazing...&quot;')
    expect(html).not.toContain('Legacy hero slide')
  })
})
