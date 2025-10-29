import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { setCookieConsent } from '@/lib/cookieConsent'
import { useIsClient } from '@/lib/useIsClient'
import { send } from '@emailjs/browser'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from '../Link'
import { Textarea } from '../ui/textarea'

interface ContactFormData {
  name: string
  company: string
  email: string
  message: string
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error' | 'config_error' | 'captcha_error'

const errorShownTimeout = 15_000 // 15 seconds

export function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [showRecaptcha, setShowRecaptcha] = useState(false)
  const [formData, setFormData] = useState<ContactFormData | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const isClient = useIsClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const sendEmail = async (token: string) => {
    const data = formData
    if (!data) return

    try {
      // Send email with reCAPTCHA token
      await send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          company: data.company,
          message: data.message,
          time: new Date().toISOString(),
          'g-recaptcha-response': token,
        },
        EMAILJS_PUBLIC_KEY
      )

      setStatus('success')
      reset()
      setFormData(null)
      setShowRecaptcha(false)
      recaptchaRef.current?.reset()

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), errorShownTimeout)
    } catch (error) {
      console.error('[Contact Form] EmailJS send error:', error)
      setStatus('error')
      recaptchaRef.current?.reset()

      // Reset error message after 5 seconds
      setTimeout(() => setStatus('idle'), errorShownTimeout)
    }
  }

  const onRecaptchaChange = (token: string | null) => {
    if (token) {
      sendEmail(token)
    } else {
      console.error('[Contact Form] reCAPTCHA verification failed')
      setStatus('captcha_error')
      setShowRecaptcha(false)
      recaptchaRef.current?.reset()

      // Reset error message after 5 seconds
      setTimeout(() => setStatus('idle'), errorShownTimeout)
    }
  }

  const onSubmit = async (data: ContactFormData) => {
    // Validate EmailJS configuration
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.warn(
        '[Contact Form] EmailJS is not configured. Please set the following environment variables:\n' +
          '- EMAILJS_PUBLIC_KEY\n' +
          '- EMAILJS_SERVICE_ID\n' +
          '- EMAILJS_TEMPLATE_ID\n\n' +
          'See .env.example for details.'
      )
      setStatus('config_error')

      // Reset error message after 15 seconds
      setTimeout(() => setStatus('idle'), errorShownTimeout)
      return
    }

    // Validate reCAPTCHA configuration
    if (!RECAPTCHA_SITE_KEY) {
      console.warn(
        '[Contact Form] reCAPTCHA is not configured. Please set the following environment variable:\n' +
          '- RECAPTCHA_SITE_KEY\n\n' +
          'See .env.example for details.'
      )
      setStatus('config_error')

      // Reset error message after 15 seconds
      setTimeout(() => setStatus('idle'), errorShownTimeout)
      return
    }

    // Accept cookies (user clicked Submit, implying acceptance of privacy policy)
    setCookieConsent(true)

    // Store form data and show reCAPTCHA
    setFormData(data)
    setShowRecaptcha(true)
    setStatus('loading')

    // User will now complete the reCAPTCHA checkbox
    // Email will be sent automatically via onRecaptchaChange callback
  }

  return (
    <div className='min-h-screen w-full grid grid-cols-1 lg:grid-cols-2'>
      {/* Contact Overview */}
      <div className='flex-1 bg-background flex flex-col items-center justify-center'>
        <div className='w-full px-6 flex flex-col gap-6'>
          <p className='text-2xl lg:text-3xl font-medium mb-6'>
            → {t('contact.want_to_talk', { defaultValue: 'Want to talk with us?' })}
          </p>
          <h2 className='text-2xl md:text-4xl leading-tight font-semibold'>
            {t('contact.description', { defaultValue: "Let's Build the Future of Governance" })}
          </h2>
        </div>
      </div>

      {/* Contact Form */}
      <div className='flex-1 bg-background flex flex-col justify-center px-6'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)(e)
          }}
          className='grid grid-cols-1 lg:grid-cols-2 gap-3'
        >
          <div className='flex flex-col gap-1'>
            <Input
              {...register('name', {
                required: t('contact.errors.name_required', { defaultValue: 'Name is required' }),
              })}
              placeholder={t('contact.name_placeholder', { defaultValue: 'Name' })}
              className='h-11 bg-[#ECEEF2] border-0 placeholder:text-foreground/70 text-sm'
            />
            {errors.name && <span className='text-xs text-red-600'>{errors.name.message}</span>}
          </div>

          <div className='flex flex-col gap-1'>
            <Input
              {...register('company')}
              placeholder={t('contact.company_placeholder', { defaultValue: 'Company' })}
              className='h-11 bg-[#ECEEF2] border-0 placeholder:text-foreground/70 text-sm'
            />
          </div>

          <div className='lg:col-span-2 flex flex-col gap-1'>
            <Input
              type='email'
              {...register('email', {
                required: t('contact.errors.email_required', { defaultValue: 'Email is required' }),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('contact.errors.email_invalid', { defaultValue: 'Invalid email address' }),
                },
              })}
              placeholder={t('contact.email_placeholder', { defaultValue: 'Email' })}
              className='h-11 bg-[#ECEEF2] border-0 placeholder:text-foreground/70 text-sm'
            />
            {errors.email && <span className='text-xs text-red-600'>{errors.email.message}</span>}
          </div>

          <div className='lg:col-span-2 flex flex-col gap-1'>
            <Textarea
              {...register('message')}
              placeholder={t('contact.message_placeholder', { defaultValue: 'Message' })}
              className='min-h-40 bg-[#ECEEF2] border-0 placeholder:text-foreground/70 text-sm resize-y'
            />
          </div>

          <p className='lg:col-span-2 text-xs'>
            <Trans
              i18nKey='contact.disclaimer'
              defaults='By clicking the "Submit" button, you agree to the <1>privacy policy</1>.'
              components={{
                1: <Link variant='text' href='/privacy' />,
              }}
            />
          </p>

          {status === 'success' && (
            <div className='lg:col-span-2 p-3 bg-green-100 border border-green-400 text-green-700 text-sm rounded'>
              {t('contact.success', { defaultValue: "Message sent successfully! We'll get back to you soon." })}
            </div>
          )}

          {status === 'config_error' && (
            <div className='lg:col-span-2 p-3 bg-amber-100 border border-amber-400 text-amber-800 text-sm rounded'>
              {t('contact.error_not_configured', {
                defaultValue:
                  'Contact form is not configured yet. Please reach out to us directly via email or social media.',
              })}
            </div>
          )}

          {status === 'error' && (
            <div className='lg:col-span-2 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded'>
              {t('contact.error', { defaultValue: 'Failed to send message. Please try again later.' })}
            </div>
          )}

          {status === 'captcha_error' && (
            <div className='lg:col-span-2 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded'>
              {t('contact.captcha_error', {
                defaultValue: 'reCAPTCHA verification failed. Please try again.',
              })}
            </div>
          )}

          {/* reCAPTCHA Checkbox - Only loads after Submit (GDPR compliant) */}
          {RECAPTCHA_SITE_KEY && isClient && showRecaptcha && (
            <div className='lg:col-span-2'>
              <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={onRecaptchaChange} />
            </div>
          )}

          <div className='lg:col-span-2 mt-4'>
            <Button type='submit' size='sm' disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  {t('contact.sending', { defaultValue: 'Sending...' })}
                </>
              ) : (
                <>
                  {t('contact.submit_button', { defaultValue: 'Submit' })}
                  <ArrowUpRight className='ml-2 h-4 w-4' />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
