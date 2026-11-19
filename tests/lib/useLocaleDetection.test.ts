// @vitest-environment jsdom

import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

// Mock localeDetection so we can observe setLocalePreference calls without touching real cookies.
// setLocalePreference is the function that writes the nf_lang cookie; its own tests (localeDetection.test.ts)
// verify the cookie write. This test verifies that the hook calls it on every mount when a preference exists.
vi.mock('@/lib/localeDetection', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('@/lib/localeDetection')
  return { ...actual, setLocalePreference: vi.fn(), getLocalePreference: vi.fn(() => null) }
})

import { getLocalePreference, setLocalePreference } from '@/lib/localeDetection'
import { useLocaleDetection } from '@/lib/useLocaleDetection'

afterEach(() => {
  vi.clearAllMocks()
})

describe('useLocaleDetection nf_lang backfill', () => {
  it('calls setLocalePreference to backfill nf_lang when a preference is stored', async () => {
    // A visitor who saved 'ca' before nf_lang existed: getLocalePreference returns the stored value.
    vi.mocked(getLocalePreference).mockReturnValue('ca')

    // Render on a non-default-locale page so the hook returns before any redirect attempt.
    renderHook(() => useLocaleDetection('ca', '/pricing'))

    // After the isClient effect runs, the hook must call setLocalePreference so nf_lang is written.
    await waitFor(() => expect(vi.mocked(setLocalePreference)).toHaveBeenCalledWith('ca'))
  })
})
