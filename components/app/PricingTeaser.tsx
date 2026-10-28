import { ArrowRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { PRICING_HREF } from '@/components/app/pricing/PricingLink'
import { Button } from '@/components/ui/button'

/** A short pointer from the Vocdoni App landing to the pricing page, where the calculator lives. */
export default function PricingTeaser() {
  const { t } = useTranslation()

  return (
    <section className='border-y border-border/60 bg-muted/25 py-16 sm:py-20'>
      <Container>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-balance text-3xl sm:text-4xl'>
            {t('app_landing.pricing_teaser.title', 'Free for up to 25 people.')}
          </h2>
          <p className='mt-4 text-lg leading-8 text-muted-foreground'>
            {t('app_landing.pricing_teaser.body', 'Above that, one price per vote that you see before you start.')}
          </p>
          <div className='mt-8 flex justify-center'>
            <Button asChild size='lg' className='has-[>svg]:px-6'>
              <Link href={PRICING_HREF} variant='inlineIcon' ctaId='app_pricing_teaser'>
                {t('app_landing.pricing_teaser.cta', 'Work out your price')}
                <ArrowRightIcon />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
