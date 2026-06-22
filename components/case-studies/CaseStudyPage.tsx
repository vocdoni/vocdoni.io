import { ArrowLeftIcon, ArrowRightIcon, CheckCircle2Icon, ExternalLinkIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

export type CaseStudyStat = { value: string; label: string; description: string }
export type CaseStudySection = { heading: string; paragraphs: string[] }

export interface CaseStudyContent {
  eyebrow: string
  org: string
  title: string
  summary: string
  stats: CaseStudyStat[]
  sections: CaseStudySection[]
  quote: string
  author: string
  role: string
  highlights_title: string
  highlights: string[]
  blog_label: string
  solution_label: string
}

export interface CaseStudyPageProps {
  content: CaseStudyContent
  logo: string
  image?: string
  blogHref?: string
  solutionHref?: string
}

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

export function CaseStudyPage({ content, logo, image, blogHref, solutionHref }: CaseStudyPageProps) {
  const { t } = useTranslation()
  const stats = asArray<CaseStudyStat>(content.stats)
  const sections = asArray<CaseStudySection>(content.sections)
  const highlights = asArray<string>(content.highlights)

  return (
    <>
      {/* Hero */}
      <section className='pt-6 pb-10 sm:pt-10 lg:pt-12'>
        <Container className='max-w-4xl'>
          <div className='mb-6 flex items-center gap-4'>
            <img
              src={logo}
              alt={content.org}
              className='size-14 rounded-full bg-white object-contain p-1 shadow-sm image-outline'
            />
            <div>
              <p className='text-primary text-sm font-medium uppercase tracking-wide'>{content.eyebrow}</p>
              <p className='text-lg font-semibold'>{content.org}</p>
            </div>
          </div>
          <MotionPreset
            component='h1'
            className='mb-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl'
            fade
            blur
            slide
            transition={{ duration: 0.5 }}
          >
            {content.title}
          </MotionPreset>
          <MotionPreset
            component='p'
            className='text-muted-foreground text-lg sm:text-xl'
            fade
            blur
            slide
            delay={0.2}
            transition={{ duration: 0.5 }}
          >
            {content.summary}
          </MotionPreset>
        </Container>
      </section>

      {/* Optional image */}
      {image && (
        <section className='pb-10'>
          <Container className='max-w-4xl'>
            <img
              src={image}
              alt={content.org}
              className='aspect-video w-full rounded-2xl object-cover shadow-sm image-outline'
            />
          </Container>
        </section>
      )}

      {/* Stats */}
      {stats.length > 0 && (
        <section className='pb-10'>
          <Container className='max-w-4xl'>
            <div className='grid grid-cols-1 gap-4 rounded-2xl border bg-muted/40 p-6 sm:grid-cols-3 sm:p-8'>
              {stats.map((stat, index) => (
                <div key={index} className='text-center sm:text-left'>
                  <p className='text-primary text-3xl font-bold tabular-nums'>{stat.value}</p>
                  <p className='mt-1 text-sm font-semibold'>{stat.label}</p>
                  <p className='text-muted-foreground text-xs'>{stat.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Body sections */}
      <section className='pb-8'>
        <Container className='max-w-3xl'>
          <article className='space-y-10'>
            {sections.map((section, index) => (
              <div key={index} className='space-y-4'>
                <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>{section.heading}</h2>
                {asArray<string>(section.paragraphs).map((paragraph, pIndex) => (
                  <p key={pIndex} className='text-muted-foreground text-base leading-8'>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </article>
        </Container>
      </section>

      {/* Quote */}
      {content.quote && (
        <section className='pb-10'>
          <Container className='max-w-3xl'>
            <Card className='bg-muted/40'>
              <CardContent className='p-8'>
                <blockquote className='text-lg italic sm:text-xl'>{`“${content.quote}”`}</blockquote>
                <p className='mt-4 text-sm font-semibold'>
                  - {content.author}, {content.role}
                </p>
              </CardContent>
            </Card>
          </Container>
        </section>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <section className='pb-12'>
          <Container className='max-w-3xl'>
            <h2 className='mb-4 text-xl font-semibold'>{content.highlights_title}</h2>
            <ul className='grid gap-3 sm:grid-cols-2'>
              {highlights.map((item, index) => (
                <li key={index} className='text-muted-foreground flex items-start gap-2 text-sm sm:text-base'>
                  <CheckCircle2Icon className='text-primary mt-0.5 size-5 shrink-0' aria-hidden='true' />
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Links */}
      <section className='pb-16'>
        <Container className='max-w-3xl'>
          <div className='flex flex-wrap gap-4'>
            {blogHref && (
              <Button asChild>
                <Link href={blogHref} variant='inlineIcon'>
                  {content.blog_label}
                  <ExternalLinkIcon className='size-4' />
                </Link>
              </Button>
            )}
            {solutionHref && (
              <Button variant='outline' asChild>
                <Link href={solutionHref} variant='inlineIcon'>
                  {content.solution_label}
                  <ArrowRightIcon className='size-4' />
                </Link>
              </Button>
            )}
          </div>
          <div className='mt-8'>
            <Link
              href='/case-studies'
              variant='inlineIcon'
              className='text-muted-foreground hover:text-foreground text-sm'
            >
              <ArrowLeftIcon className='size-4' />
              {t('case_studies_index.back_to_index', 'Back to all case studies')}
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

export default CaseStudyPage
