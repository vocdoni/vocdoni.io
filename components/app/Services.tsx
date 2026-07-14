import { ArrowRightIcon, CircleCheckBigIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Services() {
  const { t } = useTranslation()

  const bullets = [
    t('app_landing.cta.free', 'Free vote for up to 100 members'),
    t('app_landing.cta.credit_card', 'No credit card required'),
    t('app_landing.cta.pricing', 'Public pricing for larger organizations'),
  ]

  return (
    <section className='py-20 sm:py-24'>
      <Container>
        <Card className='overflow-hidden border-border/70 bg-[linear-gradient(180deg,rgba(248,249,253,1),rgba(240,244,251,0.92))] shadow-[0_24px_80px_rgba(20,28,52,0.10)]'>
          <CardContent className='grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12'>
            <div>
              <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary/80'>
                {t('app_landing.cta.eyebrow', 'Start without friction')}
              </p>
              <h2 className='mt-3 text-balance text-3xl sm:text-4xl'>
                {t('app_landing.cta.title', 'Your next vote can be live today')}
              </h2>
              <p className='mt-4 max-w-2xl text-lg leading-8 text-muted-foreground'>
                {t(
                  'app_landing.cta.description',
                  'Run a real vote on the free plan, see how it works with your own members, and only move to a paid plan when your organization needs more scale.'
                )}
              </p>
              <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
                <Button asChild size='lg' className='has-[>svg]:px-6'>
                  <Link href={APP_URL} variant='inlineIcon'>
                    {t('app_landing.cta.primary', 'Start for free')}
                    <ArrowRightIcon />
                  </Link>
                </Button>
                <Button asChild variant='outline' size='lg'>
                  <Link href={`${APP_URL}/plans`} variant='unstyled'>
                    {t('app_landing.cta.secondary', 'See pricing')}
                  </Link>
                </Button>
              </div>
            </div>

            <div className='rounded-3xl border border-border/70 bg-background/90 p-6 shadow-sm'>
              <p className='text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground'>
                {t('app_landing.cta.checklist_title', 'What you get from day one')}
              </p>
              <div className='mt-5 space-y-4'>
                {bullets.map((item) => (
                  <div key={item} className='flex items-start gap-3'>
                    <CircleCheckBigIcon className='mt-0.5 size-5 shrink-0 text-primary' />
                    <span className='leading-7 text-foreground'>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  )
}
