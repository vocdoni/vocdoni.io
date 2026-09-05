import type { LucideIcon } from 'lucide-react'
import {
  ArrowRightIcon,
  ChartNoAxesColumnIncreasingIcon,
  CheckIcon,
  Code2Icon,
  ExternalLinkIcon,
  EyeIcon,
  ReceiptTextIcon,
  ShieldCheckIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'

import resultsImage from '@/assets/product/results.webp'
import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import type {
  VerificationRole,
  VerificationInlineLink,
  VerificationSource,
  VotingVerificationChecklistContent,
} from '@/lib/content/voting-verification-checklist'

const roleIcons: Record<VerificationRole['id'], LucideIcon> = {
  voter: ReceiptTextIcon,
  observer: EyeIcon,
  tally: ChartNoAxesColumnIncreasingIcon,
  auditor: Code2Icon,
}

function LinkedText({ text, links = [] }: { text: string; links?: VerificationInlineLink[] }) {
  const nodes: ReactNode[] = []
  let cursor = 0

  for (const link of links) {
    const start = text.indexOf(link.label, cursor)
    if (start === -1) continue

    nodes.push(text.slice(cursor, start))
    nodes.push(
      <Link key={link.href} href={link.href}>
        {link.label}
      </Link>
    )
    cursor = start + link.label.length
  }

  nodes.push(text.slice(cursor))
  return nodes
}

function EvidenceLink({ source, compact = false }: { source: VerificationSource; compact?: boolean }) {
  const external = source.href.startsWith('http')

  return (
    <Link
      href={source.href}
      variant='unstyled'
      className={
        compact
          ? 'group inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline'
          : 'group block rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary/45 hover:bg-muted/35'
      }
    >
      <span className={compact ? undefined : 'flex items-start justify-between gap-3 text-sm font-semibold'}>
        {source.label}
        {external ? (
          <ExternalLinkIcon className='size-3.5 shrink-0 text-primary' aria-hidden='true' />
        ) : (
          <ArrowRightIcon className='size-3.5 shrink-0 text-primary' aria-hidden='true' />
        )}
      </span>
      {!compact && <span className='mt-2 block text-xs leading-5 text-muted-foreground'>{source.supports}</span>}
    </Link>
  )
}

function RoleCard({ role, content }: { role: VerificationRole; content: VotingVerificationChecklistContent }) {
  const Icon = roleIcons[role.id]

  return (
    <article className='flex h-full flex-col overflow-hidden rounded-card border border-border bg-background shadow-sm'>
      <div className='border-b border-border bg-muted/45 p-6 sm:p-7'>
        <div className='flex items-center justify-between gap-4'>
          <span className='inline-flex size-11 items-center justify-center rounded-full bg-surface-dark text-surface-dark-foreground'>
            <Icon className='size-5 text-primary' aria-hidden='true' />
          </span>
          <span className='font-mono text-sm text-primary'>{role.number}</span>
        </div>
        <p className='mt-6 font-mono text-xs uppercase tracking-[0.16em] text-primary'>{role.role}</p>
        <h3 className='mt-3 text-2xl sm:text-3xl'>{role.question}</h3>
        <p className='mt-4 leading-7 text-muted-foreground'>{role.answer}</p>
      </div>

      <div className='flex flex-1 flex-col p-6 sm:p-7'>
        <p className='font-mono text-xs uppercase tracking-[0.16em] text-faint'>{content.checkLabel}</p>
        <ol className='mt-5 space-y-4'>
          {role.checks.map((check) => (
            <li key={check} className='flex gap-3 text-sm leading-6 text-foreground'>
              <CheckIcon className='mt-1 size-4 shrink-0 text-primary' aria-hidden='true' />
              <span>{check}</span>
            </li>
          ))}
        </ol>

        <div className='mt-auto pt-8'>
          <p className='font-mono text-xs uppercase tracking-[0.16em] text-faint'>{content.sourceLabel}</p>
          <div className='mt-4 grid gap-3'>
            {role.sources.map((source) => (
              <EvidenceLink key={source.href} source={source} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export function VotingVerificationChecklistPage({ content }: { content: VotingVerificationChecklistContent }) {
  return (
    <>
      <Section className='overflow-hidden pt-8 sm:pt-12 lg:pt-16'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center'>
            <MotionPreset fade blur slide transition={{ duration: 0.5 }} className='max-w-3xl'>
              <SectionHeader
                align='left'
                headingLevel='h1'
                eyebrow={content.eyebrow}
                title={content.title}
                lede={content.lede}
                titleClassName='max-w-4xl text-5xl sm:text-6xl lg:text-7xl'
              />
              <div className='mt-8 flex flex-wrap items-center gap-4'>
                <Button asChild variant='dark' size='lg'>
                  <Link href='https://explorer.vote' variant='inlineIcon' ctaId='verification_checklist_explorer'>
                    {content.primaryCta}
                    <ArrowRightIcon aria-hidden='true' />
                  </Link>
                </Button>
                <p className='text-sm text-faint'>{content.reviewed}</p>
              </div>
            </MotionPreset>

            <MotionPreset
              fade
              blur
              slide
              delay={0.15}
              transition={{ duration: 0.5 }}
              className='relative overflow-hidden rounded-card bg-surface-dark p-6 text-surface-dark-foreground shadow-panel sm:p-8'
            >
              <div
                className='absolute -top-12 -right-10 size-44 rounded-full bg-primary/20 blur-3xl'
                aria-hidden='true'
              />
              <div className='relative'>
                <div className='flex items-center justify-between border-b border-surface-dark-foreground/15 pb-5'>
                  <span className='font-mono text-xs uppercase tracking-[0.16em] text-surface-dark-foreground/60'>
                    {content.panelLabel}
                  </span>
                  <ShieldCheckIcon className='size-5 text-primary' aria-hidden='true' />
                </div>
                <div className='mt-4 divide-y divide-surface-dark-foreground/15'>
                  {content.roles.map((role) => {
                    const Icon = roleIcons[role.id]
                    return (
                      <div key={role.id} className='grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4'>
                        <Icon className='size-5 text-primary' aria-hidden='true' />
                        <div>
                          <p className='font-medium'>{role.role}</p>
                          <p className='mt-1 text-sm text-surface-dark-foreground/60'>{role.question}</p>
                        </div>
                        <span className='font-mono text-sm text-primary'>{role.number}</span>
                      </div>
                    )
                  })}
                </div>
                <p className='border-t border-surface-dark-foreground/15 pt-5 text-sm text-surface-dark-foreground/60'>
                  {content.panelFooter}
                </p>
              </div>
            </MotionPreset>
          </div>
        </Container>
      </Section>

      <Section className='bg-muted' aria-labelledby='verification-answer'>
        <Container>
          <div className='grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16'>
            <div>
              <p className='font-mono text-xs uppercase tracking-[0.16em] text-primary'>{content.answerEyebrow}</p>
              <h2 id='verification-answer' className='mt-4 text-4xl sm:text-5xl'>
                {content.answerTitle}
              </h2>
            </div>
            <div>
              <div className='space-y-5 text-lg leading-8 text-muted-foreground'>
                {content.answerParagraphs.map((paragraph, index) => (
                  <p
                    key={paragraph.text}
                    className={
                      index === content.answerParagraphs.length - 1
                        ? 'border-l-2 border-primary pl-5 text-foreground'
                        : undefined
                    }
                  >
                    <LinkedText text={paragraph.text} links={paragraph.links} />
                  </p>
                ))}
              </div>
              <div className='mt-7 flex flex-wrap gap-x-6 gap-y-3'>
                {content.answerSources.map((source) => (
                  <EvidenceLink key={source.href} source={source} compact />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby='role-checks'>
        <Container>
          <SectionHeader
            id='role-checks'
            align='left'
            eyebrow={content.rolesEyebrow}
            title={content.rolesTitle}
            lede={content.rolesLede}
          />
          <div className='mt-12 grid gap-6 lg:grid-cols-2'>
            {content.roles.map((role) => (
              <RoleCard key={role.id} role={role} content={content} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className='bg-secondary' aria-labelledby='result-record'>
        <Container>
          <div className='grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20'>
            <div>
              <SectionHeader
                id='result-record'
                align='left'
                eyebrow={content.resultEyebrow}
                title={content.resultTitle}
                lede={content.resultLede}
              />
              <dl className='mt-8 overflow-hidden rounded-card border border-border bg-background shadow-sm'>
                {content.resultFields.map((item) => (
                  <div
                    key={item.field}
                    className='grid gap-2 border-b border-border p-5 last:border-b-0 sm:grid-cols-[0.36fr_0.64fr] sm:gap-6'
                  >
                    <dt className='font-mono text-sm font-semibold text-primary'>{item.field}</dt>
                    <dd className='text-sm leading-6 text-muted-foreground'>{item.meaning}</dd>
                  </div>
                ))}
              </dl>
              <div className='mt-5'>
                <EvidenceLink source={content.answerSources[2]} compact />
              </div>
            </div>

            <figure className='relative mx-auto max-w-md'>
              <div className='absolute inset-x-12 top-20 h-72 rounded-full bg-primary/18 blur-3xl' aria-hidden='true' />
              <img
                src={resultsImage}
                alt={content.resultImageAlt}
                className='relative mx-auto w-full max-w-[360px] drop-shadow-2xl'
              />
              <figcaption className='relative mt-5 text-center text-xs leading-5 text-faint'>
                {content.resultCaption}
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby='evidence-boundary'>
        <Container>
          <div className='relative overflow-hidden rounded-card bg-surface-dark p-7 text-surface-dark-foreground shadow-panel sm:p-10 lg:p-12'>
            <div
              className='absolute -right-16 -bottom-16 size-64 rounded-full bg-primary/15 blur-3xl'
              aria-hidden='true'
            />
            <div className='relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-16'>
              <div>
                <p className='font-mono text-xs uppercase tracking-[0.16em] text-primary'>{content.boundaryEyebrow}</p>
                <h2 id='evidence-boundary' className='mt-4 max-w-3xl text-4xl sm:text-5xl'>
                  {content.boundaryTitle}
                </h2>
                <p className='mt-6 max-w-3xl text-lg leading-8 text-surface-dark-foreground/70'>
                  {content.boundaryText}
                </p>
                <div className='mt-7'>
                  <Link
                    href={content.boundarySource.href}
                    variant='inlineIcon'
                    className='font-medium text-primary hover:underline'
                  >
                    {content.boundarySource.label}
                    <ArrowRightIcon className='size-4' aria-hidden='true' />
                  </Link>
                </div>
              </div>
              <ul className='grid gap-3'>
                {content.boundaryChecks.map((check) => (
                  <li
                    key={check}
                    className='flex gap-3 rounded-2xl border border-surface-dark-foreground/15 bg-surface-dark-foreground/[0.04] p-4 text-sm leading-6'
                  >
                    <CheckIcon className='mt-1 size-4 shrink-0 text-primary' aria-hidden='true' />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
