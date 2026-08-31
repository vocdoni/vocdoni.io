import { cn } from '@/lib/utils'

export type VerticalMediaAsset = { src: string; alt: string; width?: number; height?: number }

interface VerticalMediaProps {
  /** Omitted until the real screenshot exists; the slot still holds its space. */
  asset?: VerticalMediaAsset
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

/**
 * A product visual with its space reserved up front.
 *
 * The page is laid out as though every screenshot already exists: until one is
 * passed, the slot renders as a quiet panel rather than collapsing, so dropping
 * the real asset in later changes nothing about the surrounding layout.
 */
export function VerticalMedia({ asset, caption, ratio = 'wide', className }: VerticalMediaProps) {
  return (
    <figure className={cn('flex flex-col gap-3', className)}>
      {asset ? (
        <>
          <img
            src={asset.src}
            alt={asset.alt || caption}
            width={asset.width}
            height={asset.height}
            className={cn('image-outline rounded-card w-full object-cover', RATIO_CLASS[ratio])}
            loading='lazy'
            decoding='async'
          />
          {caption && <figcaption className='text-muted-foreground text-sm'>{caption}</figcaption>}
        </>
      ) : (
        // No caption until there is something to caption.
        <div
          className={cn('bg-muted/40 rounded-card border-border/70 w-full border', RATIO_CLASS[ratio])}
          aria-hidden='true'
        />
      )}
    </figure>
  )
}

export default VerticalMedia
