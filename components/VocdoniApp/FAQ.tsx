import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type FaqItem = {
  question: string
  answer: string
}

export default function FAQ() {
  const { t } = useTranslation()
  const items = (t('app_landing.faq.items', { returnObjects: true }) as FaqItem[]) || []

  return (
    <section className='bg-muted/35 py-20 sm:py-24'>
      <Container className='max-w-4xl'>
        <div className='mx-auto max-w-3xl text-center'>
          <p className='text-sm font-medium uppercase tracking-[0.2em] text-primary/80'>
            {t('app_landing.faq.eyebrow', 'FAQ')}
          </p>
          <h2 className='mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl'>
            {t('app_landing.faq.title', 'Questions buyers ask before they start')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-muted-foreground'>
            {t(
              'app_landing.faq.description',
              'These questions should remove the last doubts around pricing, voter experience, trust, privacy, hosting, and proof.'
            )}
          </p>
        </div>

        <Accordion
          type='single'
          collapsible
          className='mt-12 rounded-3xl border border-border/70 bg-background px-6 shadow-sm sm:px-8'
        >
          {items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className='text-left text-base font-medium sm:text-lg'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className='pb-5 text-base leading-7 text-muted-foreground'>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
