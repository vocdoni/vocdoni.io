import { ArrowRightIcon, CheckCircle2Icon, ExternalLinkIcon, ScaleIcon, ShieldCheckIcon, VideoIcon } from 'lucide-react'

import createVoteImage from '@/assets/images/app/create_vote.webp'
import { Container } from '@/components/Container'
import { Eyebrow } from '@/components/Eyebrow'
import { Link } from '@/components/Link'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'

type ServiceModel = {
  title: string
  text: string
}

type Vendor = {
  name: string
  model: string
  best_for: string
  check: string
}

export interface OnlineVotingSoftwareContent {
  eyebrow: string
  title: string
  intro: string
  reviewed: string
  primary_cta: string
  primary_cta_aria: string
  image_alt: string
  image_caption: string
  models_eyebrow: string
  models_title: string
  models_intro: string
  models: ServiceModel[]
  shortlist_eyebrow: string
  shortlist_title: string
  shortlist_intro: string
  vendors: Vendor[]
  vendor_fit_label: string
  vendor_check_label: string
  official_details: string
  official_scope: string
  meeting_title: string
  meeting_text: string
  meeting_source: string
  checklist_title: string
  checklist_intro: string
  checklist: string[]
  fit_title: string
  fit_intro: string
  fit_yes_title: string
  fit_yes: string[]
  fit_no_title: string
  fit_no: string[]
  method_title: string
  method_text: string
  source_note: string
  related_title: string
  related_intro: string
  related_links: {
    home: string
    associations: string
    agm: string
    pricing: string
    electionbuddy_alternatives: string
    security: string
  }
}

const VENDOR_SOURCES = [
  {
    details: 'https://vocdoni.io/en/app',
    scope:
      'https://github.com/vocdoni/vocdoni-app/blob/3edf755919160ff730e71c6b5ad97b9cd3c34027/src/components/Process/Create/MainContent/QuestionSettings.tsx',
  },
  { details: 'https://electionbuddy.com/features/', scope: 'https://electionbuddy.com/pricing/' },
  {
    details: 'https://www.simplyvoting.com/online-voting/',
    scope: 'https://www.simplyvoting.com/pricing/',
  },
  { details: 'https://opavote.com/methods/overview', scope: 'https://opavote.com/pricing' },
]

const MODEL_ICONS = [ShieldCheckIcon, ScaleIcon, VideoIcon]
const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

