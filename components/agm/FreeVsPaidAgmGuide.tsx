import {
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  UserCogIcon,
  UsersIcon,
  VoteIcon,
} from 'lucide-react'

import createVoteImage from '@/assets/images/app/create_vote.webp'
import { Container } from '@/components/Container'
import { Eyebrow } from '@/components/Eyebrow'
import { Link } from '@/components/Link'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AGM_PLAN_SOURCE, agmGuideContent, agmPlans, choiceSteps, paidTriggers } from '@/lib/content/free-vs-paid-agm'

const triggerIcons = [UsersIcon, VoteIcon, UserCogIcon, CheckCircle2Icon]

export function FreeVsPaidAgmGuide() {
  const content = agmGuideContent

  return (
    <>
      <section className='relative overflow-hidden pt-10 pb-18 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28'>
        <div className='bg-primary/8 pointer-events-none absolute top-6 -right-40 size-[34rem] rounded-full blur-3xl' />
        <Container>
          <div className='grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16'>
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
                <Button variant='dark' size='lg' asChild className='mt-8'>
                  <Link
                    href={APP_URL}
                    target='_blank'
                    variant='inlineIcon'
                    ctaId='agm_free_paid_start'
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
            eyebrow={content.plansEyebrow}
            title={content.plansTitle}
            lede={content.plansLede}
            align='left'
            titleClassName='max-w-4xl text-3xl sm:text-4xl lg:text-5xl'
          />

          <p className='text-muted-foreground mt-7 text-sm sm:hidden'>{content.mobileTableHint}</p>
          <div className='bg-background mt-4 overflow-hidden rounded-2xl border shadow-sm sm:mt-10'>
            <Table className='min-w-[760px]'>
              <TableHeader>
                <TableRow className='bg-muted/50 hover:bg-muted/50'>
                  <TableHead className='font-semibold text-foreground'>{content.tableHeaders.plan}</TableHead>
                  <TableHead className='font-semibold text-foreground'>{content.tableHeaders.price}</TableHead>
                  <TableHead className='font-semibold text-foreground'>{content.tableHeaders.members}</TableHead>
                  <TableHead className='font-semibold text-foreground'>{content.tableHeaders.votes}</TableHead>
                  <TableHead className='font-semibold text-foreground'>{content.tableHeaders.admins}</TableHead>
                  <TableHead className='font-semibold text-foreground'>{content.tableHeaders.codes}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agmPlans.map((plan, index) => (
                  <TableRow key={plan.name} className={index === 0 ? 'bg-primary/8 hover:bg-primary/10' : undefined}>
                    <TableCell className='font-semibold'>{plan.name}</TableCell>
                    <TableCell>{plan.price}</TableCell>
                    <TableCell>{plan.members}</TableCell>
                    <TableCell>{plan.votes}</TableCell>
                    <TableCell>{plan.admins}</TableCell>
                    <TableCell>{plan.codes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='mt-6 flex flex-col gap-3 text-sm leading-6 text-muted-foreground sm:flex-row sm:items-start sm:justify-between'>
            <p className='max-w-2xl'>{content.testVoteNote}</p>
            <Link href={AGM_PLAN_SOURCE} target='_blank' variant='inlineIcon' className='shrink-0 font-medium'>
              {content.reviewed}
              <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
            </Link>
          </div>
        </Container>
      </section>

      <section className='py-16 sm:py-24'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16'>
            <div className='lg:sticky lg:top-32 lg:self-start'>
              <Eyebrow>{content.upgradeEyebrow}</Eyebrow>
              <h2 className='mt-5 text-4xl text-balance sm:text-5xl'>{content.upgradeTitle}</h2>
              <p className='text-muted-foreground mt-5 max-w-[46ch] text-lg leading-8 text-pretty'>
                {content.upgradeLede}
              </p>
            </div>

            <div className='overflow-hidden rounded-2xl border'>
              {paidTriggers.map((trigger, index) => {
                const TriggerIcon = triggerIcons[index] || CheckCircle2Icon
                return (
                  <article
                    key={trigger.title}
                    className='bg-background grid gap-5 border-b p-7 last:border-b-0 sm:grid-cols-[auto_1fr] sm:p-9'
                  >
                    <div className='bg-primary/12 flex size-11 items-center justify-center rounded-full'>
                      <TriggerIcon className='text-primary size-5' aria-hidden='true' />
                    </div>
                    <div>
                      <h3 className='text-2xl'>{trigger.title}</h3>
                      <p className='text-muted-foreground mt-3 leading-7 text-pretty'>{trigger.text}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className='pb-16 sm:pb-24'>
        <Container>
          <div className='bg-surface-dark text-surface-dark-foreground grid overflow-hidden rounded-3xl lg:grid-cols-[0.38fr_1fr]'>
            <div className='bg-primary/15 flex min-h-52 items-center justify-center p-10'>
              <BriefcaseBusinessIcon className='text-primary size-20' aria-hidden='true' />
            </div>
            <div className='p-8 sm:p-12 lg:p-14'>
              <p className='font-mono text-xs uppercase tracking-[0.16em] text-[#66DC9D]'>{content.managedEyebrow}</p>
              <h2 className='mt-4 max-w-2xl text-3xl text-balance sm:text-4xl'>{content.managedTitle}</h2>
              <p className='text-surface-dark-foreground/70 mt-5 max-w-[64ch] text-lg leading-8 text-pretty'>
                {content.managedText}
              </p>
              <Link href='/contact' variant='inlineIcon' className='mt-7 font-semibold text-[#66DC9D] hover:text-white'>
                {content.managedCta}
                <ArrowRightIcon className='size-4' aria-hidden='true' />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className='bg-muted/45 border-y py-16 sm:py-22'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16'>
            <div>
              <Eyebrow>{content.chooseEyebrow}</Eyebrow>
              <h2 className='mt-5 text-4xl text-balance sm:text-5xl'>{content.chooseTitle}</h2>
              <p className='text-muted-foreground mt-5 max-w-[46ch] text-lg leading-8 text-pretty'>
                {content.chooseLede}
              </p>
            </div>
            <ol className='overflow-hidden rounded-2xl border bg-border'>
              {choiceSteps.map((step, index) => (
                <li key={step} className='bg-background flex min-h-28 gap-5 border-b p-7 last:border-b-0 sm:p-8'>
                  <span className='text-primary font-mono text-xs tabular-nums'>0{index + 1}</span>
                  <span className='max-w-[56ch] text-lg leading-8'>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className='py-16 sm:py-24'>
        <Container className='max-w-6xl'>
          <SectionHeader
            title={content.relatedTitle}
            lede={content.relatedLede}
            align='left'
            titleClassName='max-w-3xl text-3xl sm:text-4xl lg:text-5xl'
          />
          <div className='mt-10 grid overflow-hidden rounded-2xl border sm:grid-cols-3'>
            <Link
              href='/learn/how-to-run-a-legally-valid-agm-online'
              variant='unstyled'
              className='group bg-background border-b p-7 hover:bg-muted/35 sm:border-r sm:border-b-0 sm:p-8'
            >
              <p className='font-medium'>{content.relatedLinks.validAgm}</p>
              <ArrowRightIcon className='text-primary mt-6 size-5 transition-transform group-hover:translate-x-1' />
            </Link>
            <Link
              href='/solutions/companies-agm'
              variant='unstyled'
              className='group bg-background border-b p-7 hover:bg-muted/35 sm:border-r sm:border-b-0 sm:p-8'
            >
              <p className='font-medium'>{content.relatedLinks.companies}</p>
              <ArrowRightIcon className='text-primary mt-6 size-5 transition-transform group-hover:translate-x-1' />
            </Link>
            <Link
              href='/case-studies/coib'
              variant='unstyled'
              className='group bg-background p-7 hover:bg-muted/35 sm:p-8'
            >
              <p className='font-medium'>{content.relatedLinks.caseStudy}</p>
              <ArrowRightIcon className='text-primary mt-6 size-5 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
