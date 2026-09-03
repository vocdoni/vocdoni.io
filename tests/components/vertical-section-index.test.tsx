import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

import { VerticalSectionIndex } from '@/components/solutions/vertical/VerticalSectionIndex'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (_key: string, fallback: string) => fallback }),
}))

describe('VerticalSectionIndex', () => {
  it('renders accessible anchors in responsive navigation layouts', () => {
    const html = renderToStaticMarkup(
      <VerticalSectionIndex
        items={[
          { id: 'overview', label: 'Overview' },
          { id: 'legal-validity', label: 'Legal validity' },
        ]}
      />
    )

    expect(html).toContain('aria-label="On this page"')
    expect(html).toContain('href="#overview"')
    expect(html).toContain('href="#legal-validity"')
    expect(html).toContain('overflow-x-auto')
    expect(html).toContain('xl:flex-col')
  })
})
