import { useTranslation } from 'react-i18next'
import { BadgeCheckIcon, ClipboardListIcon, MailCheckIcon, RefreshCcwDotIcon, UsersIcon, VoteIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Feature = {
  title: string
  description: string
}

const icons = [VoteIcon, MailCheckIcon, UsersIcon, RefreshCcwDotIcon, ClipboardListIcon, BadgeCheckIcon]

export default function Features() {
  const { t } = useTranslation()
  const items = (t('app_landing.features.items', { returnObjects: true }) as Feature[]) || []

  return (
    <section className='py-20 sm:py-24'>
      <Container>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary/80'>
            {t('app_landing.features.eyebrow', 'Feature proof')}
          </p>
          <h2 className='mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
            {t('app_landing.features.title', 'Everything you need to run a real election')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-muted-foreground'>
            {t(
              'app_landing.features.description',
              'Keep the feature section compact. The page should prove capability without turning into a long product dump.'
            )}
          </p>
        </div>

        <div className='mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {items.map((item, index) => {
            const Icon = icons[index] ?? BadgeCheckIcon
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
