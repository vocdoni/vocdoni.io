import { CalendarIcon, MailIcon, MessageCircleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CalBookingDialog } from '@/components/CalBookingDialog'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

import ContactForm from '@/components/shadcn-studio/blocks/contact-us-page-02/contact-form'

const ContactUs = () => {
  const { t } = useTranslation()
  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-muted'>
      <section className='relative pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center mb-12 sm:mb-16 lg:mb-20'>
            <MotionPreset
              component='p'
              className='text-primary mb-4 text-sm font-medium uppercase tracking-wide'
              fade
              blur
              slide
              transition={{ duration: 0.5 }}
            >
              {t('contact.page_eyebrow', 'Contact')}
            </MotionPreset>

            <MotionPreset
              component='h1'
              className='mb-6 text-4xl sm:text-5xl lg:text-6xl'
              fade
              blur
              slide
              delay={0.2}
              transition={{ duration: 0.5 }}
            >
              {t('contact.page_title', "Let's talk about your governance needs")}
            </MotionPreset>

            <MotionPreset
              component='p'
              className='text-muted-foreground mb-8 text-lg sm:text-xl lg:text-2xl'
              fade
              blur
              slide
              delay={0.4}
              transition={{ duration: 0.5 }}
            >
              {t(
                'contact.page_subtitle',
                "Whether you need secure voting for your organization or have questions about our platform, we're here to help. Reach out and let's build the future of digital governance together."
              )}
            </MotionPreset>
          </div>

          <MotionPreset fade blur slide delay={0.6} transition={{ duration: 0.5 }}>
            <Card className='border-2 shadow-2xl overflow-hidden'>
              <CardContent className='grid gap-0 md:grid-cols-5 p-0'>
                <Card className='bg-primary py-10 px-8 shadow-none rounded-none md:col-span-2 border-0'>
                  <CardContent className='text-primary-foreground space-y-8 p-0'>
                    <div className='space-y-3'>
                      <h2 className='text-2xl'>{t('contact.get_in_touch_title', 'Get in touch')}</h2>
                      <p className='text-primary-foreground/90 leading-relaxed'>
                        {t(
                          'contact.get_in_touch_description',
                          "Choose the best way to connect with our team. We're here to answer your questions and discuss how Vocdoni can help your organization."
                        )}
                      </p>
                    </div>

                    <div className='space-y-4'>
                      {/* WhatsApp Button */}
                      <Button variant='secondary' size='lg' className='w-full justify-start gap-4' asChild>
                        <Link
                          href='https://wa.me/34621501155'
                          target='_blank'
                          rel='noopener noreferrer'
                          variant='unstyled'
                        >
                          <MessageCircleIcon className='size-6 shrink-0' />
                          {t('contact.whatsapp_button', 'Chat on WhatsApp')}
                        </Link>
                      </Button>

                      {/* Cal.com Schedule Button */}
                      <CalBookingDialog
                        className='inline-flex h-11 w-full items-center justify-start gap-4 rounded-md bg-secondary px-8 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80'
                        triggerAriaLabel='Open schedule a call booking'
                      >
                        <>
                          <CalendarIcon className='size-6 shrink-0' />
                          {t('contact.schedule_call_button', 'Schedule a call')}
                        </>
                      </CalBookingDialog>
                    </div>

                    <div className='pt-4 border-t border-primary-foreground/20'>
                      <h3 className='text-sm font-semibold uppercase tracking-wide mb-4 opacity-90'>
                        {t('contact.or_email_directly', 'Or email us directly')}
                      </h3>
                      {/* Email */}
                      <div className='flex items-start gap-3'>
                        <div className='bg-primary-foreground/10 p-2 rounded-lg'>
                          <MailIcon className='size-5 shrink-0' />
                        </div>
                        <div>
                          <Link
                            className='text-lg font-bold hover:underline decoration-2 underline-offset-2 transition-colors'
                            href='mailto:contact@vocdoni.org'
                            variant='unstyled'
                          >
                            contact@vocdoni.org
                          </Link>
                          <p className='text-sm opacity-75 mt-1'>
                            {t('contact.email_response_time', 'We typically respond within 24 hours')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Form Section */}
                <div className='md:col-span-3 bg-card'>
                  <ContactForm />
                </div>
              </CardContent>
            </Card>
          </MotionPreset>
        </div>
      </section>
    </div>
  )
}

export default ContactUs
