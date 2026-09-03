import {
  ArrowRightIcon,
  CheckCircle2Icon,
  EyeIcon,
  FileCheckIcon,
  type LucideIcon,
  ScaleIcon,
  ShieldCheckIcon,
} from 'lucide-react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

export type SolutionFeature = { title: string; description: string }
export type SolutionFaqItem = { question: string; answer: string }
export type SolutionLogo = { src: string; alt: string }
export type SolutionDecisionItem = {
  title: string
  answer: string
  link_label?: string
  link_href?: string
}

export interface SolutionContent {
  eyebrow: string
  hero: { title: string; subtitle: string }
  trust_badges: string[]
  cta_primary: string
  cta_secondary: string
  challenge: { title: string; intro: string }
  pains: string[]
  solution: { title: string; intro: string }
  features: SolutionFeature[]
  decision_guide?: {
    title: string
    intro: string
    boundary?: SolutionDecisionItem
    items: SolutionDecisionItem[]
  }
  trust: { title: string; intro: string }
  trust_points: SolutionFeature[]
  proof: {
    title: string
    // Either an attributed quote (quote + author + role) for real named clients,
    // or a non-attributed value statement when we have no published testimonial.
    quote?: string
    author?: string
    role?: string
    statement?: string
    organizations_label: string
    case_study_label?: string
  }
  faq: { title: string; items: SolutionFaqItem[] }
}

export interface SolutionPageProps {
  icon: LucideIcon
  content: SolutionContent
  logos: SolutionLogo[]
  caseStudyHref?: string
}

// Semantic icons for the trust band, cycled by index.
const TRUST_ICONS: LucideIcon[] = [ShieldCheckIcon, EyeIcon, ScaleIcon, FileCheckIcon]

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

