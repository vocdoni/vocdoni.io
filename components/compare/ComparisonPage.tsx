import { ArrowRightIcon, CheckIcon, ExternalLinkIcon, ScaleIcon, ShieldCheckIcon } from 'lucide-react'

import createVoteImage from '@/assets/images/app/create_vote.webp'
import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

type ComparisonRow = {
  criterion: string
  vocdoni: string
  electionbuddy: string
}

type FaqItem = {
  question: string
  answer: string
}

export interface ComparisonContent {
  eyebrow: string
  title: string
  intro: string
  primary_cta: string
  primary_cta_aria: string
  image_alt: string
  image_caption: string
  table_title: string
  table_intro: string
  table_headers: {
    criterion: string
    vocdoni: string
    electionbuddy: string
  }
  rows: ComparisonRow[]
  source_title: string
  source_text: string
  source_pricing: string
  source_features: string
  fit_title: string
  fit_intro: string
  vocdoni_fit_title: string
  vocdoni_fit: string[]
  electionbuddy_fit_title: string
  electionbuddy_fit: string[]
  verification_title: string
  verification_text: string
  related_title: string
  related_intro: string
  related_links: {
    associations: string
    verifiability: string
    anonymity: string
    case_study: string
  }
  faq_title: string
  faq: FaqItem[]
  closing_title: string
  closing_text: string
  closing_link: string
}

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

