import { Container } from '@/components/Container'
import { VerticalCtaPair } from '@/components/solutions/vertical/VerticalCtaPair'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import type { VerticalContent } from '@/components/solutions/vertical/types'

interface VerticalClosingCtaProps {
  closing: VerticalContent['closing']
  pageId: string
  appHref: string
  ctaId: string
}

/** One ask, restated, with the reassurance line kept beside the button. */
export function VerticalClosingCta({ closing, pageId, appHref, ctaId }: VerticalClosingCtaProps) {
  return (
    <VerticalSection sectionId='closing' pageId={pageId} className='bg-surface-dark text-surface-dark-foreground'>
      <Container className='max-w-3xl text-center'>
        <h2 className='text-3xl text-balance sm:text-4xl lg:text-5xl'>{closing?.title}</h2>
        <p className='text-surface-dark-foreground/70 mt-6 text-lg text-pretty'>{closing?.description}</p>
        <VerticalCtaPair
          className='mt-10'
          tone='onDark'
          appHref={appHref}
          primaryLabel={closing?.cta_primary}
          secondaryLabel={closing?.cta_secondary}
          note={closing?.note}
          ctaId={ctaId}
        />
      </Container>
    </VerticalSection>
  )
}

export default VerticalClosingCta
