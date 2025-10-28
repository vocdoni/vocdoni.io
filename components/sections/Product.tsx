import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '../Link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Heading } from '../ui/typography'

import org from '/assets/product/org.png'
import results from '/assets/product/results.png'
import upload from '/assets/product/upload.png'
import vote from '/assets/product/vote.png'

const steps = [
  {
    id: 'step1',
    title: 'Create your organization',
    description: 'Sign up and create your organization.',
    img: org,
  },
  {
    id: 'step2',
    title: 'Upload your memberbase',
    description: 'Upload your memberbase and create a group of eligible voters.',
    img: upload,
  },
  {
    id: 'step3',
    title: 'Run a vote',
    description:
      'Create a vote with the chosen census and settings, then share the link so eligible voters can participate.',
    img: vote,
  },
  {
    id: 'step4',
    title: 'See the results',
    description: 'Results are computed instantly, verifiable by anyone.',
    img: results,
  },
]

export function Product() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<string>('step1')

  const currentStep = steps.find((s) => s.id === open)
  const currentImg = currentStep?.img
  const currentAlt = currentStep?.title

  return (
    <div className='min-h-screen w-full grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-2'>
      {/* Impact Overview */}
      <div className='flex flex-col order-2 lg:order-1'>
        <div className='flex-1 bg-background flex flex-col items-center justify-center'>
          <div className='w-full px-6 flex flex-col gap-6'>
            <div className='flex-col gap-6 hidden lg:flex'>
              <Heading variant='section'>
                → {t('product.title', { defaultValue: 'How we make secure voting simple' })}
              </Heading>
              <p className='text-lg sm:text-2xl md:text-3xl hidden lg:block leading-relaxed tracking-tight'>
                {t('product.description', {
                  defaultValue:
                    'With Vocdoni APP, you can create a secure vote in just 4 steps and without previous experience.',
                })}
              </p>
            </div>
            <Accordion
              defaultValue='step1'
              value={open}
              onValueChange={setOpen}
              type='single'
              className='w-full min-h-0 flex flex-col'
            >
              {steps.map((step, i) => {
                const { id, title, description } = step
                const index = i + 1

                return (
                  <AccordionItem
                    key={id}
                    value={id}
                    className=' flex flex-col data-[state=open]:flex-1'
                    onMouseEnter={() => setOpen(id)}
                  >
                    <AccordionTrigger
                      className={cn(
                        'group border-0 hover:no-underline [&>svg]:hidden',
                        'text-left text-lg md:text-4xl font-semibold'
                      )}
                    >
                      <div className='flex w-full items-start gap-3'>
                        <span className='flex-1'>
                          {index}. {title}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent
                      className={cn(
                        'border-0 px-6 md:px-10 py-4 text-lg md:text-lg h-full',
                        'overflow-hidden data-[state=open]:flex-1',
                        'data-[state=open]:[&>div]:min-h-0 data-[state=open]:[&>div]:h-full',
                        'flex flex-col justify-center gap-4'
                      )}
                    >
                      <p className='max-w-2xl'>{description}</p>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
        <div className='hidden lg:block w-full px-6 py-6'>
          <Link href='/advantages' className='block text-2xl font-semibold text-muted-foreground'>
            {t('product.the_vocdoni_advantage', { defaultValue: 'The Vocdoni Advantage' })} ↓
          </Link>
        </div>
      </div>

      {/* Images */}
      <div className='relative order-1 lg:order-2 w-full h-full min-h-0 overflow-hidden'>
        <div
          className={cn(
            'absolute inset-0 w-full h-full',
            'mx-auto pt-[15%] md:pt-[5%] lg:pt-[15%] xl:pt-[10%] 2xl:pt-[20%]',
            'object-cover -z-10',
            'pointer-events-none select-none',
            'transition-opacity duration-300',
            'bg-gradient-to-br from-[#e5e4de] to-[#cdcdca]'
          )}
        >
          <img
            key={currentImg}
            src={currentImg}
            alt={currentAlt}
            decoding='async'
            className='max-h-full ml-auto mr-auto'
          />
        </div>

        <Link variant='hero' className='absolute left-4 bottom-4 z-10 py-2 px-4' href='https://app.vocdoni.io'>
          {t('product.go_to_app', { defaultValue: 'Go to APP' })} <ArrowUpRight className='ml-2 h-4 w-4' />
        </Link>
      </div>
    </div>
  )
}
