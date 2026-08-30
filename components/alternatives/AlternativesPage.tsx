import { ArrowRightIcon, CheckCircle2Icon, ExternalLinkIcon, ScaleIcon, ShieldCheckIcon } from 'lucide-react'

import createVoteImage from '@/assets/images/app/create_vote.webp'
import omniumLogo from '@/assets/images/omnium.webp'
import { Container } from '@/components/Container'
import { Eyebrow } from '@/components/Eyebrow'
import { Link } from '@/components/Link'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'

type ChoiceCriterion = {
  title: string
  text: string
}

type Alternative = {
  name: string
  fit: string
  description: string
  pricing: string
}

export interface AlternativesContent {
  eyebrow: string
  title: string
  intro: string
  primary_cta: string
  primary_cta_aria: string
  image_alt: string
  image_caption: string
  criteria_eyebrow: string
  criteria_title: string
  criteria_intro: string
  criteria: ChoiceCriterion[]
  baseline_title: string
  baseline_text: string
  baseline_points: string[]
  shortlist_eyebrow: string
  shortlist_title: string
  shortlist_intro: string
  alternatives: Alternative[]
  official_source: string
  electionbuddy_features: string
  proof_eyebrow: string
  proof_logo_alt: string
  proof_title: string
  proof_text: string
  proof_link: string
  related_title: string
  related_intro: string
  related_links: {
    app: string
    associations: string
    omnium: string
    secure_voting: string
  }
}

const ALTERNATIVE_SOURCES = [
  '/about-us',
  'https://opavote.com/pricing',
  'https://www.simplyvoting.com/online-voting/',
  'https://www.polyas.com/products/pricing/online-voting',
]

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

export function AlternativesPage({ content }: { content: AlternativesContent }) {
  const criteria = asArray<ChoiceCriterion>(content.criteria)
  const alternatives = asArray<Alternative>(content.alternatives)
  const baselinePoints = asArray<string>(content.baseline_points)
  const relatedLinks = [
    { href: '/app', label: content.related_links.app },
    { href: '/solutions/associations', label: content.related_links.associations },
    { href: '/case-studies/omnium-cultural', label: content.related_links.omnium },
    { href: '/learn/how-secure-online-voting-works', label: content.related_links.secure_voting },
  ]

  return (
    <>
      <section className='relative overflow-hidden pt-10 pb-18 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28'>
        <div className='bg-primary/8 pointer-events-none absolute top-8 -right-40 size-[34rem] rounded-full blur-3xl' />
        <Container>
          <div className='grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16'>
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
              <MotionPreset fade blur slide delay={0.24} transition={{ duration: 0.5 }} className='mt-8'>
                <Button variant='dark' size='lg' asChild>
                  <Link href='/app' variant='inlineIcon' aria-label={content.primary_cta_aria}>
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
            eyebrow={content.criteria_eyebrow}
            title={content.criteria_title}
            lede={content.criteria_intro}
            align='left'
            titleClassName='max-w-3xl text-3xl sm:text-4xl lg:text-5xl'
          />
          <div className='mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4'>
            {criteria.map((criterion, index) => (
              <article key={criterion.title} className='border-foreground/12 border-t pt-5'>
                <p className='text-primary font-mono text-xs tabular-nums'>0{index + 1}</p>
                <h3 className='mt-3 text-xl'>{criterion.title}</h3>
                <p className='text-muted-foreground mt-3 max-w-[34ch] leading-7 text-pretty'>{criterion.text}</p>
              </article>
            ))}
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

              <div className='bg-secondary mt-9 rounded-2xl p-6 sm:p-7'>
                <div className='flex items-center gap-3'>
                  <ScaleIcon className='text-primary size-5' aria-hidden='true' />
                  <h3 className='text-xl'>{content.baseline_title}</h3>
                </div>
                <p className='text-muted-foreground mt-4 leading-7 text-pretty'>{content.baseline_text}</p>
                <ul className='mt-5 space-y-3'>
                  {baselinePoints.map((point) => (
                    <li key={point} className='flex items-start gap-3 text-sm leading-6'>
                      <CheckCircle2Icon className='text-primary mt-0.5 size-4 shrink-0' aria-hidden='true' />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className='mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm'>
                  <Link href='https://electionbuddy.com/pricing/' variant='inlineIcon'>
                    {content.official_source}
                    <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
                  </Link>
                  <Link href='https://electionbuddy.com/features/' variant='inlineIcon'>
                    {content.electionbuddy_features}
                    <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
                  </Link>
                </div>
              </div>
            </div>

            <div className='overflow-hidden rounded-3xl border'>
              {alternatives.map((alternative, index) => (
                <article
                  key={alternative.name}
                  className={
                    index === 0
                      ? 'bg-primary/8 border-b p-7 sm:p-9'
                      : 'bg-background border-b p-7 last:border-b-0 sm:p-9'
                  }
                >
                  <div className='grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start'>
                    <div>
                      <p className='text-primary text-sm font-semibold'>{alternative.fit}</p>
                      <h3 className='mt-2 text-3xl'>{alternative.name}</h3>
                      <p className='text-muted-foreground mt-4 max-w-[58ch] leading-7 text-pretty'>
                        {alternative.description}
                      </p>
                      <p className='mt-4 max-w-[58ch] text-sm leading-6'>{alternative.pricing}</p>
                    </div>
                    <Link
                      href={ALTERNATIVE_SOURCES[index] || '/app'}
                      variant='inlineIcon'
                      className='text-sm font-medium sm:mt-1'
                    >
                      {content.official_source}
                      {index > 0 && <ExternalLinkIcon className='size-3.5' aria-hidden='true' />}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className='pb-16 sm:pb-24'>
        <Container>
          <div className='bg-surface-dark text-surface-dark-foreground grid overflow-hidden rounded-3xl lg:grid-cols-[0.42fr_1fr]'>
            <div className='bg-background flex min-h-56 items-center justify-center p-10'>
              <img
                src={omniumLogo}
                alt={content.proof_logo_alt}
                className='max-h-24 w-auto max-w-52 object-contain'
                loading='eager'
              />
            </div>
            <div className='p-8 sm:p-12 lg:p-14'>
              <Eyebrow className='text-surface-dark-foreground/65'>{content.proof_eyebrow}</Eyebrow>
              <ShieldCheckIcon className='text-primary mt-7 size-10' aria-hidden='true' />
              <h2 className='mt-5 max-w-2xl text-3xl text-balance sm:text-4xl'>{content.proof_title}</h2>
              <p className='text-surface-dark-foreground/70 mt-5 max-w-[62ch] text-lg leading-8 text-pretty'>
                {content.proof_text}
              </p>
              <Link href='/case-studies/omnium-cultural' variant='inlineIcon' className='mt-7 font-semibold'>
                {content.proof_link}
                <ArrowRightIcon className='size-4' aria-hidden='true' />
              </Link>
            </div>
          </div>
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
          <div className='mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2'>
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                variant='unstyled'
                className='group bg-background hover:bg-accent flex min-h-24 items-center justify-between gap-4 p-6 font-medium'
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
