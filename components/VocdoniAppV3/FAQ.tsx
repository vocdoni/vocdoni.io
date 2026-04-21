import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQV3() {
  const { t } = useTranslation()
  const faqs = [
    {
      question: t('vocdoni_app.faq.items.sensitive.question'),
      answer: t('vocdoni_app.faq.items.sensitive.answer'),
    },
    {
      question: t('vocdoni_app.faq.items.tradition.question'),
      answer: t('vocdoni_app.faq.items.tradition.answer'),
    },
    {
      question: t('vocdoni_app.faq.items.price.question'),
      answer: t('vocdoni_app.faq.items.price.answer'),
    },
  ]

  return (
    <section className='py-20 bg-background'>
      <Container className='max-w-3xl'>
        <div className='mb-12 flex flex-col items-center text-center'>
          <h2 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl'>{t('vocdoni_app.faq.title')}</h2>
        </div>

        <Accordion type='single' collapsible className='w-full'>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className='text-left text-lg font-medium'>{faq.question}</AccordionTrigger>
              <AccordionContent className='text-base text-muted-foreground'>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className='mt-16 rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center'>
          <h3 className='mb-4 text-2xl font-bold'>{t('vocdoni_app.cta_bottom.title')}</h3>
          <Button asChild size='lg' className='h-11 rounded-full px-8'>
            <a href='https://app.vocdoni.io' target='_blank' rel='noreferrer'>
              {t('vocdoni_app.cta_bottom.button')}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
