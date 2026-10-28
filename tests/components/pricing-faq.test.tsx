// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import enCommon from '@/locales/en/common.json'

const items = enCommon.pricing.faq.items

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (_key: string, defaultOrOptions?: string | { returnObjects?: boolean }) =>
      typeof defaultOrOptions === 'object' && defaultOrOptions?.returnObjects
        ? items
        : typeof defaultOrOptions === 'string'
          ? defaultOrOptions
          : _key,
    i18n: { language: 'en' },
  }),
}))

import PricingFaq from '@/components/app/pricing/PricingFaq'

describe('PricingFaq', () => {
  it('renders the pricing questions as an h2 followed by all seven questions', () => {
    render(<PricingFaq />)
    expect(screen.getByRole('heading', { level: 2, name: 'Pricing questions' })).toBeInTheDocument()
    expect(items).toHaveLength(7)
    expect(screen.getAllByRole('button')).toHaveLength(7)
    expect(screen.getByRole('button', { name: 'Do prices include VAT?' })).toBeInTheDocument()
  })
})
