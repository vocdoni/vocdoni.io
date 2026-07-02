import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import {
  DEVELOPERS_DASHBOARD_URL,
  DEVELOPERS_GITHUB_URL,
  DEVELOPERS_STATUS_URL,
  DEVELOPERS_SWAGGER_URL,
} from '@/lib/developers'
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Code2,
  Fingerprint,
  Github,
  KeyRound,
  LifeBuoy,
  ListChecks,
  Network,
  Rocket,
  ScrollText,
  ShieldCheck,
  Terminal,
  Users,
  Vote,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useData } from 'vike-react/useData'

import type { DevelopersData } from '@/pages/developers/+data'
import { CardGrid, DocCard } from './CardGrid'
import { CodeBlock } from './CodeBlock'

function Hero() {
  const { t } = useTranslation()
  const { heroSamples } = useData<DevelopersData>()
  return (
    <section className='relative overflow-hidden'>
      <div
        className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent'
        aria-hidden='true'
      />
      <Container className='pt-10 pb-12 sm:pt-16 lg:pt-20'>
        <div className='grid items-center gap-10 lg:grid-cols-2 lg:gap-14'>
          <div>
            <p className='mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-primary'>
              <Code2 className='size-4' aria-hidden='true' />
              {t('developers.landing.hero.eyebrow', 'Vocdoni for developers')}
            </p>
            <h1 className='text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl'>
              {t('developers.landing.hero.title', 'Build verifiable voting into your product')}
            </h1>
            <p className='mt-5 max-w-xl text-lg leading-8 text-muted-foreground'>
              {t(
                'developers.landing.hero.subtitle',
                'Add secure, anonymous and end-to-end verifiable elections to your software with one REST API. Create organizations, build censuses, run processes and read results - without becoming a cryptography expert.'
              )}
            </p>
            <div className='mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row'>
              <Button asChild size='lg' className='group w-full text-base sm:w-auto'>
                <Link href='/developers/docs' variant='inlineIcon'>
                  {t('developers.landing.hero.cta_primary', 'Get started')}
                  <ArrowRight
                    className='size-5 transition-transform duration-200 group-hover:translate-x-0.5'
                    aria-hidden='true'
                  />
                </Link>
              </Button>
              <Button asChild size='lg' variant='outline' className='group w-full text-base sm:w-auto'>
                <Link href={DEVELOPERS_DASHBOARD_URL} variant='inlineIcon'>
                  {t('developers.landing.hero.cta_dashboard', 'API Dashboard')}
                  <ArrowRight
                    className='size-5 transition-transform duration-200 group-hover:translate-x-0.5'
                    aria-hidden='true'
                  />
                </Link>
              </Button>
            </div>
          </div>
          <div className='min-w-0 lg:pl-4'>
            <CodeBlock
              caption={t('developers.landing.hero.code_caption', 'Authenticate, then create your first election')}
              samples={heroSamples}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

function Pillars() {
  const { t } = useTranslation()
  const pillars = [
    {
      icon: Rocket,
      title: t('developers.landing.pillars.quickstart.title', 'Quickstart'),
      description: t(
        'developers.landing.pillars.quickstart.description',
        'Run a full election end to end - create an org, build a census, open a process and read the tally - in a few API calls.'
      ),
      href: '/developers/docs/quickstart',
      cta: t('developers.landing.pillars.quickstart.cta', 'Run the quickstart'),
      external: false,
    },
    {
      icon: Network,
      title: t('developers.landing.pillars.api.title', 'SaaS API'),
      description: t(
        'developers.landing.pillars.api.description',
        'A REST API to run managed elections: organizations, members, censuses, processes, results and async jobs.'
      ),
      href: '/developers/docs',
      cta: t('developers.landing.pillars.api.cta', 'Explore the API'),
      external: false,
    },
    {
      icon: Terminal,
      title: t('developers.landing.pillars.sdk.title', 'SDK'),
      description: t(
        'developers.landing.pillars.sdk.description',
        'The TypeScript SDK adds client-side voting to your app - CSP auth, ballot encoding and vote signing - all through the SaaS API.'
      ),
      href: '/developers/docs/sdk-quickstart',
      cta: t('developers.landing.pillars.sdk.cta', 'SDK quickstart'),
      external: false,
    },
  ]

  return (
    <section className='py-14 sm:py-20'>
      <Container>
        <div className='grid gap-5 md:grid-cols-3'>
          {pillars.map((pillar) => (
            <div key={pillar.title} className='flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm'>
              <span className='inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary'>
                <pillar.icon className='size-6' aria-hidden='true' />
              </span>
              <h2 className='mt-4 text-lg font-semibold'>{pillar.title}</h2>
              <p className='mt-2 flex-grow text-sm leading-relaxed text-muted-foreground'>{pillar.description}</p>
              <Link
                href={pillar.href}
                target={pillar.external ? '_blank' : undefined}
                variant='inlineIcon'
                className='mt-4 text-sm font-medium text-primary'
              >
                {pillar.cta}
                <ArrowRight className='size-4' />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function StartBuilding() {
  const { t } = useTranslation()
  const cards = [
    {
      icon: KeyRound,
      title: t('developers.landing.build.authentication.title', 'API keys'),
      description: t(
        'developers.landing.build.authentication.description',
        'Authenticate with a scoped API key for server-to-server access.'
      ),
      href: '/developers/docs/api-keys',
    },
    {
      icon: Boxes,
      title: t('developers.landing.build.organizations.title', 'Organizations'),
      description: t(
        'developers.landing.build.organizations.description',
        'Create organizations and manage users and roles.'
      ),
      href: '/developers/docs/organizations',
    },
    {
      icon: Users,
      title: t('developers.landing.build.census.title', 'Members and census'),
      description: t(
        'developers.landing.build.census.description',
        'Import members and publish a census ready to vote.'
      ),
      href: '/developers/docs/census',
    },
    {
      icon: Vote,
      title: t('developers.landing.build.processes.title', 'Voting processes'),
      description: t(
        'developers.landing.build.processes.description',
        'Configure ballots, vote types and election timing.'
      ),
      href: '/developers/docs/voting-processes',
    },
    {
      icon: ListChecks,
      title: t('developers.landing.build.results.title', 'Results'),
      description: t('developers.landing.build.results.description', 'Read live and final tallies for any process.'),
      href: '/developers/docs/results',
    },
    {
      icon: Network,
      title: t('developers.landing.build.managed.title', 'Managed organizations'),
      description: t(
        'developers.landing.build.managed.description',
        'Provision sub-organizations for your own customers.'
      ),
      href: '/developers/docs/managed-organizations',
    },
  ]

  return (
    <section className='border-t border-border/60 bg-muted/20 py-14 sm:py-20'>
      <Container>
        <div className='mx-auto mb-10 max-w-2xl text-center'>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            {t('developers.landing.build.title', 'Start building')}
          </h2>
          <p className='mt-3 text-muted-foreground'>
            {t('developers.landing.build.subtitle', 'Jump straight to the part of the API you need.')}
          </p>
        </div>
        <CardGrid columns={3}>
          {cards.map((card) => (
            <DocCard
              key={card.title}
              href={card.href}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </CardGrid>
      </Container>
    </section>
  )
}

function Capabilities() {
  const { t } = useTranslation()
  const items = [
    {
      icon: Fingerprint,
      title: t('developers.landing.capabilities.anonymous.title', 'Anonymous by design'),
      description: t(
        'developers.landing.capabilities.anonymous.description',
        'Zero-knowledge cryptography keeps ballots secret while results stay provable.'
      ),
    },
    {
      icon: ShieldCheck,
      title: t('developers.landing.capabilities.verifiable.title', 'End-to-end verifiable'),
      description: t(
        'developers.landing.capabilities.verifiable.description',
        'Voters and observers can independently verify that every vote was counted.'
      ),
    },
    {
      icon: Users,
      title: t('developers.landing.capabilities.census.title', 'Flexible census'),
      description: t(
        'developers.landing.capabilities.census.description',
        'Authenticate voters by email, SMS or custom fields, with optional weighting.'
      ),
    },
    {
      icon: Boxes,
      title: t('developers.landing.capabilities.whitelabel.title', 'Multi-tenant ready'),
      description: t(
        'developers.landing.capabilities.whitelabel.description',
        'Run elections for many customers from a single integrator account.'
      ),
    },
  ]

  return (
    <section className='py-14 sm:py-20'>
      <Container>
        <div className='mx-auto mb-10 max-w-2xl text-center'>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            {t('developers.landing.capabilities.title', 'Built on guarantees you can prove')}
          </h2>
        </div>
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {items.map((item) => (
            <div key={item.title} className='rounded-2xl border border-border/60 p-5'>
              <item.icon className='size-6 text-primary' aria-hidden='true' />
              <h3 className='mt-3 text-base font-semibold'>{item.title}</h3>
              <p className='mt-1.5 text-sm leading-relaxed text-muted-foreground'>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Resources() {
  const { t } = useTranslation()
  const links = [
    {
      icon: BookOpen,
      title: t('developers.landing.resources.reference.title', 'API reference'),
      description: t('developers.landing.resources.reference.description', 'Every endpoint, schema and field.'),
      href: DEVELOPERS_SWAGGER_URL,
      external: true,
    },
    {
      icon: ScrollText,
      title: t('developers.landing.resources.sdk.title', 'SDK documentation'),
      description: t('developers.landing.resources.sdk.description', 'Install the SDK and cast votes from your app.'),
      href: '/developers/docs/sdk-quickstart',
      external: false,
    },
    {
      icon: Github,
      title: t('developers.landing.resources.github.title', 'GitHub'),
      description: t('developers.landing.resources.github.description', 'Open-source code and issues.'),
      href: DEVELOPERS_GITHUB_URL,
      external: true,
    },
    {
      icon: LifeBuoy,
      title: t('developers.landing.resources.support.title', 'Status and support'),
      description: t('developers.landing.resources.support.description', 'Service status and ways to reach us.'),
      href: DEVELOPERS_STATUS_URL,
      external: true,
    },
  ]

  return (
    <section className='border-t border-border/60 py-14 sm:py-20'>
      <Container>
        <div className='mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end'>
          <h2 className='text-2xl font-bold tracking-tight sm:text-3xl'>
            {t('developers.landing.resources.title', 'Resources')}
          </h2>
          <Button asChild variant='outline'>
            <Link href='/developers/docs' variant='inlineIcon'>
              {t('developers.landing.resources.cta', 'Browse the docs')}
              <ArrowRight className='size-4' />
            </Link>
          </Button>
        </div>
        <CardGrid columns={2}>
          {links.map((link) => (
            <DocCard
              key={link.title}
              href={link.href}
              icon={link.icon}
              title={link.title}
              description={link.description}
              external={link.external}
            />
          ))}
        </CardGrid>
      </Container>
    </section>
  )
}

export function DevelopersLanding() {
  return (
    <>
      <Hero />
      <Pillars />
      <StartBuilding />
      <Capabilities />
      <Resources />
    </>
  )
}

export default DevelopersLanding
