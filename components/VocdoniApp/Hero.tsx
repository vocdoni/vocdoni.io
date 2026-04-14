import { useTranslation } from 'react-i18next'
import { ArrowRightIcon, CheckCircle2Icon, PlayCircleIcon, ShieldCheckIcon, UploadIcon, VoteIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type HeroStat = {
  value: string
  label: string
}

export default function Hero() {
  const { t } = useTranslation()

  const trustStrip = [
    t('app_landing.hero.trust.free', 'Free vote for up to 100 members'),
    t('app_landing.hero.trust.gdpr', 'GDPR compliant'),
    t('app_landing.hero.trust.hosting', 'EU-hosted'),
  ]

  const proofStrip = [
    t('app_landing.hero.proof.open_source', 'Open source'),
    t('app_landing.hero.proof.auditable', 'Publicly auditable results'),
    t('app_landing.hero.proof.verify', 'Voters can verify their vote was counted'),
  ]

  const stats = (t('app_landing.hero.stats', { returnObjects: true }) as HeroStat[]) || []

  const workflowSteps = [
    t('app_landing.hero.workflow.create', 'Create account'),
    t('app_landing.hero.workflow.upload', 'Upload voter list'),
    t('app_landing.hero.workflow.launch', 'Launch the vote'),
  ]

  return (
    <section className='relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(54,96,255,0.10),transparent_34%),linear-gradient(180deg,rgba(251,251,253,1),rgba(246,247,251,0.88))] py-16 sm:py-20 lg:py-24'>
      <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent' />
      <Container>
        <div className='grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center'>
          <div className='max-w-3xl'>
            <div className='inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-4 py-1.5 text-sm font-medium shadow-sm'>
              <span className='size-2 rounded-full bg-primary' />
              {t('app_landing.hero.eyebrow', 'Vocdoni app')}
            </div>

            <h1 className='mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl'>
              {t('app_landing.hero.title', 'Run a vote your members can trust')}
            </h1>

            <p className='mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl'>
              {t(
                'app_landing.hero.description',
                'Create an account, upload your voter list, send the link, and get results any member can verify. Start free, with no credit card and no sales call.'
              )}
            </p>

            <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Button asChild size='lg' className='rounded-full px-7 text-base shadow-sm'>
                <Link href='https://app.vocdoni.io' variant='unstyled'>
                  {t('app_landing.hero.cta_primary', 'Start free')}
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant='outline' size='lg' className='rounded-full px-7 text-base'>
                <Link href='https://www.youtube.com/watch?v=lEPIjgeHYFs' variant='unstyled'>
                  <PlayCircleIcon />
                  {t('app_landing.hero.cta_secondary', 'Watch the 2-minute demo')}
                </Link>
              </Button>
            </div>

            <div className='mt-6 flex flex-wrap gap-3'>
              {trustStrip.map((item) => (
                <span
                  key={item}
                  className='inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/90 px-4 py-2 text-sm text-foreground shadow-sm'
                >
                  <CheckCircle2Icon className='size-4 text-primary' />
                  {item}
                </span>
              ))}
            </div>

            <div className='mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground'>
              {proofStrip.map((item) => (
                <span key={item} className='inline-flex items-center gap-2'>
                  <span className='size-1.5 rounded-full bg-primary/80' />
                  {item}
                </span>
              ))}
            </div>

            <div className='mt-10 grid gap-4 sm:grid-cols-3'>
              {stats.map((stat) => (
                <Card key={stat.label} className='border-border/70 bg-background/85 shadow-sm'>
                  <CardContent className='p-5'>
                    <div className='text-2xl font-semibold text-foreground'>{stat.value}</div>
                    <p className='mt-1 text-sm text-muted-foreground'>{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className='relative overflow-hidden border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,248,252,0.96))] shadow-[0_24px_80px_rgba(20,28,52,0.12)]'>
            <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/55' />
            <CardHeader className='space-y-4 pb-4'>
              <div className='flex items-center justify-between text-sm text-muted-foreground'>
                <span>{t('app_landing.hero.panel.eyebrow', 'Typical first vote')}</span>
                <span>{t('app_landing.hero.panel.badge', 'Self-service')}</span>
              </div>
              <CardTitle className='text-2xl leading-tight'>
                {t('app_landing.hero.panel.title', 'From voter list to verified result in one afternoon')}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid gap-3'>
                {workflowSteps.map((step, index) => (
                  <div
                    key={step}
                    className='flex items-center justify-between rounded-2xl border border-border/70 bg-background px-4 py-3'
                  >
                    <div className='flex items-center gap-3'>
                      <span className='flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary'>
                        0{index + 1}
                      </span>
                      <span className='font-medium text-foreground'>{step}</span>
                    </div>
                    {index === 0 ? (
                      <UploadIcon className='size-4 text-muted-foreground' />
                    ) : index === 1 ? (
                      <VoteIcon className='size-4 text-muted-foreground' />
                    ) : (
                      <ShieldCheckIcon className='size-4 text-muted-foreground' />
                    )}
                  </div>
                ))}
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='rounded-2xl bg-primary/8 p-4'>
                  <p className='text-sm font-medium text-foreground'>
                    {t('app_landing.hero.panel.trust_title', 'Why teams trust the result')}
                  </p>
                  <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                    {t(
                      'app_landing.hero.panel.trust_copy',
                      'No single party can alter the outcome, and every voter can verify their vote was counted.'
                    )}
                  </p>
                </div>
                <div className='rounded-2xl bg-foreground/[0.03] p-4'>
                  <p className='text-sm font-medium text-foreground'>
                    {t('app_landing.hero.panel.admin_title', 'Why admins switch')}
                  </p>
                  <p className='mt-2 text-sm leading-6 text-muted-foreground'>
                    {t(
                      'app_landing.hero.panel.admin_copy',
                      'No paper, no manual counting, and no separate tool for remote, in-person, or hybrid votes.'
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
