import { TagIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Link } from '@/components/Link'
import { cn } from '@/lib/utils'

/** The pricing page, with the calculator: the one place prices live. */
export const PRICING_HREF = '/pricing'

type PricingLinkProps = {
  /** Analytics id, so each placement can be told apart. */
  ctaId: string
  /** Overrides the default "See pricing". */
  label?: string
  /** Defaults to the pricing page. */
  href?: string
  className?: string
}

/**
 * The one look for every pointer to the pricing: a quiet text link with a price-tag icon, so it sits
 * beside a page's own buttons without competing with them.
 */
export function PricingLink({ ctaId, label, href = PRICING_HREF, className }: PricingLinkProps) {
  const { t } = useTranslation()

  return (
    <Link
      href={href}
      variant='unstyled'
      ctaId={ctaId}
      className={cn(
        'inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
    >
      <TagIcon className='size-4' aria-hidden />
      {label ?? t('pricing.links.see_pricing', 'See pricing')}
    </Link>
  )
}

/** A one-line nudge to the pricing page, for the end of pages that are not about pricing. */
export function PricingCallout({ ctaId, className }: { ctaId: string; className?: string }) {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-card border border-border/60 bg-muted/40 p-5 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <p className='text-sm text-muted-foreground'>
        {t('pricing.links.callout', 'Planning a vote? Work out what it costs in a minute.')}
      </p>
      <PricingLink ctaId={ctaId} className='-mx-2 shrink-0 text-foreground' />
    </div>
  )
}
