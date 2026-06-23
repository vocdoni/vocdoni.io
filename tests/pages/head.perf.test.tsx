import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it } from 'vitest'

import { HeadTags } from '@/lib/seo-head'

const renderHead = (pageContext: any) => renderToStaticMarkup(<HeadTags {...pageContext} />)

describe('HeadTags resource hints', () => {
  beforeEach(() => {
    ;(globalThis as any).SITE_URL = 'https://vocdoni.io'
    ;(globalThis as any).PLAUSIBLE_DOMAIN = ''
  })

  it('does not load fonts from Google (self-hosted)', () => {
    const html = renderHead({ locale: 'en', urlLogical: '/' })
    expect(html).not.toContain('fonts.googleapis.com')
    expect(html).not.toContain('fonts.gstatic.com')
  })

  it('includes dns-prefetch for www.googletagmanager.com', () => {
    const html = renderHead({ locale: 'en', urlLogical: '/' })
    expect(html).toContain('googletagmanager.com')
  })

  it('includes dns-prefetch for plausible.io', () => {
    const html = renderHead({ locale: 'en', urlLogical: '/' })
    expect(html).toContain('plausible.io')
  })

  it('includes preconnect for youtube when on the app page', () => {
    const html = renderHead({ locale: 'en', urlLogical: '/app' })
    expect(html).toContain('youtube.com')
  })

  it('does not include youtube preconnect on non-app pages', () => {
    const html = renderHead({ locale: 'en', urlLogical: '/' })
    expect(html).not.toContain('youtube.com')
  })
})
