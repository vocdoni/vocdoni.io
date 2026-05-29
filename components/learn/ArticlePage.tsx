import { ArrowLeftIcon, ArrowRightIcon, LightbulbIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import CTASection from '@/components/shadcn-studio/blocks/cta-section-09/cta-section-09'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MotionPreset } from '@/components/ui/motion-preset'

export type ArticleSection = { heading: string; paragraphs: string[] }
export type ArticleFaqItem = { question: string; answer: string }

export interface ArticleContent {
  eyebrow: string
  title: string
  intro: string
  sections: ArticleSection[]
  takeaways_title: string
  takeaways: string[]
  faq_title: string
  faq: ArticleFaqItem[]
  cta_title: string
  cta_text: string
  cta_label: string
}

export interface ArticlePageProps {
  content: ArticleContent
  ctaHref?: string
}

const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : [])

export function ArticlePage({ content, ctaHref = '/solutions' }: ArticlePageProps) {
  const { t } = useTranslation()
  const sections = asArray<ArticleSection>(content.sections)
  const takeaways = asArray<string>(content.takeaways)
  const faq = asArray<ArticleFaqItem>(content.faq)

  return (
    <>
      {/* Hero */}
      <section className='pt-6 pb-10 sm:pt-10 lg:pt-12'>
        <Container className='max-w-3xl'>
          <MotionPreset
            component='p'
            className='text-primary mb-4 text-sm font-medium uppercase tracking-wide'
            fade
            blur
            slide
            transition={{ duration: 0.5 }}
          >
            {content.eyebrow}
          </MotionPreset>
          <MotionPreset
            component='h1'
            className='mb-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl'
            fade
            blur
            slide
            delay={0.15}
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
            delay={0.3}
            transition={{ duration: 0.5 }}
          >
            {content.intro}
          </MotionPreset>
        </Container>
      </section>

      {/* Body */}
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

          {/* Key takeaways */}
          {takeaways.length > 0 && (
            <Card className='bg-muted/40 mt-12'>
              <CardContent className='p-6 sm:p-8'>
                <div className='mb-4 flex items-center gap-2'>
                  <LightbulbIcon className='text-primary size-5' aria-hidden='true' />
                  <h2 className='text-lg font-semibold'>{content.takeaways_title}</h2>
                </div>
                <ul className='space-y-2'>
                  {takeaways.map((item, index) => (
                    <li key={index} className='text-muted-foreground flex items-start gap-2 text-sm sm:text-base'>
                      <span className='text-primary mt-0.5' aria-hidden='true'>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </Container>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className='py-12'>
          <Container className='max-w-3xl'>
            <h2 className='mb-8 text-2xl font-semibold tracking-tight sm:text-3xl'>{content.faq_title}</h2>
            <Accordion type='single' collapsible className='bg-background rounded-3xl border px-6 shadow-sm sm:px-8'>
              {faq.map((item, index) => (
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
      )}

      {/* Closing callout + back to hub */}
      <section className='pb-16'>
        <Container className='max-w-3xl'>
          <Card className='border-primary/20 bg-primary/5'>
            <CardContent className='flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8'>
              <div>
                <h2 className='mb-1 text-lg font-semibold'>{content.cta_title}</h2>
                <p className='text-muted-foreground text-sm'>{content.cta_text}</p>
              </div>
              <Button asChild className='shrink-0'>
                <Link href={ctaHref} variant='inlineIcon'>
                  {content.cta_label}
                  <ArrowRightIcon className='size-4' />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className='mt-8'>
            <Link href='/learn' variant='inlineIcon' className='text-muted-foreground hover:text-foreground text-sm'>
              <ArrowLeftIcon className='size-4' />
              {t('learn_index.back_to_hub', 'Back to all guides')}
            </Link>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}

export default ArticlePage
