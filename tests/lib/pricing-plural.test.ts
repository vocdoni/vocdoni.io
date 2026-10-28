import { createInstance, type i18n as I18n } from 'i18next'
import { beforeAll, describe, expect, it } from 'vitest'
import caCommon from '@/locales/ca/common.json'
import { formatPeople, pluralCount } from '@/lib/pricing/format'

describe('pluralCount', () => {
  it('keeps one as the singular count and everything else as other', () => {
    expect(pluralCount(1)).toBe(1)
    expect(pluralCount(2)).toBe(2)
    expect(pluralCount(1_000_000)).toBe(2)
  })
})

describe('people strings in ca', () => {
  let i18n: I18n

  beforeAll(async () => {
    i18n = createInstance()
    await i18n.init({
      lng: 'ca',
      fallbackLng: false,
      resources: { ca: { translation: caCommon } },
      interpolation: { escapeValue: false },
    })
  })

  it('renders the singular form at 1 person', () => {
    const people = 1
    expect(
      i18n.t('pricing.request.chip_people', { count: pluralCount(people), people: formatPeople(people, 'ca') })
    ).toBe('1 persona')
  })

  it('renders the other form at exactly 1,000,000 people, without falling back to English', () => {
    const people = 1_000_000
    expect(
      i18n.t('pricing.request.chip_people', { count: pluralCount(people), people: formatPeople(people, 'ca') })
    ).toBe(`${formatPeople(people, 'ca')} persones`)
  })
})
