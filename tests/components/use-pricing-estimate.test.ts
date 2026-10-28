// @vitest-environment jsdom

import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { usePricingEstimate } from '@/components/app/pricing/usePricingEstimate'
import { LADDER } from '@/lib/pricing/ladder'

import { PRICING_FIXTURES, fixtureKey, mockPricingFetch } from '../lib/pricing-fixtures'

afterEach(() => {
  vi.unstubAllGlobals()
})

/** Renders the hook once its mount-time add-on price list has landed, so that update happens inside waitFor. */
async function renderSettled() {
  vi.stubGlobal('fetch', mockPricingFetch())
  const hook = renderHook(() => usePricingEstimate())
  await waitFor(() => expect(hook.result.current.addonPrices).not.toBeNull())
  return hook
}

describe('usePricingEstimate.stepDown', () => {
  it('steps from a typed count above 50,000 down to 50,000, not to the sentinel', async () => {
    const { result } = await renderSettled()
    act(() => result.current.setVoters(60000, 'input'))
    act(() => result.current.stepDown())
    expect(result.current.voters).toBe(50000)
  })

  it('steps from the slider terminal down to 50,000 as well', async () => {
    const { result } = await renderSettled()
    act(() => result.current.setLadderIndex(LADDER.length - 1))
    act(() => result.current.stepDown())
    expect(result.current.voters).toBe(50000)
  })

  it('keeps the typed count on stepUp above 50,000 rather than moving to the sentinel', async () => {
    const { result } = await renderSettled()
    act(() => result.current.setVoters(60000, 'input'))
    act(() => result.current.stepUp())
    expect(result.current.voters).toBe(60000)
  })
})

describe('usePricingEstimate.requested', () => {
  it('keeps the add-ons of the shown estimate until the new one arrives', async () => {
    vi.stubGlobal('fetch', mockPricingFetch())
    const { result } = renderHook(() => usePricingEstimate(200))
    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(result.current.requested).toEqual({ voters: 200, addons: {}, estimate: result.current.estimate })

    act(() => result.current.toggleAddon('sms', true))
    // The debounce has not settled: the figure on screen is still the one without text messages.
    expect(result.current.status).toBe('loading')
    expect(result.current.requested.addons).toEqual({})
    expect(result.current.requested.estimate?.totalCents).toBe(PRICING_FIXTURES['200'].totalCents)

    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(result.current.requested.addons).toEqual({ sms: true })
    expect(result.current.requested.estimate?.totalCents).toBe(PRICING_FIXTURES['200 smsTwoFA'].totalCents)
  })

  it('falls back to the current choice when there is no estimate to show', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('{}', { status: 503 }))
    )
    const { result } = renderHook(() => usePricingEstimate(200))
    await waitFor(() => expect(result.current.status).toBe('error'))
    act(() => result.current.toggleAddon('branding', true))
    expect(result.current.requested).toEqual({ voters: 200, addons: { branding: true }, estimate: null })
  })
})

describe('usePricingEstimate add-on prices', () => {
  it('retries the price list after a transient failure, so the rows get their prices', async () => {
    const serve = mockPricingFetch()
    let priceListCalls = 0
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        if (fixtureKey(url) === '100 smsTwoFA signedCertificate branding customUrl' && priceListCalls++ === 0) {
          return new Response('{}', { status: 503 })
        }
        return serve(url)
      })
    )
    const { result } = renderHook(() => usePricingEstimate(200))
    expect(result.current.addonPrices).toBeNull()
    await waitFor(() => expect(result.current.addonPrices).not.toBeNull(), { timeout: 3000 })
    expect(priceListCalls).toBe(2)
  })
})
