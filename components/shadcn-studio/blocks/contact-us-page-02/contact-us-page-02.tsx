import { CalendarIcon, MailIcon, MessageCircleIcon } from 'lucide-react'

import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

import ContactForm from '@/components/shadcn-studio/blocks/contact-us-page-02/contact-form'

const ContactUs = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-muted'>
      <section className='relative py-16 sm:py-24 lg:py-32'>
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
              Contact
            </MotionPreset>

            <MotionPreset
              component='h1'
              className='mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'
              fade
              blur
              slide
              delay={0.2}
              transition={{ duration: 0.5 }}
            >
              Let&apos;s Talk About Your Governance Needs
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
              Whether you need secure voting for your organization or have questions about our platform, we&apos;re here
              to help. Reach out and let&apos;s build the future of digital governance together.
            </MotionPreset>
          </div>

          <MotionPreset fade blur slide delay={0.6} transition={{ duration: 0.5 }}>
            <Card className='border-2 shadow-2xl overflow-hidden'>
              <CardContent className='grid gap-0 md:grid-cols-5 p-0'>
                <Card className='bg-primary py-10 px-8 shadow-none rounded-none md:col-span-2 border-0'>
                  <CardContent className='text-primary-foreground space-y-8 p-0'>
                    <div className='space-y-3'>
                      <h2 className='text-2xl font-bold'>Get in Touch</h2>
                      <p className='text-primary-foreground/90 leading-relaxed'>
                        Choose the best way to connect with our team. We&apos;re here to answer your questions and
                        discuss how Vocdoni can help your organization.
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
                          Chat on WhatsApp
                        </Link>
                      </Button>

                      {/* Cal.com Schedule Button */}
                      <Button variant='secondary' size='lg' className='w-full justify-start gap-4' asChild>
                        <Link
                          href='https://cal.com/vocdoni'
                          target='_blank'
                          rel='noopener noreferrer'
                          variant='unstyled'
                        >
                          <CalendarIcon className='size-6 shrink-0' />
                          Schedule a Call
                        </Link>
                      </Button>
                    </div>

                    <div className='pt-4 border-t border-primary-foreground/20'>
                      <h3 className='text-sm font-semibold uppercase tracking-wide mb-4 opacity-90'>
                        Or email us directly
                      </h3>
                      {/* Email */}
                      <div className='flex items-start gap-3'>
                        <div className='bg-primary-foreground/10 p-2 rounded-lg'>
                          <MailIcon className='size-5 shrink-0' />
                        </div>
                        <div>
                          <Link
                            className='text-lg font-bold hover:underline decoration-2 underline-offset-2 transition-all'
                            href='mailto:contact@vocdoni.io'
                            variant='unstyled'
                          >
                            contact@vocdoni.io
                          </Link>
                          <p className='text-sm opacity-75 mt-1'>We typically respond within 24 hours</p>
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
