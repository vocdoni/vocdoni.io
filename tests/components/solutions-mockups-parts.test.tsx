import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AppResultRow, formatScheduleFields } from '@/components/solutions/mockups/parts'

const i18n = vi.hoisted(() => ({ language: 'en' }))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, fallback: string, values?: Record<string, string>) =>
      Object.entries(values ?? {}).reduce((text, [key, value]) => text.replace(`{{${key}}}`, value), fallback),
    i18n,
  }),
}))

describe('AppResultRow', () => {
  beforeEach(() => {
    i18n.language = 'en'
  })

  it('places the percent sign by the locale convention', () => {
    i18n.language = 'de'
    const html = renderToStaticMarkup(<AppResultRow label='Yes' votes={1} total={8} />)

    expect(html).toMatch(/12,5\s%/)
  })

  it('keeps one decimal at most', () => {
    const html = renderToStaticMarkup(<AppResultRow label='Yes' votes={1} total={3} />)

    expect(html).toContain('(33.3%)')
  })
})

describe('formatScheduleFields', () => {
  it('leaves the year out so the fixed demo dates never read as stale', () => {
    const fields = formatScheduleFields('en', new Date(2026, 5, 12, 9, 0), new Date(2026, 5, 13, 18, 30))

    expect(fields.startDate).toBe('June 12')
    expect(fields.endDate).toBe('June 13')
    expect(fields.startDate).not.toMatch(/2026/)
  })
})
