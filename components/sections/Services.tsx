import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Heading, Paragraph } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '../Link'
import { Button } from '../ui/button'

export function Services() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<string | undefined>(undefined)

  const services = [
    {
      id: 'app',
      bg: 'bg-[#FBE3D9]',
      title: t('services.app', { defaultValue: 'APP' }),
      subtitle: t('services.app_desc_intro', { defaultValue: 'Quick, self-service digital voting.' }),
      description: t('services.app_desc', {
        defaultValue:
          'Run secure elections in minutes with our easy-to-use app. Perfect for associations, towns, cooperatives, or organizations that need simple, secure, and accessible voting without technical complexity.',
      }),
      buttonIcon: '🗳️',
      button: t('services.app_button', { defaultValue: 'Start your vote' }),
      href: 'https://app.vocdoni.io/admin/processes/create',
    },
    {
      id: 'sdk',
      bg: 'bg-[#F9CEBC]',
      title: t('services.sdk', { defaultValue: 'SDK' }),
      subtitle: t('services.sdk_desc_intro', {
        defaultValue: 'Built for developers and integrators.',
      }),
      description: t('services.sdk_desc', {
        defaultValue:
          'Our Software Development Kit lets you seamlessly integrate Vocdoni’s secure voting infrastructure into your own platforms. Scalable, open-source, and flexible for advanced customization.',
      }),
      buttonIcon: '🛠️',
      button: t('services.sdk_button', { defaultValue: 'Explore the SDK' }),
      href: 'https://developer.vocdoni.io/sdk',
    },
    {
      id: 'projects',
      bg: 'bg-[#F6B99F]',
      title: t('services.projects', { defaultValue: 'Projects' }),
      subtitle: t('services.projects_desc_intro', { defaultValue: 'Custom solutions for institutions.' }),
      description: t('services.projects_desc', {
        defaultValue:
          'For governments, enterprises, and large organizations that need tailored governance systems, we provide end-to-end solutions with expert support and dedicated infrastructure.',
      }),
      buttonIcon: '🏛️',
      button: t('services.projects_button', { defaultValue: 'Request a Custom Solution' }),
      href: '/contact',
    },
  ]

  return (
    <div className='min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 content-between lg:content-stretch'>
      {/* services Overview */}
      <div className='flex flex-col mt-5 lg:mt-20 xl:mt-0'>
        <div className='flex-1 bg-background flex flex-col items-center justify-center'>
          <div className='w-full px-6 flex flex-col gap-6'>
            <Heading variant='section'>→ {t('services.our_services', { defaultValue: 'Our Services' })}</Heading>
            <Paragraph variant='section'>
              {t('services.explanation', {
                defaultValue:
                  'Whether you need a quick self-service vote, developer integration, or a fully customised governance solution, Vocdoni has you covered.',
              })}
            </Paragraph>
          </div>
        </div>
        <div className='hidden lg:block w-full px-6 py-6'>
          <Link href='/impact' className='block text-2xl font-semibold text-muted-foreground'>
            {t('services.impact', { defaultValue: 'Impact in numbers' })} ↓
          </Link>
        </div>
      </div>

      {/* Accordion Container */}
      <div className='md:border-l md:border-black/10 min-h-0 flex flex-col justify-end bg-[#FBE3D9]'>
        <Accordion
          collapsible
          defaultValue='app'
          value={open}
          onValueChange={setOpen}
          type='single'
          className='w-full min-h-0 flex flex-col'
        >
          {services.map((service) => {
            const { id, bg, title, subtitle, description, buttonIcon, button, href } = service

            return (
              <AccordionItem
                key={id}
                value={id}
                variant='section'
                className={bg}
                onMouseEnter={() => setOpen(id)}
              >
                <AccordionTrigger
                  variant='section'
                  className={cn(bg, 'px-6 md:px-10 h-20 md:h-25')}
                >
                  <div className='flex w-full items-center justify-between'>
                    <span>{title}</span>
                    <ArrowUpRight
                      className={cn(
                        'h-5 w-5 origin-center transition-transform duration-200',
                        'group-data-[state=open]:rotate-90',
                        'group-data-[state=open]:translate-x-0.5 group-data-[state=open]:-translate-y-0.5'
                      )}
                      aria-hidden='true'
                    />
                  </div>
                </AccordionTrigger>

                <AccordionContent
                  variant='section'
                  className={cn(
                    bg,
                    'px-6 md:px-10 h-full',
                    'overflow-auto data-[state=open]:flex-1',
                    'data-[state=open]:[&>div]:min-h-0 data-[state=open]:[&>div]:h-full',
                    'flex flex-col justify-center gap-4'
                  )}
                >
                  <p className='mb-2 italic'>{subtitle}</p>
                  <p className='max-w-2xl'>{description}</p>
                  <div className='flex justify-end'>
                    <Button asChild variant='outline' className='flex gap-2'>
                      <Link href={href}>
                        <p>{buttonIcon}</p> <p>{button}</p> <p>→</p>
                      </Link>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