export function ComparisonPage({ content }: { content: ComparisonContent }) {
  const rows = asArray<ComparisonRow>(content.rows)
  const vocdoniFit = asArray<string>(content.vocdoni_fit)
  const electionBuddyFit = asArray<string>(content.electionbuddy_fit)
  const faq = asArray<FaqItem>(content.faq)

  return (
    <>
      <section className='relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24'>
        <div className='bg-primary/8 pointer-events-none absolute top-16 -right-32 size-96 rounded-full blur-3xl' />
        <Container>
          <div className='grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16'>
            <div className='relative z-10 max-w-2xl'>
              <MotionPreset
                component='p'
                className='text-primary mb-5 text-sm font-semibold uppercase tracking-wide'
                fade
                blur
                slide
                transition={{ duration: 0.5 }}
              >
                {content.eyebrow}
              </MotionPreset>
              <MotionPreset
                component='h1'
                className='max-w-3xl text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-6xl'
                fade
                blur
                slide
                delay={0.1}
                transition={{ duration: 0.5 }}
              >
                {content.title}
              </MotionPreset>
              <MotionPreset
                component='p'
                className='text-muted-foreground mt-6 max-w-[60ch] text-lg leading-8 text-pretty sm:text-xl'
                fade
                blur
                slide
                delay={0.2}
                transition={{ duration: 0.5 }}
              >
                {content.intro}
              </MotionPreset>
              <MotionPreset fade blur slide delay={0.3} transition={{ duration: 0.5 }} className='mt-8'>
                <Button size='lg' asChild>
                  <Link
                    href={APP_URL}
                    ctaId='comparison_vocdoni_vs_electionbuddy_start'
                    variant='inlineIcon'
                    aria-label={content.primary_cta_aria}
                  >
                    {content.primary_cta}
                    <ArrowRightIcon className='size-5' aria-hidden='true' />
                  </Link>
                </Button>
              </MotionPreset>
            </div>

            <MotionPreset fade blur slide delay={0.25} transition={{ duration: 0.6 }} className='relative'>
              <div className='bg-card overflow-hidden rounded-3xl border shadow-xl'>
                <div className='border-b px-5 py-4 sm:px-6'>
                  <div className='flex items-center gap-2 text-sm font-medium'>
                    <span className='bg-primary size-2.5 rounded-full' />
                    <span>{content.image_caption}</span>
                  </div>
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

      <section className='bg-muted/35 border-y py-16 sm:py-20'>
        <Container>
          <div className='mb-10 max-w-3xl'>
            <h2 className='text-3xl text-balance sm:text-4xl'>{content.table_title}</h2>
            <p className='text-muted-foreground mt-4 max-w-[65ch] text-lg leading-8'>{content.table_intro}</p>
          </div>

          <div className='space-y-4 md:hidden'>
            {rows.map((row) => (
              <article key={row.criterion} className='bg-background overflow-hidden rounded-2xl border shadow-sm'>
                <h3 className='border-b px-5 py-4 text-lg font-semibold'>{row.criterion}</h3>
                <div className='bg-primary/8 border-b px-5 py-5'>
                  <p className='mb-2 text-sm font-semibold'>{content.table_headers.vocdoni}</p>
                  <p className='text-muted-foreground leading-7'>{row.vocdoni}</p>
                </div>
                <div className='px-5 py-5'>
                  <p className='mb-2 text-sm font-semibold'>{content.table_headers.electionbuddy}</p>
                  <p className='text-muted-foreground leading-7'>{row.electionbuddy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className='bg-background hidden overflow-hidden rounded-3xl border shadow-sm md:block'>
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[760px] border-collapse text-left'>
                <thead>
                  <tr className='border-b'>
                    <th className='text-muted-foreground w-1/4 px-6 py-5 text-sm font-medium'>
                      {content.table_headers.criterion}
                    </th>
                    <th className='bg-primary/8 w-3/8 px-6 py-5 text-lg font-semibold'>
                      {content.table_headers.vocdoni}
                    </th>
                    <th className='w-3/8 px-6 py-5 text-lg font-semibold'>{content.table_headers.electionbuddy}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.criterion} className='border-b last:border-b-0'>
                      <th scope='row' className='px-6 py-6 align-top text-sm font-semibold'>
                        {row.criterion}
                      </th>
                      <td className='bg-primary/8 px-6 py-6 align-top'>
                        <p className='text-muted-foreground max-w-[42ch] leading-7'>{row.vocdoni}</p>
                      </td>
                      <td className='px-6 py-6 align-top'>
                        <p className='text-muted-foreground max-w-[42ch] leading-7'>{row.electionbuddy}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Card className='mt-6 max-w-4xl border-dashed bg-transparent shadow-none'>
            <CardContent className='p-5 sm:p-6'>
              <div className='flex items-start gap-3'>
                <ScaleIcon className='text-primary mt-0.5 size-5 shrink-0' aria-hidden='true' />
                <div>
                  <h3 className='font-semibold'>{content.source_title}</h3>
                  <p className='text-muted-foreground mt-1 leading-7'>{content.source_text}</p>
                  <div className='mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm'>
                    <Link href='https://electionbuddy.com/pricing/' variant='inlineIcon'>
                      {content.source_pricing}
                      <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
                    </Link>
                    <Link href='https://electionbuddy.com/features/online-voting/' variant='inlineIcon'>
                      {content.source_features}
                      <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      <section className='py-16 sm:py-24'>
        <Container>
          <div className='mb-10 max-w-3xl'>
            <h2 className='text-3xl text-balance sm:text-4xl'>{content.fit_title}</h2>
            <p className='text-muted-foreground mt-4 max-w-[65ch] text-lg leading-8'>{content.fit_intro}</p>
          </div>

          <div className='grid gap-6 lg:grid-cols-[1.15fr_0.85fr]'>
            <Card className='border-primary/25 bg-primary/8 shadow-none'>
              <CardContent className='p-7 sm:p-9'>
                <div className='mb-7 flex items-center gap-3'>
                  <span className='bg-primary/15 flex size-10 items-center justify-center rounded-xl'>
                    <ShieldCheckIcon className='text-primary size-5' aria-hidden='true' />
                  </span>
                  <h3 className='text-2xl'>{content.vocdoni_fit_title}</h3>
                </div>
                <ul className='space-y-4'>
                  {vocdoniFit.map((item) => (
                    <li key={item} className='flex items-start gap-3 leading-7'>
                      <CheckIcon className='text-primary mt-1 size-4 shrink-0' aria-hidden='true' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className='shadow-none'>
              <CardContent className='p-7 sm:p-9'>
                <h3 className='mb-7 text-2xl'>{content.electionbuddy_fit_title}</h3>
                <ul className='space-y-4'>
                  {electionBuddyFit.map((item) => (
                    <li key={item} className='text-muted-foreground flex items-start gap-3 leading-7'>
                      <CheckIcon className='mt-1 size-4 shrink-0' aria-hidden='true' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className='pb-16 sm:pb-24'>
        <Container>
          <div className='bg-foreground text-background grid gap-8 overflow-hidden rounded-3xl px-7 py-10 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-14 lg:py-14'>
            <ShieldCheckIcon className='text-primary size-12' aria-hidden='true' />
            <div>
              <h2 className='text-3xl text-balance sm:text-4xl'>{content.verification_title}</h2>
              <p className='text-background/75 mt-5 max-w-[65ch] text-lg leading-8'>{content.verification_text}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className='bg-muted/35 border-y py-16'>
        <Container className='max-w-5xl'>
          <div className='mb-8 max-w-3xl'>
            <h2 className='text-3xl text-balance'>{content.related_title}</h2>
            <p className='text-muted-foreground mt-3 leading-7'>{content.related_intro}</p>
          </div>
          <div className='grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2'>
            {[
              { href: '/solutions/associations', label: content.related_links.associations },
              { href: '/learn/verifiable-voting-explained', label: content.related_links.verifiability },
              { href: '/learn/anonymous-voting-explained', label: content.related_links.anonymity },
              { href: '/case-studies/omnium-cultural', label: content.related_links.case_study },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                variant='unstyled'
                className='group bg-background hover:bg-muted flex min-h-24 items-center justify-between gap-4 p-6 font-medium'
              >
                {item.label}
                <ArrowRightIcon className='text-primary size-4 shrink-0 transition-transform group-hover:translate-x-1' />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className='py-16 sm:py-20'>
        <Container className='max-w-4xl'>
          <h2 className='mb-8 text-3xl text-balance sm:text-4xl'>{content.faq_title}</h2>
          <Accordion type='single' collapsible className='rounded-3xl border px-6 shadow-sm sm:px-8'>
            {faq.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className='text-left text-base font-medium sm:text-lg'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className='text-muted-foreground pb-5 text-base leading-7'>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </section>

      <section className='pb-20'>
        <Container className='max-w-4xl'>
          <div className='border-primary/20 bg-primary/8 rounded-3xl border p-7 sm:p-10'>
            <h2 className='text-2xl sm:text-3xl'>{content.closing_title}</h2>
            <p className='text-muted-foreground mt-3 max-w-[60ch] leading-7'>{content.closing_text}</p>
            <Link href='/app' variant='inlineIcon' className='mt-6 font-semibold'>
              {content.closing_link}
              <ArrowRightIcon className='size-4' />
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
