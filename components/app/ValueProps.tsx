import { CheckCheckIcon, TimerResetIcon, UsersRoundIcon, VoteIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Outcome = {
  title: string
  description: string
}

const icons = [TimerResetIcon, UsersRoundIcon, VoteIcon, CheckCheckIcon]

export default function ValueProps() {
  const { t } = useTranslation()
  const outcomes = (t('app_landing.outcomes.items', { returnObjects: true }) as Outcome[]) || []

  return (
    <section className='py-20 sm:py-24'>
      <Container>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary/80'>
            {t('app_landing.outcomes.eyebrow', 'What changes with Vocdoni')}
          </p>
          <h2 className='mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
            {t('app_landing.outcomes.title', 'Make voting easier for organizers and members')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-muted-foreground'>
            {t(
              'app_landing.outcomes.description',
              'Give your organization a voting flow that is simple to launch, simple to complete, and strong enough to stand up after the vote ends.'
            )}
          </p>
        </div>

        <div className='mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
          {outcomes.map((item, index) => {
            const Icon = icons[index] ?? CheckCheckIcon
            return (
              <Card key={index} className='border-border/60 bg-background shadow-sm'>
                <CardHeader className='pb-3'>
                  <div className='mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                    <Icon className='size-5' />
                  </div>
                  <CardTitle className='text-xl'>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='leading-7 text-muted-foreground'>{item.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
