import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '../Link'

export function Technology() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<string | undefined>(undefined)

  const rows = [
    {
      key: 'transparent',
      label: t('technology.transparent', { defaultValue: 'Transparent' }),
      description: t('technology.transparent_desc', {
        defaultValue:
          'Every process is open-source and fully auditable. From ballot creation to vote counting, anyone can verify the integrity of the election, eliminating the need for blind trust in intermediaries.',
      }),
      bg: 'bg-[#FFFBEA]',
    },
    {
      key: 'secure',
      label: t('technology.secure', { defaultValue: 'Secure' }),
      description: t('technology.secure_desc', {
        defaultValue:
          'Advanced cryptography and zero-knowledge proofs keep every vote secret while keeping results fully verifiable. Voters remain anonymous, yet the election outcome is beyond doubt.',
      }),
      bg: 'bg-[#FEF6D7]',
    },
    {
      key: 'efficient',
      label: t('technology.efficient', { defaultValue: 'Efficient' }),
      description: t('technology.efficient_desc', {
        defaultValue:
          'From a small cooperative to a national election, Vocdoni scales seamlessly. It’s fast, cost-effective, and sustainable, cutting costs and environmental impact compared to traditional methods.',
      }),
      bg: 'bg-[#FBEFB7]',
    },
    {
      key: 'accessible',
      label: t('technology.accessible', { defaultValue: 'Accessible' }),
      description: t('technology.accessible_desc', {
        defaultValue:
          'Anyone, anywhere, from any device can take part. Designed for inclusivity, Vocdoni removes barriers so every voice can be heard, without technical or geographical limitations.',
      }),
      bg: 'bg-[#F5E49B]',
    },
  ]

  return (
    <div className='min-h-screen w-full grid grid-cols-1 lg:grid-cols-2'>
      {/* Technology Overview */}
      <div className='flex flex-col'>
        <div className='flex-1 bg-background flex flex-col items-center justify-center'>
          <div className='w-full px-6 flex flex-col gap-6'>
            <p className='text-3xl font-medium'>→ {t('technology.headline', { defaultValue: 'Technology' })}</p>
            <p className='text-2xl md:text-3xl leading-relaxed tracking-tight'>
              {t('technology.vision', {
                defaultValue:
                  'Our vision is simple: a world where collective decision–making can happen anywhere, from any device, transparently and securely. No intermediaries, no barriers.',
              })}
            </p>

            <div className='hidden lg:block mb-10'>
              <div className='flex flex-col gap-4'>
                <p className='text-2xl md:text-3xl leading-relaxed tracking-tight'>
                  {t('technology.why', { defaultValue: 'Why?' })}
                </p>
                <p className='text-2xl md:text-3xl leading-relaxed tracking-tight'>
                  {t('technology.why_description', {
                    defaultValue: 'Because fair, accessible governance should be a right, not a luxury.',
                  })}
                </p>
                <div>
                  <Button variant='outline' size='sm' className='mt-2'>
                    {t('technology.cta', { defaultValue: 'Find out more' })}
                    <ArrowUpRight className='ml-2 h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block w-full px-6 py-6'>
          <Link href='/services' className='block text-2xl font-semibold text-muted-foreground'>
            {t('services.our_services', { defaultValue: 'Our Services' })} ↓
          </Link>
        </div>
      </div>

      {/* Accordion Container */}
      <div className='relative md:border-l md:border-black/10 min-h-0 flex flex-col justify-end bg-[#FFFBEA]'>
        <Accordion
          collapsible
          defaultValue='transparent'
          value={open}
          onValueChange={setOpen}
          type='single'
          className='w-full min-h-0 flex flex-col'
        >
          {rows.map((r) => (
            <AccordionItem
              key={r.key}
              value={r.key}
              className={cn(r.bg, 'border-none flex flex-col', 'data-[state=open]:flex-1')}
              onMouseEnter={() => setOpen(r.key)}
            >
              <AccordionTrigger
                className={cn(
                  r.bg,
                  'group border-0 px-6 md:px-10 h-20 md:h-25',
                  'text-left text-4xl md:text-4xl font-semibold',
                  'hover:no-underline',
                  '[&>svg]:hidden'
                )}
              >
                <div className='flex w-full items-center justify-between'>
                  <span>{r.label}</span>
                  <ArrowUpRight
                    className='
            h-5 w-5 origin-center
            transition-transform duration-200
            group-data-[state=open]:rotate-90
            group-data-[state=open]:translate-x-0.5 group-data-[state=open]:-translate-y-0.5
          '
                    aria-hidden='true'
                  />
                </div>
              </AccordionTrigger>

              <AccordionContent className={cn(r.bg, 'border-0', 'px-6 md:px-10 py-4 text-lg md:text-lg')}>
                <p className='max-w-2xl'>{r.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
