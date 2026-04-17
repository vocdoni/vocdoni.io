import { describe, expect, it, vi } from 'vitest'

import {
  buildEmailJsParams,
  getContactFormConfigError,
  type ContactFormConfig,
  type ContactFormValues,
} from '@/lib/contactForm'

describe('contact form helpers', () => {
  const baseConfig: ContactFormConfig = {
    emailJs: {
      publicKey: 'public',
      serviceId: 'service',
      templateId: 'template',
    },
    recaptchaSiteKey: 'recaptcha',
  }

  it('returns emailjs config error when any emailjs key missing', () => {
    const config: ContactFormConfig = {
      ...baseConfig,
      emailJs: { ...baseConfig.emailJs, publicKey: '' },
    }

    expect(getContactFormConfigError(config)).toBe('emailjs')
  })

  it('returns recaptcha config error when recaptcha site key missing', () => {
    const config: ContactFormConfig = {
      ...baseConfig,
      recaptchaSiteKey: '',
    }

    expect(getContactFormConfigError(config)).toBe('recaptcha')
  })

  it('prefers emailjs config errors over recaptcha when both missing', () => {
    const config: ContactFormConfig = {
      emailJs: {
        publicKey: '',
        serviceId: '',
        templateId: '',
      },
      recaptchaSiteKey: '',
    }

    expect(getContactFormConfigError(config)).toBe('emailjs')
  })

  it('returns null when config is valid', () => {
    expect(getContactFormConfigError(baseConfig)).toBeNull()
  })

  it('builds EmailJS params with subject and recaptcha token', () => {
    const data: ContactFormValues = {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      organization: 'Analytical Engines',
      subject: 'Governance help',
      message: 'Please help us with governance.',
    }
    const token = 'recaptcha-token'
    const now = new Date('2024-01-02T03:04:05.000Z')

    expect(buildEmailJsParams(data, token, now)).toEqual({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      organization: 'Analytical Engines',
      subject: 'Governance help',
      message: 'Please help us with governance.',
      time: '2024-01-02T03:04:05.000Z',
      'g-recaptcha-response': 'recaptcha-token',
    })
  })

  it('uses current time when no explicit date provided', () => {
    const data: ContactFormValues = {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      organization: '',
      subject: 'Hello',
      message: 'Test message.',
    }
    const token = 'recaptcha-token'

    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-01T10:20:30.000Z'))

    expect(buildEmailJsParams(data, token)).toMatchObject({
      time: '2025-06-01T10:20:30.000Z',
      'g-recaptcha-response': 'recaptcha-token',
    })

    vi.useRealTimers()
  })
})
