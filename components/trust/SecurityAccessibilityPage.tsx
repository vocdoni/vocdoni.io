import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CircleAlertIcon,
  ExternalLinkIcon,
  FileCheck2Icon,
  GithubIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type enCommon from '@/locales/en/common.json'
import coibExperience from '@/assets/images/success/coib_experience.webp'
import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'

type EvidenceStatus = 'documented' | 'operational' | 'not_published'

type EvidenceItem = {
  title: string
  status: EvidenceStatus
  summary: string
  limit: string
  sourceLabel: string
  sourceHref: string
}

const statusStyles: Record<EvidenceStatus, string> = {
  documented: 'border-primary/20 bg-primary/8 text-primary',
  operational: 'border-border bg-secondary text-foreground',
  not_published: 'border-warning/30 bg-warning/10 text-foreground',
}

export default function SecurityAccessibilityPage() {
  const { t } = useTranslation()
  // This claim-sensitive proof page remains English-only until its translations receive editorial review.
  const copy = t('security_accessibility', { lng: 'en', returnObjects: true }) as typeof enCommon.security_accessibility

  const evidence: EvidenceItem[] = [
    {
      title: copy.evidence.items.result.title,
      status: 'documented',
      summary: copy.evidence.items.result.summary,
      limit: copy.evidence.items.result.limit,
      sourceLabel: copy.evidence.items.result.source,
      sourceHref: 'https://explorer.vote',
    },
    {
      title: copy.evidence.items.code.title,
      status: 'documented',
      summary: copy.evidence.items.code.summary,
      limit: copy.evidence.items.code.limit,
      sourceLabel: copy.evidence.items.code.source,
      sourceHref: 'https://github.com/vocdoni',
    },
    {
      title: copy.evidence.items.authentication.title,
      status: 'operational',
      summary: copy.evidence.items.authentication.summary,
      limit: copy.evidence.items.authentication.limit,
      sourceLabel: copy.evidence.items.authentication.source,
      sourceHref: '/case-studies/coib',
    },
    {
      title: copy.evidence.items.privacy.title,
      status: 'documented',
      summary: copy.evidence.items.privacy.summary,
      limit: copy.evidence.items.privacy.limit,
      sourceLabel: copy.evidence.items.privacy.source,
      sourceHref: '/privacy',
    },
    {
      title: copy.evidence.items.admin_log.title,
      status: 'not_published',
      summary: copy.evidence.items.admin_log.summary,
      limit: copy.evidence.items.admin_log.limit,
      sourceLabel: copy.evidence.items.admin_log.source,
      sourceHref: '/contact',
    },
    {
      title: copy.evidence.items.accessibility.title,
      status: 'not_published',
      summary: copy.evidence.items.accessibility.summary,
      limit: copy.evidence.items.accessibility.limit,
      sourceLabel: copy.evidence.items.accessibility.source,
      sourceHref: '/contact',
    },
  ]

  const statusLabels: Record<EvidenceStatus, string> = {
    documented: copy.status.documented,
    operational: copy.status.operational,
    not_published: copy.status.not_published,
  }

  const checklist = [
    copy.checklist.items[0],
    copy.checklist.items[1],
    copy.checklist.items[2],
    copy.checklist.items[3],
    copy.checklist.items[4],
    copy.checklist.items[5],
  ]

  return (
    <>
      <Section className='overflow-hidden pt-8 sm:pt-12 lg:pt-16'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center'>
            <MotionPreset fade blur slide transition={{ duration: 0.5 }} className='max-w-3xl'>
              <SectionHeader
                align='left'
                headingLevel='h1'
                eyebrow={copy.hero.eyebrow}
                title={copy.hero.title}
                lede={copy.hero.lede}
                titleClassName='max-w-4xl text-5xl sm:text-6xl lg:text-7xl'
              />
              <div className='mt-8 flex flex-wrap items-center gap-4'>
                <Button asChild variant='dark' size='lg'>
                  <Link href='https://developer.vocdoni.io' variant='inlineIcon' ctaId='security_evidence_docs'>
                    {copy.hero.cta}
                    <ArrowRightIcon aria-hidden='true' />
                  </Link>
                </Button>
                <p className='text-faint text-sm'>{copy.hero.reviewed}</p>
              </div>
            </MotionPreset>

            <MotionPreset
              fade
              blur
              slide
              delay={0.15}
              transition={{ duration: 0.5 }}
              className='relative rounded-card bg-surface-dark p-6 text-surface-dark-foreground shadow-panel sm:p-8'
            >
              <div className='absolute top-6 right-6 size-24 rounded-full bg-primary/20 blur-3xl' aria-hidden='true' />
              <div className='relative'>
                <div className='mb-8 flex items-center justify-between border-b border-surface-dark-foreground/15 pb-5'>
                  <span className='font-mono text-xs uppercase tracking-[0.16em] text-surface-dark-foreground/60'>
                    {copy.hero.panel.label}
                  </span>
                  <ShieldCheckIcon className='size-5 text-primary' aria-hidden='true' />
                </div>
                <div className='space-y-6'>
                  <div className='grid grid-cols-[auto_1fr] items-start gap-4'>
                    <span className='font-mono text-3xl text-primary'>04</span>
                    <div>
                      <p className='font-medium'>{copy.hero.panel.public_title}</p>
                      <p className='mt-1 text-sm leading-6 text-surface-dark-foreground/60'>
                        {copy.hero.panel.public_text}
                      </p>
                    </div>
                  </div>
                  <div className='grid grid-cols-[auto_1fr] items-start gap-4'>
                    <span className='font-mono text-3xl text-primary'>01</span>
                    <div>
                      <p className='font-medium'>{copy.hero.panel.case_title}</p>
                      <p className='mt-1 text-sm leading-6 text-surface-dark-foreground/60'>
                        {copy.hero.panel.case_text}
                      </p>
                    </div>
                  </div>
                  <div className='grid grid-cols-[auto_1fr] items-start gap-4'>
                    <span className='font-mono text-3xl text-warning'>02</span>
                    <div>
                      <p className='font-medium'>{copy.hero.panel.gaps_title}</p>
                      <p className='mt-1 text-sm leading-6 text-surface-dark-foreground/60'>
                        {copy.hero.panel.gaps_text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionPreset>
          </div>
        </Container>
      </Section>

      <Section className='bg-muted' aria-labelledby='audit-trail-answer'>
        <Container>
          <div className='grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16'>
            <div>
              <p className='font-mono text-xs uppercase tracking-[0.16em] text-primary'>{copy.answer.label}</p>
              <h2 id='audit-trail-answer' className='mt-4 text-4xl sm:text-5xl'>
                {copy.answer.title}
              </h2>
            </div>
            <div className='space-y-5 text-lg leading-8 text-muted-foreground'>
              <p>{copy.answer.paragraphs[0]}</p>
              <p>{copy.answer.paragraphs[1]}</p>
              <p className='border-l-2 border-primary pl-5 text-foreground'>{copy.answer.paragraphs[2]}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby='evidence-register'>
        <Container>
          <SectionHeader
            id='evidence-register'
            align='left'
            eyebrow={copy.evidence.eyebrow}
            title={copy.evidence.title}
            lede={copy.evidence.lede}
          />

          <div className='mt-12 overflow-hidden rounded-card border border-border bg-background shadow-sm'>
            {evidence.map((item, index) => (
              <article
                key={item.title}
                className='grid gap-5 border-b border-border p-6 last:border-b-0 sm:p-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-10'
              >
                <div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                  >
                    {statusLabels[item.status]}
                  </span>
                  <h3 className='mt-4 text-2xl'>{item.title}</h3>
                  <span className='mt-3 block font-mono text-xs text-faint'>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className='space-y-4'>
                  <p className='leading-7 text-foreground'>{item.summary}</p>
                  <p className='text-sm leading-6 text-muted-foreground'>{item.limit}</p>
                  <Link href={item.sourceHref} variant='inlineIcon' className='text-sm font-medium text-primary'>
                    {item.sourceLabel}
                    {item.sourceHref.startsWith('http') ? (
                      <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
                    ) : (
                      <ArrowRightIcon className='size-3.5' aria-hidden='true' />
                    )}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className='bg-secondary' aria-labelledby='accessibility-evidence'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16'>
            <div>
              <SectionHeader
                id='accessibility-evidence'
                align='left'
                eyebrow={copy.accessibility.eyebrow}
                title={copy.accessibility.title}
                lede={copy.accessibility.lede}
              />
              <div className='mt-8 grid gap-5 sm:grid-cols-2'>
                <div className='rounded-card border border-border bg-background p-6 shadow-sm'>
                  <CheckCircle2Icon className='size-5 text-primary' aria-hidden='true' />
                  <h3 className='mt-4 text-xl'>{copy.accessibility.proven.title}</h3>
                  <p className='mt-3 text-sm leading-6 text-muted-foreground'>{copy.accessibility.proven.text}</p>
                </div>
                <div className='rounded-card border border-warning/30 bg-warning/10 p-6'>
                  <CircleAlertIcon className='size-5 text-warning' aria-hidden='true' />
                  <h3 className='mt-4 text-xl'>{copy.accessibility.missing.title}</h3>
                  <p className='mt-3 text-sm leading-6 text-muted-foreground'>{copy.accessibility.missing.text}</p>
                </div>
              </div>
            </div>

            <figure className='overflow-hidden rounded-card border border-border bg-background shadow-panel'>
              <img
                src={coibExperience}
                alt={copy.accessibility.image_alt}
                className='aspect-[4/3] w-full object-cover'
              />
              <figcaption className='border-t border-border p-5 text-sm leading-6 text-muted-foreground'>
                {copy.accessibility.caption}
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby='buyer-checklist'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16'>
            <SectionHeader
              id='buyer-checklist'
              align='left'
              eyebrow={copy.checklist.eyebrow}
              title={copy.checklist.title}
              lede={copy.checklist.lede}
            />
            <ol className='grid gap-4 sm:grid-cols-2'>
              {checklist.map((item, index) => (
                <li key={item} className='rounded-card border border-border bg-background p-6 shadow-sm'>
                  <span className='font-mono text-sm text-primary'>{String(index + 1).padStart(2, '0')}</span>
                  <p className='mt-4 leading-7 text-muted-foreground'>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section className='bg-muted' aria-labelledby='source-paths'>
        <Container>
          <SectionHeader
            id='source-paths'
            eyebrow={copy.sources.eyebrow}
            title={copy.sources.title}
            lede={copy.sources.lede}
          />
          <div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {[
              {
                icon: ShieldCheckIcon,
                title: copy.sources.items.secure.title,
                text: copy.sources.items.secure.text,
                href: '/learn/how-secure-online-voting-works',
              },
              {
                icon: ScanSearchIcon,
                title: copy.sources.items.verify.title,
                text: copy.sources.items.verify.text,
                href: '/learn/verifiable-voting-explained',
              },
              {
                icon: FileCheck2Icon,
                title: copy.sources.items.gdpr.title,
                text: copy.sources.items.gdpr.text,
                href: '/learn/gdpr-requirements-for-digital-voting',
              },
              {
                icon: GithubIcon,
                title: copy.sources.items.coib.title,
                text: copy.sources.items.coib.text,
                href: '/case-studies/coib',
              },
            ].map(({ icon: Icon, title, text, href }) => (
              <Link
                key={href}
                href={href}
                variant='unstyled'
                className='group rounded-card border border-border bg-background p-6 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg'
              >
                <Icon className='size-5 text-primary' aria-hidden='true' />
                <h3 className='mt-5 text-xl'>{title}</h3>
                <p className='mt-3 text-sm leading-6 text-muted-foreground'>{text}</p>
                <span className='mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary'>
                  {copy.sources.read}
                  <ArrowRightIcon
                    className='size-4 transition-transform duration-150 group-hover:translate-x-1'
                    aria-hidden='true'
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
