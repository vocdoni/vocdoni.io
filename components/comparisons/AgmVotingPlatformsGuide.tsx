import {
  ArrowRightIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  ListChecksIcon,
  MonitorPlayIcon,
  VoteIcon,
} from 'lucide-react'

import createVoteImage from '@/assets/images/app/create_vote.webp'
import { Container } from '@/components/Container'
import { Eyebrow } from '@/components/Eyebrow'
import { Link } from '@/components/Link'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import {
  agmPlatformGuideContent,
  meetingSuites,
  type AgmPlatform,
  votingPlatforms,
} from '@/lib/content/agm-voting-platforms'

function PlatformCard({ platform, featured = false }: { platform: AgmPlatform; featured?: boolean }) {
  const content = agmPlatformGuideContent

  return (
    <article
      className={
        featured ? 'bg-primary/8 rounded-2xl border p-7 sm:p-8' : 'bg-background rounded-2xl border p-7 sm:p-8'
      }
    >
      <p className='text-primary text-sm font-semibold'>{platform.model}</p>
      <h3 className='mt-2 text-3xl'>{platform.name}</h3>
      <p className='text-muted-foreground mt-4 max-w-[64ch] leading-7 text-pretty'>{platform.summary}</p>
      <dl className='mt-6 grid gap-5 border-t pt-6 sm:grid-cols-2'>
        <div>
          <dt className='font-mono text-xs uppercase tracking-[0.14em]'>{content.priceLabel}</dt>
          <dd className='text-muted-foreground mt-2 leading-7 text-pretty'>{platform.price}</dd>
        </div>
        <div>
          <dt className='font-mono text-xs uppercase tracking-[0.14em]'>{content.checkLabel}</dt>
          <dd className='text-muted-foreground mt-2 leading-7 text-pretty'>{platform.check}</dd>
        </div>
      </dl>
      <div className='mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium'>
        <Link href={platform.detailsHref} target='_blank' variant='inlineIcon'>
          {content.productSourceLabel}
          <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
        </Link>
        <Link href={platform.priceHref} target='_blank' variant='inlineIcon'>
          {content.priceSourceLabel}
          <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
        </Link>
      </div>
    </article>
  )
}

