import { Loader2Icon, SendIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'

import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { buildEmailJsParams, getContactFormConfigError, type ContactFormValues } from '@/lib/contactForm'
import { setCookieConsent } from '@/lib/cookieConsent'
import { useIsClient } from '@/lib/useIsClient'
import { send } from '@emailjs/browser'

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error' | 'config_error' | 'captcha_error'

const errorShownTimeout = 15_000

const ContactForm = () => {
  const { t } = useTranslation()
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [showRecaptcha, setShowRecaptcha] = useState(false)
  const [formData, setFormData] = useState<ContactFormValues | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const isClient = useIsClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>()

  const configError = getContactFormConfigError({
    emailJs: {
      publicKey: EMAILJS_PUBLIC_KEY,
      serviceId: EMAILJS_SERVICE_ID,
      templateId: EMAILJS_TEMPLATE_ID,
    },
    recaptchaSiteKey: RECAPTCHA_SITE_KEY,
  })

  const resetStatusLater = () => {
    setTimeout(() => setStatus('idle'), errorShownTimeout)
  }

  const sendEmail = async (token: string) => {
    const data = formData
    if (!data) return

    try {
      await send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, buildEmailJsParams(data, token), EMAILJS_PUBLIC_KEY)

      setStatus('success')
      reset()
      setFormData(null)
      setShowRecaptcha(false)
      recaptchaRef.current?.reset()
      resetStatusLater()
    } catch (error) {
      console.error('[Contact Form] EmailJS send error:', error)
      setStatus('error')
      recaptchaRef.current?.reset()
      resetStatusLater()
    }
  }

  const onRecaptchaChange = (token: string | null) => {
    if (token) {
      sendEmail(token)
      return
    }

    console.error('[Contact Form] reCAPTCHA verification failed')
    setStatus('captcha_error')
    setShowRecaptcha(false)
    recaptchaRef.current?.reset()
    resetStatusLater()
  }

  const onSubmit = async (data: ContactFormValues) => {
    if (configError) {
      if (configError === 'emailjs') {
        console.warn(
          '[Contact Form] EmailJS is not configured. Please set the following environment variables:\n' +
            '- EMAILJS_PUBLIC_KEY\n' +
            '- EMAILJS_SERVICE_ID\n' +
            '- EMAILJS_TEMPLATE_ID\n\n' +
            'See .env.example for details.'
        )
      }

      if (configError === 'recaptcha') {
        console.warn(
          '[Contact Form] reCAPTCHA is not configured. Please set the following environment variable:\n' +
            '- RECAPTCHA_SITE_KEY\n\n' +
            'See .env.example for details.'
        )
      }

      setStatus('config_error')
      resetStatusLater()
      return
    }

    setCookieConsent(true)
    setFormData(data)
    setShowRecaptcha(true)
    setStatus('loading')
  }

  return (
    <form className='space-y-6 p-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid gap-6 md:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='name' className='text-sm font-medium'>
            {t('contact.name', { defaultValue: 'Name' })} *
          </Label>
          <Input
            type='text'
            id='name'
            aria-required='true'
            aria-describedby={errors.name ? 'name-error' : undefined}
            autoComplete='name'
            className='h-12 border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
            placeholder={t('contact.name_placeholder', { defaultValue: 'John Doe' })}
            {...register('name', {
              required: t('contact.errors.name_required', { defaultValue: 'Name is required' }),
            })}
          />
          {errors.name && (
            <span id='name-error' role='alert' className='text-xs text-red-600'>
              {errors.name.message}
            </span>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email' className='text-sm font-medium'>
            {t('contact.email', { defaultValue: 'Email' })} *
          </Label>
          <Input
            type='email'
            id='email'
            aria-required='true'
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete='email'
            className='h-12 border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
            placeholder={t('contact.email_placeholder', { defaultValue: 'john@example.com' })}
            {...register('email', {
              required: t('contact.errors.email_required', { defaultValue: 'Email is required' }),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('contact.errors.email_invalid', { defaultValue: 'Invalid email address' }),
              },
            })}
          />
          {errors.email && (
            <span id='email-error' role='alert' className='text-xs text-red-600'>
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='organization' className='text-sm font-medium'>
          {t('contact.organization', { defaultValue: 'Organization' })}
        </Label>
        <Input
          type='text'
          id='organization'
          autoComplete='organization'
          className='h-12 border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
          placeholder={t('contact.organization_placeholder', { defaultValue: 'Your company or organization' })}
          {...register('organization')}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='subject' className='text-sm font-medium'>
          {t('contact.subject', { defaultValue: 'Subject' })} *
        </Label>
        <Input
          type='text'
          id='subject'
          aria-required='true'
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          autoComplete='off'
          className='h-12 border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
          placeholder={t('contact.subject_placeholder', { defaultValue: 'What can we help you with?' })}
          {...register('subject', {
            required: t('contact.errors.subject_required', { defaultValue: 'Subject is required' }),
          })}
        />
        {errors.subject && (
          <span id='subject-error' role='alert' className='text-xs text-red-600'>
            {errors.subject.message}
          </span>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='message' className='text-sm font-medium'>
          {t('contact.message', { defaultValue: 'Message' })} *
        </Label>
        <Textarea
          id='message'
          aria-required='true'
          aria-describedby={errors.message ? 'message-error' : undefined}
          autoComplete='off'
          className='min-h-[160px] resize-none border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
          placeholder={t('contact.message_placeholder', {
            defaultValue: 'Tell us about your voting or governance needs...',
          })}
          {...register('message', {
            required: t('contact.errors.message_required', { defaultValue: 'Message is required' }),
          })}
        />
        {errors.message && (
          <span id='message-error' role='alert' className='text-xs text-red-600'>
            {errors.message.message}
          </span>
        )}
      </div>

      <p className='text-xs text-muted-foreground'>
        <Trans
          i18nKey='contact.disclaimer'
          defaults='By clicking the "Submit" button, you agree to the <plink>privacy policy</plink>.'
          components={{
            plink: <Link href='/privacy' />,
          }}
        />
      </p>

      {status === 'success' && (
        <div className='p-3 bg-green-100 border border-green-400 text-green-700 text-sm rounded'>
          {t('contact.success', { defaultValue: "Message sent successfully! We'll get back to you soon." })}
        </div>
      )}

      {status === 'config_error' && (
        <div className='p-3 bg-amber-100 border border-amber-400 text-amber-800 text-sm rounded'>
          {t('contact.error_not_configured', {
            defaultValue:
              'Contact form is not configured yet. Please reach out to us directly via email or social media.',
          })}
        </div>
      )}

      {status === 'error' && (
        <div className='p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded'>
          {t('contact.error', { defaultValue: 'Failed to send message. Please try again later.' })}
        </div>
      )}

      {status === 'captcha_error' && (
        <div className='p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded'>
          {t('contact.captcha_error', { defaultValue: 'reCAPTCHA verification failed. Please try again.' })}
        </div>
      )}

      {RECAPTCHA_SITE_KEY && isClient && showRecaptcha && (
        <div>
          <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={onRecaptchaChange} />
        </div>
      )}

      <div className='pt-2'>
        <Button type='submit' size='lg' className='w-full has-[>svg]:px-6' disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              {t('contact.sending', { defaultValue: 'Sending...' })}
              <Loader2Icon className='ml-2 h-5 w-5 animate-spin' />
            </>
          ) : (
            <>
              {t('contact.submit_button', { defaultValue: 'Send Message' })}
              <SendIcon className='ml-2 h-5 w-5' />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default ContactForm
