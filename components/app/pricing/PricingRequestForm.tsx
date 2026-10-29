import { CheckIcon, CopyIcon, ExternalLinkIcon, Loader2Icon, MailIcon, SendIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { send } from '@emailjs/browser'

import { AddonTitle } from '@/components/app/pricing/AddonRows'
import { CalBookingDialog } from '@/components/CalBookingDialog'
import { Link } from '@/components/Link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAppAuthUrl } from '@/hooks/useAppAuthUrl'
import { getContactFormConfigError } from '@/lib/contactForm'
import { AnalyticsEvents, trackAnalyticsEvent, type AnalyticsEventName } from '@/lib/analytics'
import { setCookieConsent } from '@/lib/cookieConsent'
import { formatCurrency, formatPeople, pluralCount } from '@/lib/pricing/format'
import { ONE_TIME_ADDONS, PER_VOTE_ADDONS, PRICING_CONTACT_EMAIL } from '@/lib/pricing/constants'
import { countryOptions, defaultCountry } from '@/lib/pricing/countries'
import { buildReference } from '@/lib/pricing/reference'
import {
  buildPricingCopyText,
  buildPricingEmailParams,
  buildPricingGmailUrl,
  buildPricingMailto,
  buildPricingOutlookUrl,
  type PricingRequestContext,
  type PricingRequestValues,
  type RequestedPrice,
} from '@/lib/pricing/request'
import { useIsClient } from '@/lib/useIsClient'
import { cn } from '@/lib/utils'

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error' | 'captcha_error'

type PricingRequestFormProps = {
  request: RequestedPrice
  locale: string
  open: boolean
  /** Bumped by the section on every "request" click, so a finished form can be opened again. */
  openCount?: number
  onSent?: (info: { reference: string; hasMessage: boolean; country: string }) => void
}

export function PricingRequestForm({ request, locale, open, openCount = 0, onSent }: PricingRequestFormProps) {
  const { estimate } = request
  const { t } = useTranslation()
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [showRecaptcha, setShowRecaptcha] = useState(false)
  const [formData, setFormData] = useState<PricingRequestValues | null>(null)
  const [pendingContext, setPendingContext] = useState<PricingRequestContext | null>(null)
  const [reference, setReference] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  /** Whether this opening of the form has already reported `pricing_request_started`. */
  const startedRef = useRef(false)
  const isClient = useIsClient()
  const signupUrl = useAppAuthUrl('signup')

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PricingRequestValues>()

  // Funnel events between "opened" and "sent". Never the name, email, organisation or message: only the
  // configuration being asked about and what happened to the request.
  const track = (name: AnalyticsEventName, props: Record<string, string | number | boolean> = {}) =>
    trackAnalyticsEvent({ name, props: { zone: estimate?.zone ?? 'unavailable', people: request.voters, ...props } })

  const configError = getContactFormConfigError({
    emailJs: {
      publicKey: EMAILJS_PUBLIC_KEY,
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_PRICING_TEMPLATE_ID,
    },
    recaptchaSiteKey: RECAPTCHA_SITE_KEY,
  })

  useEffect(() => {
    if (!open) return
    // Opened again after a successful send: start a fresh request for the current configuration.
    setStatus((current) => (current === 'success' ? 'idle' : current))
    startedRef.current = false
    requestAnimationFrame(() => setFocus('name'))
    // Start the dropdown on the page language's country (Spain by default); the visitor can change it.
    if (!getValues('country')) setValue('country', defaultCountry(locale))
  }, [open, openCount, setFocus, getValues, setValue, locale])

  const sendEmail = async (token: string) => {
    const data = formData
    const ctx = pendingContext
    if (!data || !ctx) return

    try {
      const params = buildPricingEmailParams(data, request, ctx, token)
      await send(EMAILJS_SERVICE_ID, EMAILJS_PRICING_TEMPLATE_ID, params, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      reset()
      setShowRecaptcha(false)
      recaptchaRef.current?.reset()
      onSent?.({ reference: ctx.reference, hasMessage: !!data.message, country: data.country ?? '' })
    } catch (error) {
      console.error('[Pricing Request] EmailJS send error:', error)
      track(AnalyticsEvents.PricingRequestFailed, { reason: 'send_error' })
      setStatus('error')
      setShowRecaptcha(false)
      recaptchaRef.current?.reset()
    }
  }

  const onRecaptchaChange = (token: string | null) => {
    if (token) {
      void sendEmail(token)
      return
    }
    console.error('[Pricing Request] reCAPTCHA verification failed')
    track(AnalyticsEvents.PricingRequestFailed, { reason: 'captcha' })
    setStatus('captcha_error')
    setShowRecaptcha(false)
    recaptchaRef.current?.reset()
  }

  const onSubmit = (data: PricingRequestValues) => {
    // Honeypot: non-empty means a bot; silently succeed without sending
    if (data.website) {
      setReference(buildReference())
      setStatus('success')
      return
    }

    const ref = buildReference()
    const pageUrl = window.location.href.split('#')[0]
    const ctx: PricingRequestContext = { reference: ref, locale, pageUrl }

    if (configError) {
      track(AnalyticsEvents.PricingRequestFailed, { reason: `missing_${configError}` })
      setReference(ref)
      setPendingContext(ctx)
      setFormData(data)
      setStatus('error')
      return
    }

    setCookieConsent(true)
    setReference(ref)
    setPendingContext(ctx)
    setFormData(data)
    setShowRecaptcha(true)
    setStatus('loading')
  }

  if (!open) return null

  const isQuote = estimate?.zone === 'quote'
  const isFreeNoCharge = estimate?.zone === 'free' && estimate.totalCents === 0
  const title = isQuote
    ? t('pricing.request.title_quote', 'Request a quote')
    : t('pricing.request.title', 'Request this price')

  // Success state: replaces the form
  if (status === 'success') {
    return (
      <div id='pricing-request' className='rounded-card border border-border bg-background p-5 sm:p-8'>
        <div className='flex flex-col gap-5'>
          <div className='flex items-center gap-3'>
            <div className='flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary'>
              <CheckIcon className='size-5 text-primary' />
            </div>
            <h3 className='text-xl'>{t('pricing.request.success_title', 'Request received')}</h3>
          </div>
          {reference && (
            <p className='text-sm font-medium tabular-nums'>
              {t('pricing.request.success_reference', 'Your reference: {{reference}}', { reference })}
            </p>
          )}
          {formData && (
            <p className='text-sm text-muted-foreground'>
              {t('pricing.request.success_reply', 'The Vocdoni team will write to {{email}} within one business day.', {
                email: formData.email,
              })}
            </p>
          )}
          <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <CalBookingDialog
              triggerAriaLabel={t('pricing.request.book_call', 'Book a call')}
              location='pricing_request'
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'w-full sm:w-auto')}
            >
              {t('pricing.request.book_call', 'Book a call')}
            </CalBookingDialog>
            {isFreeNoCharge && (
              <Button size='lg' className='w-full sm:w-auto has-[>svg]:px-6' asChild>
                <Link href={signupUrl} ctaId='pricing_request_signup' target='_blank' variant='unstyled'>
                  {t('pricing.request.create_account', 'Create your free account')}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Error state: replaces the form with ways to send the same request by email
  if (status === 'error' && formData && pendingContext) {
    const mailto = buildPricingMailto(formData, request, pendingContext)
    const gmailUrl = buildPricingGmailUrl(formData, request, pendingContext)
    const outlookUrl = buildPricingOutlookUrl(formData, request, pendingContext)
    const trackFallback = (method: 'gmail' | 'outlook' | 'mailto' | 'copy') =>
      track(AnalyticsEvents.PricingRequestFallbackUsed, { method })
    const copyText = async () => {
      trackFallback('copy')
      try {
        await navigator.clipboard.writeText(buildPricingCopyText(formData, request, pendingContext))
        setCopied(true)
        window.setTimeout(() => setCopied(false), 2500)
      } catch {
        // No clipboard access: the address stays on screen to copy by hand.
      }
    }
    return (
      <div id='pricing-request' className='rounded-card border border-border bg-background p-5 sm:p-8'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-xl text-destructive'>
              {t('pricing.request.error_title', 'We could not send your request from here')}
            </h3>
            <p className='text-sm text-muted-foreground'>
              {t('pricing.request.error_body', 'Send it by email instead; we have filled it in for you.')}
            </p>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <Button size='lg' className='w-full sm:w-auto has-[>svg]:px-6' asChild>
              <a href={gmailUrl} target='_blank' rel='noopener noreferrer' onClick={() => trackFallback('gmail')}>
                <ExternalLinkIcon className='size-4' aria-hidden />
                {t('pricing.request.error_gmail', 'Open in Gmail')}
              </a>
            </Button>
            <Button size='lg' variant='outline' className='w-full sm:w-auto' asChild>
              <a href={outlookUrl} target='_blank' rel='noopener noreferrer' onClick={() => trackFallback('outlook')}>
                <ExternalLinkIcon className='size-4' aria-hidden />
                {t('pricing.request.error_outlook', 'Open in Outlook')}
              </a>
            </Button>
            <Button size='lg' variant='outline' className='w-full sm:w-auto' asChild>
              <a href={mailto} onClick={() => trackFallback('mailto')}>
                <MailIcon className='size-4' aria-hidden />
                {t('pricing.request.error_cta', 'Other email app')}
              </a>
            </Button>
          </div>
          <div className='flex flex-col gap-2 rounded-md bg-secondary p-4 text-sm sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-muted-foreground'>
              {t('pricing.request.error_copy_hint', 'Using another email? Copy the text and send it to {{email}}.', {
                email: PRICING_CONTACT_EMAIL,
              })}
            </p>
            <Button variant='outline' size='sm' className='shrink-0' onClick={copyText}>
              {copied ? <CheckIcon className='size-4' aria-hidden /> : <CopyIcon className='size-4' aria-hidden />}
              {copied ? t('pricing.request.error_copied', 'Copied') : t('pricing.request.error_copy', 'Copy text')}
            </Button>
          </div>
          <div>
            <Button variant='ghost' size='sm' className='-ml-3 text-muted-foreground' onClick={() => setStatus('idle')}>
              {t('pricing.request.retry', 'Try again')}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Chips: what the visitor asked for, then the full total (this vote plus any one-time setup)
  const requestedAddons = [...PER_VOTE_ADDONS, ...ONE_TIME_ADDONS].filter((key) => request.addons[key])
  const showTotalChip = !!estimate && estimate.priceAvailable && estimate.totalCents > 0

  const chipClass = 'rounded-full border border-border bg-secondary px-3 py-1 text-sm tabular-nums'

  return (
    <div id='pricing-request' className='rounded-card border border-border bg-background p-5 sm:p-8'>
      <div className='flex flex-col gap-6'>
        {/* Header */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl'>{title}</h3>
          <p className='text-muted-foreground'>
            {t(
              'pricing.request.intro',
              'Tell us who you are and we reply with a written estimate, usually within one business day.'
            )}
          </p>
        </div>

        {/* Configuration chips */}
        <div className='flex flex-wrap gap-2'>
          <span className={chipClass}>
            {t('pricing.request.chip_people', '{{people}} people', {
              count: pluralCount(request.voters),
              people: formatPeople(request.voters, locale),
            })}
          </span>
          {requestedAddons.map((key) => (
            <span key={key} className={chipClass}>
              <AddonTitle addonKey={key} />
            </span>
          ))}
          {showTotalChip && (
            <span className={cn(chipClass, 'border-primary/30 bg-primary/10 font-medium text-foreground')}>
              {t('pricing.request.chip_full_total', 'Total {{total}} + VAT', {
                total: formatCurrency(estimate.totalCents, locale),
              })}
            </span>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit, (fieldErrors) =>
            track(AnalyticsEvents.PricingRequestInvalid, { fields: Object.keys(fieldErrors).sort().join(',') })
          )}
          onInput={() => {
            if (startedRef.current) return
            startedRef.current = true
            track(AnalyticsEvents.PricingRequestStarted)
          }}
          noValidate
        >
          <div className='grid gap-5 sm:grid-cols-2'>
            {/* Name */}
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='pricing-req-name'>{t('pricing.request.name', 'Your name')} *</Label>
              <Input
                type='text'
                id='pricing-req-name'
                aria-required='true'
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'pricing-req-name-error' : undefined}
                autoComplete='name'
                {...register('name', {
                  required: t('pricing.request.errors.name_required', 'Enter your name'),
                })}
              />
              {errors.name && (
                <span id='pricing-req-name-error' role='alert' className='text-xs text-destructive'>
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='pricing-req-email'>{t('pricing.request.email', 'Email')} *</Label>
              <Input
                type='email'
                id='pricing-req-email'
                aria-required='true'
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'pricing-req-email-error' : undefined}
                autoComplete='email'
                {...register('email', {
                  required: t('pricing.request.errors.email_required', 'Enter your email'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('pricing.request.errors.email_invalid', 'Enter a valid email address'),
                  },
                })}
              />
              {errors.email && (
                <span id='pricing-req-email-error' role='alert' className='text-xs text-destructive'>
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Organisation */}
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='pricing-req-org'>{t('pricing.request.organization', 'Organisation')} *</Label>
              <Input
                type='text'
                id='pricing-req-org'
                aria-required='true'
                aria-invalid={errors.organization ? 'true' : undefined}
                aria-describedby={errors.organization ? 'pricing-req-org-error' : undefined}
                autoComplete='organization'
                {...register('organization', {
                  required: t('pricing.request.errors.organization_required', 'Enter your organisation'),
                })}
              />
              {errors.organization && (
                <span id='pricing-req-org-error' role='alert' className='text-xs text-destructive'>
                  {errors.organization.message}
                </span>
              )}
            </div>

            {/* Country */}
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='pricing-req-country'>{t('pricing.request.country', 'Country')} *</Label>
              <select
                id='pricing-req-country'
                aria-required='true'
                aria-invalid={errors.country ? 'true' : undefined}
                aria-describedby={errors.country ? 'pricing-req-country-error' : undefined}
                autoComplete='country'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm'
                {...register('country', {
                  required: t('pricing.request.errors.country_required', 'Select your country'),
                })}
              >
                <option value=''>{t('pricing.request.country_placeholder', 'Select your country')}</option>
                {countryOptions(locale).map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span id='pricing-req-country-error' role='alert' className='text-xs text-destructive'>
                  {errors.country.message}
                </span>
              )}
            </div>

            {/* Message (full width, optional) */}
            <div className='flex flex-col gap-1.5 sm:col-span-2'>
              <Label htmlFor='pricing-req-message'>
                {t('pricing.request.message', 'Anything we should know (optional)')}
              </Label>
              <Textarea
                id='pricing-req-message'
                autoComplete='off'
                className='min-h-[100px] resize-none'
                placeholder={t(
                  'pricing.request.message_placeholder',
                  'Dates, several votes this year, questions about your list...'
                )}
                {...register('message')}
              />
            </div>

            {/* Honeypot */}
            <input tabIndex={-1} autoComplete='off' aria-hidden className='sr-only' {...register('website')} />

            {/* Privacy sentence */}
            <p className='text-xs text-muted-foreground sm:col-span-2'>
              <Trans
                i18nKey='pricing.request.privacy'
                defaults='By sending this request you accept the <plink>privacy policy</plink>. Vocdoni uses these details only to prepare your estimate and answer your request.'
                components={{
                  plink: <Link href='/privacy' />,
                }}
              />
            </p>

            {/* Inline status messages */}
            {status === 'captcha_error' && (
              <div
                className='rounded-md border border-border bg-secondary p-3 text-sm text-destructive sm:col-span-2'
                role='alert'
              >
                {t('pricing.request.captcha_error', 'reCAPTCHA verification failed. Please try again.')}
              </div>
            )}

            {/* reCAPTCHA (deferred, client only) */}
            {RECAPTCHA_SITE_KEY && isClient && showRecaptcha && (
              <div className='sm:col-span-2'>
                <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={onRecaptchaChange} />
              </div>
            )}

            {/* Submit */}
            <div className='sm:col-span-2'>
              <Button
                type='submit'
                size='lg'
                className={cn('w-full sm:w-auto has-[>svg]:px-6')}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2Icon className='size-4 animate-spin' />
                    {t('pricing.request.sending', 'Sending...')}
                  </>
                ) : (
                  <>
                    <SendIcon className='size-4' />
                    {t('pricing.request.submit', 'Send request')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