export function OnlineVotingSoftwareGuide({ content }: { content: OnlineVotingSoftwareContent }) {
  const models = asArray<ServiceModel>(content.models)
  const vendors = asArray<Vendor>(content.vendors)
  const checklist = asArray<string>(content.checklist)
  const fitYes = asArray<string>(content.fit_yes)
  const fitNo = asArray<string>(content.fit_no)
  const relatedLinks = [
    { href: '/', label: content.related_links.home },
    { href: '/solutions/associations', label: content.related_links.associations },
    { href: '/solutions/companies-agm', label: content.related_links.agm },
    { href: '/pricing', label: content.related_links.pricing },
    { href: '/alternatives/electionbuddy-alternatives', label: content.related_links.electionbuddy_alternatives },
    { href: '/learn/how-secure-online-voting-works', label: content.related_links.security },
  ]

  return (
    <>
      <section className='relative overflow-hidden pt-10 pb-18 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28'>
        <div className='bg-primary/8 pointer-events-none absolute top-8 -right-40 size-[34rem] rounded-full blur-3xl' />
        <Container>
          <div className='grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16'>
            <div className='relative z-10 max-w-2xl'>
              <MotionPreset fade blur slide transition={{ duration: 0.45 }}>
                <Eyebrow withHalo>{content.eyebrow}</Eyebrow>
              </MotionPreset>
              <MotionPreset
                component='h1'
                className='mt-5 max-w-3xl text-4xl leading-[0.98] text-balance sm:text-5xl lg:text-6xl xl:text-7xl'
                fade
                blur
                slide
                delay={0.08}
                transition={{ duration: 0.5 }}
              >
                {content.title}
              </MotionPreset>
              <MotionPreset
                component='p'
                className='text-muted-foreground mt-6 max-w-[58ch] text-lg leading-8 text-pretty sm:text-xl'
                fade
                blur
                slide
                delay={0.16}
                transition={{ duration: 0.5 }}
              >
                {content.intro}
              </MotionPreset>
              <MotionPreset fade blur slide delay={0.24} transition={{ duration: 0.5 }}>
                <p className='text-muted-foreground mt-5 font-mono text-xs uppercase tracking-[0.16em]'>
                  {content.reviewed}
                </p>
                <Button variant='dark' size='lg' asChild className='mt-8'>
                  <Link href={APP_URL} target='_blank' variant='inlineIcon' aria-label={content.primary_cta_aria}>
                    {content.primary_cta}
                    <ArrowRightIcon aria-hidden='true' />
                  </Link>
                </Button>
              </MotionPreset>
            </div>

            <MotionPreset fade blur slide delay={0.18} transition={{ duration: 0.55 }} className='relative'>
              <div className='bg-card overflow-hidden rounded-3xl border shadow-xl'>
                <div className='flex items-center gap-2 border-b px-5 py-4 text-sm font-medium sm:px-6'>
                  <span className='bg-primary size-2.5 rounded-full' aria-hidden='true' />
                  <span>{content.image_caption}</span>
                </div>
                <img
                  src={createVoteImage}
                  alt={content.image_alt}
                  className='aspect-[4/3] w-full object-cover object-top'
                  loading='eager'
                />
              </div>
            </MotionPreset>
          </div>
        </Container>
      </section>

      <section className='bg-muted/45 border-y py-16 sm:py-22'>
        <Container>
          <SectionHeader
            eyebrow={content.models_eyebrow}
            title={content.models_title}
            lede={content.models_intro}
            align='left'
            titleClassName='max-w-3xl text-3xl sm:text-4xl lg:text-5xl'
          />
          <div className='mt-10 grid gap-5 lg:grid-cols-3'>
            {models.map((model, index) => {
              const ModelIcon = MODEL_ICONS[index] || CheckCircle2Icon
              return (
                <article key={model.title} className='bg-background rounded-2xl border p-7 shadow-sm sm:p-8'>
                  <ModelIcon className='text-primary size-6' aria-hidden='true' />
                  <h3 className='mt-6 text-2xl'>{model.title}</h3>
                  <p className='text-muted-foreground mt-4 leading-7 text-pretty'>{model.text}</p>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      <section className='py-16 sm:py-24'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16'>
            <div className='lg:sticky lg:top-32 lg:self-start'>
              <Eyebrow>{content.shortlist_eyebrow}</Eyebrow>
              <h2 className='mt-5 text-4xl text-balance sm:text-5xl'>{content.shortlist_title}</h2>
              <p className='text-muted-foreground mt-5 max-w-[48ch] text-lg leading-8 text-pretty'>
                {content.shortlist_intro}
              </p>
            </div>

            <div className='overflow-hidden rounded-3xl border'>
              {vendors.map((vendor, index) => (
                <article
                  key={vendor.name}
                  className={
                    index === 0
                      ? 'bg-primary/8 border-b p-7 sm:p-9'
                      : 'bg-background border-b p-7 last:border-b-0 sm:p-9'
                  }
                >
                  <div className='flex flex-wrap items-start justify-between gap-4'>
                    <div>
                      <p className='text-primary text-sm font-semibold'>{vendor.model}</p>
                      <h3 className='mt-2 text-3xl'>{vendor.name}</h3>
                    </div>
                    <div className='flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium'>
                      <Link
                        href={(VENDOR_SOURCES[index] || VENDOR_SOURCES[0]).details}
                        target='_blank'
                        variant='inlineIcon'
                      >
                        {content.official_details}
                        <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
                      </Link>
                      <Link
                        href={(VENDOR_SOURCES[index] || VENDOR_SOURCES[0]).scope}
                        target='_blank'
                        variant='inlineIcon'
                      >
                        {content.official_scope}
                        <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
                      </Link>
                    </div>
                  </div>
                  <dl className='mt-6 grid gap-5 sm:grid-cols-2'>
                    <div>
                      <dt className='font-mono text-xs uppercase tracking-[0.14em]'>{content.vendor_fit_label}</dt>
                      <dd className='text-muted-foreground mt-2 leading-7 text-pretty'>{vendor.best_for}</dd>
                    </div>
                    <div>
                      <dt className='font-mono text-xs uppercase tracking-[0.14em]'>{content.vendor_check_label}</dt>
                      <dd className='text-muted-foreground mt-2 leading-7 text-pretty'>{vendor.check}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className='pb-16 sm:pb-24'>
        <Container>
          <div className='bg-surface-dark text-surface-dark-foreground grid overflow-hidden rounded-3xl lg:grid-cols-[0.4fr_1fr]'>
            <div className='bg-primary/15 flex min-h-56 items-center justify-center p-10'>
              <VideoIcon className='text-primary size-20' aria-hidden='true' />
            </div>
            <div className='p-8 sm:p-12 lg:p-14'>
              <h2 className='max-w-2xl text-3xl text-balance sm:text-4xl'>{content.meeting_title}</h2>
              <p className='text-surface-dark-foreground/70 mt-5 max-w-[64ch] text-lg leading-8 text-pretty'>
                {content.meeting_text}
              </p>
              <Link
                href='https://www.lumiglobal.com/agm'
                target='_blank'
                variant='inlineIcon'
                className='mt-7 font-semibold'
              >
                {content.meeting_source}
                <ExternalLinkIcon className='size-4' aria-hidden='true' />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className='bg-muted/45 border-y py-16 sm:py-22'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16'>
            <div>
              <h2 className='text-4xl text-balance sm:text-5xl'>{content.checklist_title}</h2>
              <p className='text-muted-foreground mt-5 max-w-[46ch] text-lg leading-8 text-pretty'>
                {content.checklist_intro}
              </p>
            </div>
            <ol className='grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2'>
              {checklist.map((item, index) => (
                <li key={item} className='bg-background flex min-h-28 gap-4 p-6 leading-7'>
                  <span className='text-primary font-mono text-xs tabular-nums'>0{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className='py-16 sm:py-24'>
        <Container className='max-w-6xl'>
          <SectionHeader
            title={content.fit_title}
            lede={content.fit_intro}
            align='left'
            titleClassName='max-w-3xl text-3xl sm:text-4xl lg:text-5xl'
          />
          <div className='mt-10 grid gap-5 lg:grid-cols-2'>
            <article className='bg-primary/8 rounded-2xl border p-7 sm:p-9'>
              <h3 className='text-2xl'>{content.fit_yes_title}</h3>
              <ul className='mt-6 space-y-4'>
                {fitYes.map((item) => (
                  <li key={item} className='flex items-start gap-3 leading-7'>
                    <CheckCircle2Icon className='text-primary mt-1 size-4 shrink-0' aria-hidden='true' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className='bg-background rounded-2xl border p-7 sm:p-9'>
              <h3 className='text-2xl'>{content.fit_no_title}</h3>
              <ul className='mt-6 space-y-4'>
                {fitNo.map((item) => (
                  <li key={item} className='flex items-start gap-3 leading-7'>
                    <ArrowRightIcon className='text-primary mt-1 size-4 shrink-0' aria-hidden='true' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <aside className='mt-8 rounded-2xl border p-7 sm:p-9'>
            <h3 className='text-2xl'>{content.method_title}</h3>
            <p className='text-muted-foreground mt-4 max-w-[76ch] leading-7 text-pretty'>{content.method_text}</p>
            <p className='text-muted-foreground mt-4 font-mono text-xs leading-5 uppercase'>{content.source_note}</p>
          </aside>
        </Container>
      </section>

      <section className='bg-muted/45 border-y py-16 sm:py-20'>
        <Container className='max-w-5xl'>
          <SectionHeader
            title={content.related_title}
            lede={content.related_intro}
            align='left'
            titleClassName='text-3xl sm:text-4xl'
          />
          <div className='mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3'>
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                variant='unstyled'
                className='group bg-background hover:bg-accent flex min-h-28 items-center justify-between gap-4 p-6 font-medium'
              >
                {item.label}
                <ArrowRightIcon
                  className='text-primary size-4 shrink-0 transition-transform group-hover:translate-x-1'
                  aria-hidden='true'
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
