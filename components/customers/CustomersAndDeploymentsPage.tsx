import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  FileCheck2Icon,
  PercentIcon,
  UsersIcon,
  VoteIcon,
} from 'lucide-react'

import logoBellpuig from '@/assets/logos/logo_bellpuig_colour.webp'
import logoCoib from '@/assets/logos/logo_coib_round.webp'
import logoErc from '@/assets/logos/erc.webp'
import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import type { CustomersAndDeploymentsContent, DeploymentRecord } from '@/lib/content/customers-and-deployments'

const logos = {
  coib: logoCoib,
  esquerra: logoErc,
  bellpuig: logoBellpuig,
}

const factIcons = {
  date: CalendarDaysIcon,
  electorate: UsersIcon,
  ballots: VoteIcon,
  turnout: PercentIcon,
}

type FactKey = keyof typeof factIcons

function DeploymentRecordCard({
  record,
  index,
  content,
}: {
  record: DeploymentRecord
  index: number
  content: CustomersAndDeploymentsContent
}) {
  const facts: Array<{ key: FactKey; value: string }> = [
    { key: 'date', value: record.date },
    { key: 'electorate', value: record.electorate },
    { key: 'ballots', value: record.ballots },
    { key: 'turnout', value: record.turnout },
  ]

  return (
    <article className='overflow-hidden rounded-card border border-border bg-background shadow-sm'>
      <div className='grid gap-6 border-b border-border bg-muted/45 p-6 sm:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center'>
        <div className='flex items-center gap-4'>
          <img
            src={logos[record.logo]}
            alt=''
            className='size-16 rounded-full bg-white object-contain p-2 shadow-sm image-outline'
          />
          <div>
            <p className='font-mono text-xs uppercase tracking-[0.16em] text-primary'>{record.organizationType}</p>
            <h3 className='mt-2 text-2xl sm:text-3xl'>{record.organization}</h3>
          </div>
        </div>
        <div className='lg:border-l lg:border-border lg:pl-8'>
          <p className='font-mono text-xs uppercase tracking-[0.16em] text-faint'>{content.relationshipLabel}</p>
          <p className='mt-2 text-lg font-medium leading-7'>{record.relationship}</p>
        </div>
      </div>

      <div className='grid lg:grid-cols-[1fr_1fr]'>
        <dl className='grid gap-px bg-border sm:grid-cols-2'>
          {facts.map(({ key, value }) => {
            const Icon = factIcons[key]
            return (
              <div key={key} className='bg-background p-6 sm:p-7'>
                <dt className='flex items-center gap-2 text-sm font-semibold'>
                  <Icon className='size-4 text-primary' aria-hidden='true' />
                  {content.factLabels[key]}
                </dt>
                <dd className='mt-3 text-sm leading-6 text-muted-foreground'>{value}</dd>
              </div>
            )
          })}
        </dl>

        <div className='border-t border-border p-6 sm:p-8 lg:border-t-0 lg:border-l'>
          <div>
            <p className='text-sm font-semibold'>{content.factLabels.productRole}</p>
            <p className='mt-3 leading-7 text-muted-foreground'>{record.productRole}</p>
          </div>
          <div className='mt-6 border-l-2 border-primary pl-4'>
            <p className='text-sm font-semibold'>{content.evidenceNoteLabel}</p>
            <p className='mt-2 text-sm leading-6 text-muted-foreground'>{record.evidenceNote}</p>
          </div>
        </div>
      </div>

      <div className='border-t border-border p-6 sm:p-8'>
        <div className='flex items-center justify-between gap-4'>
          <p className='font-mono text-xs uppercase tracking-[0.16em] text-faint'>{content.sourceLabel}</p>
          <span className='font-mono text-xs text-primary'>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <ul className='mt-5 grid gap-3 lg:grid-cols-3'>
          {record.sources.map((source) => {
            const external = source.href.startsWith('http')
            return (
              <li key={source.href}>
                <Link
                  href={source.href}
                  variant='unstyled'
                  className='group block h-full rounded-2xl border border-border p-4 transition-colors hover:border-primary/45 hover:bg-muted/40'
                >
                  <span className='flex items-start justify-between gap-3 text-sm font-semibold'>
                    {source.label}
                    {external ? (
                      <ExternalLinkIcon className='mt-0.5 size-4 shrink-0 text-primary' aria-hidden='true' />
                    ) : (
                      <ArrowRightIcon className='mt-0.5 size-4 shrink-0 text-primary' aria-hidden='true' />
                    )}
                  </span>
                  <span className='mt-2 block text-xs font-medium text-primary'>{source.publisher}</span>
                  <span className='mt-2 block text-xs leading-5 text-muted-foreground'>{source.supports}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </article>
  )
}

export function CustomersAndDeploymentsPage({ content }: { content: CustomersAndDeploymentsContent }) {
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
                  <Link href={APP_URL} variant='inlineIcon' ctaId='deployment_registry_start'>
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
                    {content.evidencePanelLabel}
                  </span>
                  <FileCheck2Icon className='size-5 text-primary' aria-hidden='true' />
                </div>
                <div className='mt-7 space-y-5'>
                  {content.evidencePanelItems.map((item) => (
                    <div key={item} className='flex items-center gap-3'>
                      <CheckCircle2Icon className='size-5 shrink-0 text-primary' aria-hidden='true' />
                      <p className='text-lg'>{item}</p>
                    </div>
                  ))}
                </div>
                <div className='mt-8 border-t border-surface-dark-foreground/15 pt-5'>
                  <p className='font-mono text-4xl text-primary'>03</p>
                  <p className='mt-1 text-sm text-surface-dark-foreground/60'>{content.evidencePanelCountText}</p>
                </div>
              </div>
            </MotionPreset>
          </div>
        </Container>
      </Section>

      <Section className='bg-muted' aria-labelledby='deployment-answer'>
        <Container>
          <div className='grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16'>
            <div>
              <p className='font-mono text-xs uppercase tracking-[0.16em] text-primary'>{content.answerEyebrow}</p>
              <h2 id='deployment-answer' className='mt-4 text-4xl sm:text-5xl'>
                {content.answerTitle}
              </h2>
            </div>
            <div className='space-y-5 text-lg leading-8 text-muted-foreground'>
              {content.answerParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 2 ? 'border-l-2 border-primary pl-5 text-foreground' : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby='deployment-register'>
        <Container>
          <SectionHeader
            id='deployment-register'
            align='left'
            eyebrow={content.registryEyebrow}
            title={content.registryTitle}
            lede={content.registryLede}
          />
          <div className='mt-12 space-y-8'>
            {content.records.map((record, index) => (
              <DeploymentRecordCard key={record.organization} record={record} index={index} content={content} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className='bg-secondary' aria-labelledby='deployment-method'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.76fr_1.24fr] lg:gap-16'>
            <SectionHeader
              id='deployment-method'
              align='left'
              eyebrow={content.methodEyebrow}
              title={content.methodTitle}
              lede={content.methodIntro}
            />
            <ol className='grid gap-4 sm:grid-cols-2'>
              {content.methodRules.map((rule, index) => (
                <li key={rule} className='rounded-card border border-border bg-background p-6 shadow-sm'>
                  <span className='font-mono text-sm text-primary'>{String(index + 1).padStart(2, '0')}</span>
                  <p className='mt-4 leading-7 text-muted-foreground'>{rule}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className='grid overflow-hidden rounded-card bg-surface-dark text-surface-dark-foreground shadow-panel lg:grid-cols-[0.38fr_1fr]'>
            <div className='flex min-h-48 items-end bg-primary p-8 text-surface-dark sm:p-10'>
              <p className='font-mono text-xs uppercase tracking-[0.16em]'>{content.relatedLabel}</p>
            </div>
            <div className='p-8 sm:p-10'>
              <h2 className='max-w-3xl text-3xl sm:text-4xl'>{content.relatedTitle}</h2>
              <p className='mt-4 max-w-2xl leading-7 text-surface-dark-foreground/65'>{content.relatedText}</p>
              <Link
                href='/compare/online-voting-software'
                variant='inlineIcon'
                className='mt-6 font-semibold text-primary hover:text-primary/80'
              >
                {content.relatedLink}
                <ArrowRightIcon className='size-4' aria-hidden='true' />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
