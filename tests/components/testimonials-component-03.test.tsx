import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-03/testimonials-component-03'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue ?? key,
  }),
}))

describe('TestimonialsComponent', () => {
  const renderTestimonials = (
    testimonials = [
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
    ]
  ) =>
    renderToStaticMarkup(
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
        testimonials={testimonials}
      />
    )

  it('renders the transferred heading copy and not the legacy hero carousel heading', () => {
    const html = renderTestimonials()

    expect(html).toContain('Testimonials')
    expect(html).toContain('Real stories, real impact')
    expect(html).toContain('From grassroots movements to large institutions.')
    expect(html).toContain('class="text-foreground z-1 inline-block text-3xl font-bold sm:text-4xl lg:text-5xl"')
    expect(html).not.toContain('&quot;just amazing...&quot;')
    expect(html).not.toContain('Legacy hero slide')
  })

  it('renders each testimonial title and content once in SSR output', () => {
    const html = renderTestimonials([
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
      {
        name: 'Anna Garcia',
        handle: 'Association director',
        avatar: '/avatar-2.png',
        rating: 5,
        title: 'Members trusted the result',
        content: 'The audit trail made the process easy to explain.',
        platformName: 'Association',
        platformImage: '/logo-2.png',
      },
    ])

    expect(html.match(/The future of real elections/g)).toHaveLength(1)
    expect(html.match(/Vocdoni made elections easier\./g)).toHaveLength(1)
    expect(html.match(/Members trusted the result/g)).toHaveLength(1)
    expect(html.match(/The audit trail made the process easy to explain\./g)).toHaveLength(1)
    expect(html).toContain('testimonial-marquee-vertical_var(--marquee-duration)_linear_infinite')
  })

  it('deduplicates repeated testimonial data before rendering SSR output', () => {
    const duplicate = {
      name: 'Jordi Estiarte',
      handle: 'Mayor · Bellpuig City Council',
      avatar: '/avatar.png',
      rating: 5,
      title: 'The future of real elections',
      content: 'Vocdoni made elections easier.',
      platformName: 'Bellpuig',
      platformImage: '/logo.png',
    }
    const html = renderTestimonials([duplicate, duplicate])

    expect(html.match(/The future of real elections/g)).toHaveLength(1)
    expect(html.match(/Vocdoni made elections easier\./g)).toHaveLength(1)
  })
})