export function SolutionPage({ icon: Icon, content, logos, caseStudyHref }: SolutionPageProps) {
  const trustBadges = asArray<string>(content.trust_badges)
  const pains = asArray<string>(content.pains)
  const features = asArray<SolutionFeature>(content.features)
  const decisionItems = asArray<SolutionDecisionItem>(content.decision_guide?.items)
  const trustPoints = asArray<SolutionFeature>(content.trust_points)
  const faqItems = asArray<SolutionFaqItem>(content.faq?.items)

  return (
    <>
      {/* Hero */}
      <section className='relative pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24'>
        <Container>
          <div className='mx-auto max-w-4xl text-center'>
            <MotionPreset
              component='p'
              className='text-primary mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide'
              fade
              blur
              slide
              transition={{ duration: 0.5 }}
            >
              <Icon className='size-4' aria-hidden='true' />
              {content.eyebrow}
            </MotionPreset>

            <MotionPreset
              component='h1'
              className='mb-6 text-3xl text-balance sm:text-4xl lg:text-5xl'
              fade
              blur
              slide
              delay={0.15}
              transition={{ duration: 0.5 }}
            >
              {content.hero?.title}
            </MotionPreset>

            <MotionPreset
              component='p'
              className='text-muted-foreground mb-8 text-lg sm:text-xl'
              fade
              blur
              slide
              delay={0.3}
              transition={{ duration: 0.5 }}
            >
              {content.hero?.subtitle}
            </MotionPreset>

            <MotionPreset
              className='flex flex-wrap justify-center gap-4'
              fade
              blur
              slide
              delay={0.45}
              transition={{ duration: 0.5 }}
            >
              <Button size='lg' className='has-[>svg]:px-6' asChild>
                <Link href={APP_URL} variant='inlineIcon' ctaId='solution_hero_start'>
                  {content.cta_primary}
                  <ArrowRightIcon className='size-5' />
                </Link>
              </Button>
              <Button size='lg' variant='outline' asChild>
                <Link href='/contact' variant='unstyled'>
                  {content.cta_secondary}
                </Link>
              </Button>
            </MotionPreset>

            {trustBadges.length > 0 && (
              <div className='text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm'>
                {trustBadges.map((badge) => (
                  <span key={badge} className='inline-flex items-center gap-1.5'>
                    <CheckCircle2Icon className='text-primary size-4' aria-hidden='true' />
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Challenge / pains */}
      <section className='bg-muted/50 py-16 sm:py-24'>
        <Container className='max-w-5xl'>
          <div className='mx-auto mb-12 max-w-3xl text-center'>
            <h2 className='text-3xl sm:text-4xl'>{content.challenge?.title}</h2>
            <p className='text-muted-foreground mt-4 text-lg'>{content.challenge?.intro}</p>
          </div>
          <ul className='grid gap-4 sm:grid-cols-2'>
            {pains.map((pain, index) => (
              <li key={index} className='bg-background flex items-start gap-3 rounded-xl border p-5 shadow-sm'>
                <span className='text-primary mt-0.5 shrink-0' aria-hidden='true'>
                  ✓
                </span>
                <span className='text-muted-foreground text-sm sm:text-base'>{pain}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Solution / features */}
      <section className='py-16 sm:py-24'>
        <Container>
          <div className='mx-auto mb-12 max-w-3xl text-center sm:mb-16'>
            <h2 className='text-3xl sm:text-4xl'>{content.solution?.title}</h2>
            <p className='text-muted-foreground mt-4 text-lg'>{content.solution?.intro}</p>
          </div>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature) => (
              <Card key={feature.title} className='h-full transition-shadow duration-300 hover:shadow-lg'>
                <CardContent className='flex flex-col gap-3 p-6'>
                  <div className='bg-primary/10 text-primary inline-flex size-11 items-center justify-center rounded-lg'>
                    <CheckCircle2Icon className='size-5' aria-hidden='true' />
                  </div>
                  <h3 className='text-lg font-semibold'>{feature.title}</h3>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {content.decision_guide && decisionItems.length > 0 && (
            <div className='mt-16 grid gap-10 border-t pt-16 lg:mt-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:pt-20'>
              <div className='lg:sticky lg:top-24 lg:self-start'>
                <h2 className='text-3xl text-balance sm:text-4xl'>{content.decision_guide.title}</h2>
                <p className='text-muted-foreground mt-4 max-w-xl text-lg leading-8'>{content.decision_guide.intro}</p>

                {content.decision_guide.boundary && (
                  <div className='bg-muted/60 mt-8 rounded-2xl border p-6'>
                    <h3 className='font-semibold'>{content.decision_guide.boundary.title}</h3>
                    <p className='text-muted-foreground mt-2 text-sm leading-6'>
                      {content.decision_guide.boundary.answer}
                    </p>
                    {content.decision_guide.boundary.link_href && content.decision_guide.boundary.link_label && (
                      <Link
                        href={content.decision_guide.boundary.link_href}
                        variant='inlineIcon'
                        className='mt-4 text-sm font-medium'
                      >
                        {content.decision_guide.boundary.link_label}
                        <ArrowRightIcon className='size-4' />
                      </Link>
                    )}
                  </div>
                )}
              </div>

              <ol className='divide-border border-border divide-y border-y'>
                {decisionItems.map((item) => (
                  <li key={item.title} className='py-6 first:pt-0 last:pb-0 sm:py-8'>
                    <h3 className='text-lg font-semibold sm:text-xl'>{item.title}</h3>
                    <p className='text-muted-foreground mt-2 max-w-2xl leading-7'>{item.answer}</p>
                    {item.link_href && item.link_label && (
                      <Link href={item.link_href} variant='inlineIcon' className='mt-3 text-sm font-medium'>
                        {item.link_label}
                        <ArrowRightIcon className='size-4' />
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Container>
      </section>

      {/* Trust band: security / legal / GDPR / verifiability */}
      <section className='bg-muted/50 py-16 sm:py-24'>
        <Container className='max-w-5xl'>
          <div className='mx-auto mb-12 max-w-3xl text-center'>
            <h2 className='text-3xl sm:text-4xl'>{content.trust?.title}</h2>
            <p className='text-muted-foreground mt-4 text-lg'>{content.trust?.intro}</p>
          </div>
          <div className='grid gap-6 sm:grid-cols-2'>
            {trustPoints.map((point, index) => {
              const TrustIcon = TRUST_ICONS[index % TRUST_ICONS.length]
              return (
                <div key={point.title} className='bg-background flex gap-4 rounded-xl border p-6 shadow-sm'>
                  <div className='bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg'>
                    <TrustIcon className='size-5' aria-hidden='true' />
                  </div>
                  <div>
                    <h3 className='mb-1 font-semibold'>{point.title}</h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>{point.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Social proof */}
      <section className='py-16 sm:py-24'>
        <Container className='max-w-4xl'>
          <div className='mb-10 text-center'>
            <h2 className='text-3xl sm:text-4xl'>{content.proof?.title}</h2>
          </div>
          <Card className='overflow-hidden'>
            <CardContent className='flex flex-col gap-6 p-8 sm:p-12'>
              {content.proof?.quote ? (
                <>
                  <div className='text-5xl leading-none opacity-20' aria-hidden='true'>
                    {'“'}
                  </div>
                  <blockquote className='text-muted-foreground -mt-8 text-lg italic sm:text-xl'>
                    {content.proof.quote}
                  </blockquote>
                  <p className='text-sm font-semibold'>
                    - {content.proof.author}, {content.proof.role}
                  </p>
                </>
              ) : (
                <p className='text-muted-foreground text-lg sm:text-xl'>{content.proof?.statement}</p>
              )}
              {logos.length > 0 && (
                <div className='flex flex-col gap-3 border-t pt-6'>
                  <p className='text-muted-foreground text-xs'>{content.proof?.organizations_label}</p>
                  <div className='flex flex-wrap items-center gap-5'>
                    {logos.map((logo) => (
                      <img
                        key={logo.alt}
                        src={logo.src}
                        alt={logo.alt}
                        className='h-8 w-auto max-w-[110px] object-contain opacity-80 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0'
                      />
                    ))}
                  </div>
                </div>
              )}
              {caseStudyHref && content.proof?.case_study_label && (
                <Button variant='outline' className='w-full sm:w-auto' asChild>
                  <Link href={caseStudyHref} variant='inlineIcon'>
                    {content.proof.case_study_label}
                    <ArrowRightIcon className='size-4' />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* FAQ */}
      <section className='bg-muted/35 py-16 sm:py-24'>
        <Container className='max-w-4xl'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-3xl text-balance sm:text-4xl'>{content.faq?.title}</h2>
          </div>
          <Accordion
            type='single'
            collapsible
            className='bg-background mt-10 rounded-3xl border px-6 shadow-sm sm:px-8'
          >
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
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
    </>
  )
}

export default SolutionPage
