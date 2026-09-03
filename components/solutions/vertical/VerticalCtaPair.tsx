import { ArrowRightIcon } from 'lucide-react'

import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface VerticalCtaPairProps {
  /** Vertical-tagged signup URL. */
  appHref: string
  primaryLabel?: string
  secondaryLabel?: string
  /** Analytics id prefix, e.g. `pro_bodies_hero`. Both links are tracked. */
  ctaId: string
  /** Reassurance line, kept within one line of the button it belongs to. */
  note?: string
  align?: 'center' | 'left'
  /**
   * `pair` gives the app a filled button and the contact link a lighter text
   * link, so the two never compete. `equal` is only correct where the section's
   * job is to make the reader pick a lane.
   */
  weight?: 'pair' | 'equal'
  /** Colour context. `onDark` is for the inverted closing section only. */
  tone?: 'default' | 'onDark'
  className?: string
}

/**
 * The page-wide CTA unit: try the product first, talk to an expert second.
 *
 * Both links carry a `ctaId`. `Link` fires `trackAppCtaClick` for internal hrefs
 * too, and without an id on the contact link the secondary CTA would be
 * invisible in analytics - which is exactly the number needed to tell whether
 * the secondary is cannibalising the primary.
 */
export function VerticalCtaPair({
  appHref,
  primaryLabel,
  secondaryLabel,
  ctaId,
  note,
  align = 'center',
  weight = 'pair',
  tone = 'default',
  className,
}: VerticalCtaPairProps) {
  const centered = align === 'center'

  return (
    <div className={cn('flex flex-col gap-3', centered && 'items-center', className)}>
      <div
        className={cn(
          'flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center',
          centered && 'sm:justify-center'
        )}
      >
        {primaryLabel && (
          <Button size='lg' className='group w-full has-[>svg]:px-6 sm:w-auto' asChild>
            <Link href={appHref} variant='inlineIcon' ctaId={`${ctaId}_app`}>
              {primaryLabel}
              <ArrowRightIcon className='size-5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Link>
          </Button>
        )}
        {secondaryLabel &&
          (weight === 'equal' ? (
            <Button size='lg' variant='outline' className='w-full sm:w-auto' asChild>
              <Link href='/contact' variant='unstyled' ctaId={`${ctaId}_contact`}>
                {secondaryLabel}
              </Link>
            </Button>
          ) : (
            <Link
              href='/contact'
              variant='inlineIcon'
              ctaId={`${ctaId}_contact`}
              className={cn(
                'inline-flex min-h-11 justify-center rounded-md px-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none',
                tone === 'onDark'
                  ? 'text-surface-dark-foreground/70 hover:text-surface-dark-foreground focus-visible:ring-surface-dark-foreground'
                  : 'text-muted-foreground hover:text-foreground focus-visible:ring-ring'
              )}
            >
              {secondaryLabel}
              <ArrowRightIcon className='size-4' aria-hidden='true' />
            </Link>
          ))}
      </div>
      {note && (
        <p
          className={cn(
            'max-w-md text-sm',
            tone === 'onDark' ? 'text-surface-dark-foreground/70' : 'text-muted-foreground',
            centered && 'text-center'
          )}
        >
          {note}
        </p>
      )}
    </div>
  )
}

export default VerticalCtaPair
