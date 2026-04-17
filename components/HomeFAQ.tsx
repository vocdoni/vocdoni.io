import { useTranslation } from 'react-i18next'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'

const faqKeys = [
  'legal',
  'anonymity',
  'setup',
  'free',
  'switch',
  'dispute',
  'gdpr',
  'techsavvy',
  'voters_app',
  'vote_types',
  'hybrid',
  'census',
  'open_source',
  'tamper_proof',
  'coercion',
  'accessibility',
]

export default function HomeFAQ() {
  const { t } = useTranslation()

  return (
    <section className='bg-muted/35 py-20 sm:py-24'>
      <Container className='max-w-4xl'>
        <div className='mx-auto max-w-3xl text-center mb-12 sm:mb-16'>
          <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary/80'>
            {t('faq.eyebrow', 'FAQ')}
          </p>
          <h2 className='mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
            {t('faq.title', 'Common questions')}
          </h2>
        </div>

        <Accordion
          type='single'
          collapsible
          className='rounded-3xl border border-border/70 bg-background px-6 shadow-sm sm:px-8'
        >
          {faqKeys.map((key) => (
            <AccordionItem key={key} value={key} className='border-b-border/60 last:border-0'>
              <AccordionTrigger className='py-5 text-left text-base font-medium sm:text-lg hover:no-underline'>
                {t(`faq.items.${key}.question`)}
              </AccordionTrigger>
              <AccordionContent className='pb-6 text-base leading-7 text-muted-foreground'>
                {t(`faq.items.${key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='mt-20 text-center bg-background p-10 rounded-3xl border border-border/70 shadow-sm'>
          <h3 className='text-2xl font-bold mb-4'>{t('faq.cta_title', 'Ready to see it for yourself?')}</h3>
          <Button asChild size='lg' className='rounded-full px-8 h-12 text-base'>
            <a href='https://app.vocdoni.io' target='_blank' rel='noreferrer'>
              {t('faq.cta_button', 'Start your first vote free')}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
