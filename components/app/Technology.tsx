import { GithubIcon, LockKeyholeIcon, ScanSearchIcon, ShieldCheckIcon, VoteIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Proof = {
  title: string
  description: string
}

const icons = [LockKeyholeIcon, ScanSearchIcon, ShieldCheckIcon, GithubIcon]

export default function Technology() {
  const { t } = useTranslation()
  const items = (t('app_landing.technology.items', { returnObjects: true }) as Proof[]) || []

  return (
    <section className='py-20 sm:py-24'>
      <Container>
        <div className='grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start'>
          <div className='max-w-xl'>
            <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary/80'>
              {t('app_landing.technology.eyebrow', 'The technology behind Vocdoni app')}
            </p>
            <h2 className='mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
              {t('app_landing.technology.title', 'Proof your members can check themselves')}
            </h2>
            <p className='mt-5 text-lg leading-8 text-muted-foreground'>
              {t(
                'app_landing.technology.description',
                'Vocdoni voting technology keeps votes private, produces publicly auditable results, prevents any single party from altering the outcome, and lets voters verify their vote was counted.'
              )}
            </p>

            <div className='mt-8 flex flex-wrap gap-3'>
              <Link
                href='https://davinci.vote'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground no-underline shadow-sm'
              >
                <VoteIcon className='size-4 text-primary' />
                {t('app_landing.technology.link_technology', 'See how the technology works')}
              </Link>
              <Link
                href='https://explorer.vote'
                className='inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground no-underline shadow-sm'
              >
                <ScanSearchIcon className='size-4 text-primary' />
                {t('app_landing.technology.link_explorer', 'Open the public vote explorer')}
              </Link>
              <Link
                href='https://github.com/vocdoni'
                className='inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground no-underline shadow-sm'
              >
                <GithubIcon className='size-4 text-primary' />
                {t('app_landing.technology.link_github', 'Inspect the open source code')}
              </Link>
            </div>
          </div>

          <div className='grid gap-5 sm:grid-cols-2'>
            {items.map((item, index) => {
              const Icon = icons[index] ?? ShieldCheckIcon
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
        </div>
      </Container>
    </section>
  )
}
