import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'

type Step = {
  title: string
  description: string
}

export default function HowItWorks() {
  const { t } = useTranslation()
  const steps = (t('app_landing.how_it_works.items', { returnObjects: true }) as Step[]) || []

  return (
    <section className='bg-muted/20 py-20 sm:py-24'>
      <Container>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary/80'>
            {t('app_landing.how_it_works.eyebrow', 'How it works')}
          </p>
          <h2 className='mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
            {t('app_landing.how_it_works.title', 'Your first vote in four steps')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-muted-foreground'>
            {t('app_landing.how_it_works.description', 'No app download for voters. No specialist provider required.')}
          </p>
        </div>

        <div className='mt-12 grid gap-5 lg:grid-cols-4'>
          {steps.map((step, index) => (
            <div key={step.title} className='rounded-3xl border border-border/70 bg-background p-6 shadow-sm'>
              <div className='flex size-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground'>
                0{index + 1}
              </div>
              <h3 className='mt-5 text-xl font-semibold'>{step.title}</h3>
              <p className='mt-3 leading-7 text-muted-foreground'>{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
