import createVoteImage from '@/assets/images/app/create_vote.webp'
import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type Plan = {
  name: string
  price: string
  annual?: string
  summary: string
  limits: string[]
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article className='flex h-full flex-col rounded-2xl border border-border/70 bg-background p-6 shadow-sm sm:p-8'>
      <h3 className='text-2xl text-foreground'>{plan.name}</h3>
      <p className='mt-5 font-sans text-4xl font-semibold tracking-tight text-foreground tabular-nums'>{plan.price}</p>
      {plan.annual && <p className='mt-1 min-h-10 text-sm leading-5 text-muted-foreground'>{plan.annual}</p>}
      <p className='mt-5 text-sm leading-6 text-muted-foreground'>{plan.summary}</p>
      <ul className='mt-6 space-y-3 border-t border-border/70 pt-6'>
        {plan.limits.map((limit) => (
          <li key={limit} className='flex gap-3 text-sm leading-5 text-foreground'>
            <Check className='mt-0.5 size-4 shrink-0 text-primary' aria-hidden='true' />
            <span>{limit}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function PricingPage() {
  const { t } = useTranslation()

  const plans: Plan[] = [
    {
      name: t('pricing_page.free.name', 'Free'),
      price: t('pricing_page.free.price', '€0/month + VAT'),
      summary: t('pricing_page.free.summary', 'For small organizations that want to run real votes at no cost.'),
      limits: [
        t('pricing_page.free.members', 'Up to 100 members'),
        t('pricing_page.free.votes', '5 counted votes per year'),
        t('pricing_page.free.admins', '1 administrator'),
        t('pricing_page.free.codes', '100 email verification codes'),
      ],
    },
    {
      name: t('pricing_page.essential.name', 'Essential'),
      price: t('pricing_page.essential.price', '€69/month + VAT'),
      annual: t('pricing_page.essential.annual', 'Or €590 billed annually (€49.17/month equivalent) + VAT'),
      summary: t(
        'pricing_page.essential.summary',
        'For organizations with regular member votes and two administrators.'
      ),
      limits: [
        t('pricing_page.essential.members', 'Up to 1,000 members'),
        t('pricing_page.essential.votes', '20 counted votes per year'),
        t('pricing_page.essential.admins', '2 administrators'),
        t('pricing_page.essential.codes', '1,000 email and 1,000 SMS verification codes'),
      ],
    },
    {
      name: t('pricing_page.premium.name', 'Premium'),
      price: t('pricing_page.premium.price', '€199/month + VAT'),
      annual: t('pricing_page.premium.annual', 'Or €1,890 billed annually (€157.50/month equivalent) + VAT'),
      summary: t(
        'pricing_page.premium.summary',
        'For larger organizations with frequent votes and more administrators.'
      ),
      limits: [
        t('pricing_page.premium.members', 'Up to 5,000 members'),
        t('pricing_page.premium.votes', '50 counted votes per year'),
        t('pricing_page.premium.admins', '5 administrators'),
        t('pricing_page.premium.codes', '5,000 email and 5,000 SMS verification codes'),
      ],
    },
  ]

  return (
    <main>
      <section className='py-14 sm:py-20 lg:py-24'>
        <Container>
          <div className='grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16'>
            <div>
              <p className='mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary'>
                {t('pricing_page.eyebrow', 'Vocdoni App pricing')}
              </p>
              <h1 className='max-w-3xl text-4xl leading-[1.04] text-balance sm:text-5xl lg:text-6xl'>
                {t('pricing_page.title', 'Choose the plan that fits your elections')}
              </h1>
              <p className='mt-6 max-w-2xl text-lg leading-8 text-muted-foreground'>
                {t(
                  'pricing_page.intro',
                  'Start free. Upgrade when you need more members, votes, administrators, or verification codes.'
                )}
              </p>
              <div className='mt-8'>
                <Button asChild size='lg' className='group w-full text-base sm:w-auto'>
                  <Link href={`${APP_URL}/plans`} ctaId='pricing_hero_start' variant='inlineIcon'>
                    {t('pricing_page.cta', 'Start with the Free plan')}
                    <ArrowRight
                      aria-hidden='true'
                      className='transition-transform duration-200 group-hover:translate-x-0.5'
                    />
                  </Link>
                </Button>
              </div>
            </div>

            <figure className='overflow-hidden rounded-2xl border border-border/70 bg-muted/20 p-2 shadow-xl'>
              <img
                src={createVoteImage}
                alt={t('pricing_page.screenshot_alt', 'Vocdoni App election setup screen')}
                className='w-full rounded-xl border border-border/60'
                width='1400'
                height='893'
              />
            </figure>
          </div>
        </Container>
      </section>

      <section className='border-y border-border/70 bg-muted/20 py-16 sm:py-20 lg:py-24'>
        <Container>
          <div className='max-w-3xl'>
            <h2 className='text-3xl text-balance sm:text-4xl'>{t('pricing_page.plans_title', 'Self-service plans')}</h2>
            <p className='mt-4 text-base leading-7 text-muted-foreground'>
              {t(
                'pricing_page.plans_intro',
                'These plans cover elections that your team configures and runs in the Vocdoni App.'
              )}
            </p>
            <p className='mt-3 text-sm font-medium text-foreground'>
              {t('pricing_page.reviewed', 'Prices and limits reviewed on 28 August 2026.')}
            </p>
          </div>

          <div className='mt-10 grid gap-5 lg:grid-cols-3'>
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>

          <article className='mt-5 grid gap-6 rounded-2xl border border-border/70 bg-background p-6 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-center'>
            <div>
              <h3 className='text-2xl'>{t('pricing_page.custom.name', 'Custom')}</h3>
              <p className='mt-3 font-sans text-3xl font-semibold tracking-tight'>
                {t('pricing_page.custom.price', 'Price on request')}
              </p>
            </div>
            <p className='text-base leading-7 text-muted-foreground'>
              {t(
                'pricing_page.custom.summary',
                'For higher member limits, more administrators, or app features that need an individual assessment.'
              )}
            </p>
          </article>

          <div className='mt-8 max-w-4xl space-y-3 text-sm leading-6 text-muted-foreground'>
            <p>
              {t(
                'pricing_page.votes_note',
                'Votes with fewer than 10 participants are treated as tests and do not count toward plan limits.'
              )}
            </p>
            <p>
              {t(
                'pricing_page.codes_note',
                'Verification credits are used only when a voter requests a code. Extra codes cost €0.015 each as sent.'
              )}
            </p>
            <Link
              href={`${APP_URL}/plans`}
              variant='inlineIcon'
              className='font-medium text-foreground'
              aria-label={t('pricing_page.source_aria', 'Check current prices in the Vocdoni App (opens in new tab)')}
            >
              {t('pricing_page.source', 'Check the current plans and billing options')}
              <ExternalLink aria-hidden='true' className='size-4' />
            </Link>
          </div>
        </Container>
      </section>

      <section className='py-16 sm:py-20'>
        <Container>
          <div className='grid gap-8 rounded-2xl bg-foreground px-6 py-10 text-background sm:px-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:px-14'>
            <h2 className='text-3xl text-balance text-background sm:text-4xl'>
              {t('pricing_page.managed_title', 'Need us to run the election with you?')}
            </h2>
            <div>
              <p className='text-base leading-7 text-background/75'>
                {t('pricing_page.managed_intro', 'Managed election services suit complex or high-stakes governance.')}
              </p>
              <Link
                href='/contact'
                variant='inlineIcon'
                className='mt-5 font-semibold text-background hover:text-primary'
              >
                {t('pricing_page.managed_link', 'Discuss a managed election')}
                <ArrowRight aria-hidden='true' className='size-4' />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className='pb-20 sm:pb-24'>
        <Container>
          <div className='border-t border-border/70 pt-12'>
            <h2 className='text-2xl'>{t('pricing_page.explore_title', 'See how organizations use Vocdoni')}</h2>
            <div className='mt-6 flex flex-col gap-4 sm:flex-row sm:gap-8'>
              <Link href='/solutions/associations' variant='inlineIcon' className='font-medium'>
                {t('pricing_page.associations_link', 'Online voting for associations')}
                <ArrowRight aria-hidden='true' className='size-4' />
              </Link>
              <Link href='/solutions/companies-agm' variant='inlineIcon' className='font-medium'>
                {t('pricing_page.agm_link', 'Online voting for AGMs')}
                <ArrowRight aria-hidden='true' className='size-4' />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
