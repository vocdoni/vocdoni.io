import { isValidElement, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type VerticalMediaAsset = { src: string; alt: string; width?: number; height?: number }

/**
 * What a media slot can hold: a real screenshot, or a rendered product mockup
 * (see `components/solutions/mockups/`). Either fills the same reserved space.
 */
export type VerticalMediaSlot = VerticalMediaAsset | ReactNode

interface VerticalMediaProps {
  /** Omitted until the real screenshot exists; the slot still holds its space. */
  asset?: VerticalMediaAsset
  /** A drawn screen, used instead of `asset`. It must enforce its own aspect ratio. */
  children?: ReactNode
  /** Figure caption, and the alt text when no explicit alt is supplied. */
  caption?: string
  /** Reserved shape, so the layout is identical before and after the asset lands. */
  ratio?: 'wide' | 'portrait'
  className?: string
}

const RATIO_CLASS = {
  wide: 'aspect-[16/10]',
  portrait: 'aspect-[9/16]',
} as const

const isAsset = (slot: VerticalMediaSlot): slot is VerticalMediaAsset =>
  typeof slot === 'object' && slot !== null && !isValidElement(slot) && 'src' in slot

/** Splits a slot value into the two props `VerticalMedia` understands. */
export const splitMediaSlot = (slot?: VerticalMediaSlot) =>
  isAsset(slot) ? { asset: slot, node: undefined } : { asset: undefined, node: slot as ReactNode | undefined }

/**
 * A product visual with its space reserved up front.
 *
 * The page is laid out as though every screenshot already exists: until one is
 * passed, the slot renders as a quiet panel rather than collapsing, so dropping
 * the real asset in later changes nothing about the surrounding layout. A
 * mockup passed as children takes the same place as the image would.
 */
export function VerticalMedia({ asset, children, caption, ratio = 'wide', className }: VerticalMediaProps) {
  const filled = Boolean(asset || children)
  return (
    <figure className={cn('flex flex-col gap-3', className)}>
      {asset ? (
        <img
          src={asset.src}
          alt={asset.alt || caption}
          width={asset.width}
          height={asset.height}
          className={cn('image-outline rounded-card w-full object-cover', RATIO_CLASS[ratio])}
          loading='lazy'
          decoding='async'
        />
      ) : children ? (
        children
      ) : (
        <div
          className={cn('bg-muted/40 rounded-card border-border/70 w-full border', RATIO_CLASS[ratio])}
          aria-hidden='true'
        />
      )}
      {/* No caption until there is something to caption. */}
      {filled && caption && <figcaption className='text-muted-foreground text-sm'>{caption}</figcaption>}
    </figure>
  )
}

export default VerticalMedia