export function AgmVotingPlatformsGuide() {
  const content = agmPlatformGuideContent

  return (
    <>
      <section className='relative overflow-hidden pt-10 pb-18 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28'>
        <div className='bg-primary/8 pointer-events-none absolute top-6 -right-40 size-[34rem] rounded-full blur-3xl' />
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
                  <Link
                    href={APP_URL}
                    target='_blank'
                    variant='inlineIcon'
                    ctaId='agm_platform_guide_start'
                    aria-label={content.primaryCtaAria}
                  >
                    {content.primaryCta}
                    <ArrowRightIcon aria-hidden='true' />
                  </Link>
                </Button>
              </MotionPreset>
            </div>

            <MotionPreset fade blur slide delay={0.18} transition={{ duration: 0.55 }} className='relative'>
              <div className='bg-card overflow-hidden rounded-3xl border shadow-xl'>
                <div className='flex items-center gap-2 border-b px-5 py-4 text-sm font-medium sm:px-6'>
                  <span className='bg-primary size-2.5 rounded-full' aria-hidden='true' />
                  <span>{content.imageCaption}</span>
                </div>
                <img
                  src={createVoteImage}
                  alt={content.imageAlt}
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
            eyebrow={content.boundaryEyebrow}
            title={content.boundaryTitle}
            lede={content.boundaryIntro}
            align='left'
            titleClassName='max-w-4xl text-3xl sm:text-4xl lg:text-5xl'
          />
          <div className='mt-10 grid overflow-hidden rounded-3xl border lg:grid-cols-2'>
            <article className='bg-background border-b p-8 sm:p-10 lg:border-r lg:border-b-0'>
              <VoteIcon className='text-primary size-8' aria-hidden='true' />
              <h3 className='mt-8 text-3xl'>{content.votingLayerTitle}</h3>
              <p className='text-muted-foreground mt-4 max-w-[58ch] text-lg leading-8 text-pretty'>
                {content.votingLayerText}
              </p>
            </article>
            <article className='bg-surface-dark text-surface-dark-foreground p-8 sm:p-10'>
              <MonitorPlayIcon className='text-primary size-8' aria-hidden='true' />
              <h3 className='mt-8 text-3xl'>{content.meetingSuiteTitle}</h3>
              <p className='text-surface-dark-foreground/70 mt-4 max-w-[58ch] text-lg leading-8 text-pretty'>
                {content.meetingSuiteText}
              </p>
            </article>
          </div>
          <div className='mt-6 flex items-start gap-4 rounded-2xl border bg-background p-6 sm:p-7'>
            <ListChecksIcon className='text-primary mt-1 size-5 shrink-0' aria-hidden='true' />
            <div>
              <h3 className='text-lg font-semibold'>{content.serviceNoteTitle}</h3>
              <p className='text-muted-foreground mt-2 max-w-[76ch] leading-7 text-pretty'>{content.serviceNoteText}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className='py-16 sm:py-24'>
        <Container>
          <SectionHeader
            eyebrow={content.optionsEyebrow}
            title={content.optionsTitle}
            lede={content.optionsIntro}
            align='left'
            titleClassName='max-w-4xl text-3xl sm:text-4xl lg:text-5xl'
          />

          <div className='mt-12 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8'>
            <div>
              <div className='mb-5 flex items-center gap-3'>
                <VoteIcon className='text-primary size-5' aria-hidden='true' />
                <h3 className='text-xl font-semibold'>{content.votingOptionsTitle}</h3>
              </div>
              <div className='space-y-5'>
                {votingPlatforms.map((platform, index) => (
                  <PlatformCard key={platform.name} platform={platform} featured={index === 0} />
                ))}
              </div>
            </div>

            <div>
              <div className='mb-5 flex items-center gap-3'>
                <MonitorPlayIcon className='text-primary size-5' aria-hidden='true' />
                <h3 className='text-xl font-semibold'>{content.suiteOptionsTitle}</h3>
              </div>
              <div className='space-y-5'>
                {meetingSuites.map((platform) => (
                  <PlatformCard key={platform.name} platform={platform} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className='bg-muted/45 border-y py-16 sm:py-22'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16'>
            <div className='lg:sticky lg:top-32 lg:self-start'>
              <Eyebrow>{content.checklistEyebrow}</Eyebrow>
              <h2 className='mt-5 text-4xl text-balance sm:text-5xl'>{content.checklistTitle}</h2>
              <p className='text-muted-foreground mt-5 max-w-[46ch] text-lg leading-8 text-pretty'>
                {content.checklistIntro}
              </p>
            </div>
            <ol className='grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2'>
              {content.checklist.map((item, index) => (
                <li key={item} className='bg-background flex min-h-32 gap-4 p-7 leading-7'>
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
            title={content.fitTitle}
            lede={content.fitIntro}
            align='left'
            titleClassName='max-w-3xl text-3xl sm:text-4xl lg:text-5xl'
          />
          <div className='mt-10 grid gap-5 lg:grid-cols-2'>
            <article className='bg-primary/8 rounded-2xl border p-7 sm:p-9'>
              <h3 className='text-2xl'>{content.fitYesTitle}</h3>
              <ul className='mt-6 space-y-4'>
                {content.fitYes.map((item) => (
                  <li key={item} className='flex items-start gap-3 leading-7'>
                    <CheckCircle2Icon className='text-primary mt-1 size-4 shrink-0' aria-hidden='true' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className='bg-background rounded-2xl border p-7 sm:p-9'>
              <h3 className='text-2xl'>{content.fitNoTitle}</h3>
              <ul className='mt-6 space-y-4'>
                {content.fitNo.map((item) => (
                  <li key={item} className='flex items-start gap-3 leading-7'>
                    <ArrowRightIcon className='text-primary mt-1 size-4 shrink-0' aria-hidden='true' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <aside className='mt-8 rounded-2xl border p-7 sm:p-9'>
            <h3 className='text-2xl'>{content.methodTitle}</h3>
            <p className='text-muted-foreground mt-4 max-w-[76ch] leading-7 text-pretty'>{content.methodText}</p>
          </aside>
        </Container>
      </section>

      <section className='bg-muted/45 border-y py-16 sm:py-20'>
        <Container className='max-w-6xl'>
          <SectionHeader
            title={content.relatedTitle}
            lede={content.relatedIntro}
            align='left'
            titleClassName='text-3xl sm:text-4xl'
          />
          <div className='mt-8 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-3'>
            {content.relatedLinks.map((item) => (
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
