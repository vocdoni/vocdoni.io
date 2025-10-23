import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const legalPageContainerVariants = cva('mx-auto px-4 pb-12 md:pb-16 lg:pb-20', {
  variants: {
    width: {
      default: 'max-w-4xl',
      wide: 'max-w-6xl',
      narrow: 'max-w-3xl',
    },
  },
  defaultVariants: {
    width: 'default',
  },
})

export interface LegalPageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof legalPageContainerVariants> {}

export function LegalPageContainer({ className, width, ...props }: LegalPageContainerProps) {
  return <div className={cn(legalPageContainerVariants({ width, className }))} {...props} />
}

export function LegalHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-8 pb-6 border-b border-border', className)} {...props} />
}

export function LegalTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn('text-3xl md:text-4xl lg:text-5xl font-bold mb-4', className)} {...props} />
}

export function LegalCompanyInfo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-sm md:text-base text-muted-foreground space-y-1', className)} {...props} />
}

export function LegalSection({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn('mb-10 md:mb-12', className)} {...props} />
}

export function LegalSectionTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-2xl md:text-3xl font-semibold mb-4 mt-8', className)} {...props} />
}

export function LegalSubsection({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-6', className)} {...props} />
}

export function LegalSubsectionTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-xl md:text-2xl font-medium mb-3', className)} {...props} />
}

export function LegalParagraph({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-base leading-relaxed mb-4 text-foreground/90', className)} {...props} />
}

const legalListVariants = cva('mb-4 space-y-2 text-foreground/90', {
  variants: {
    variant: {
      bulleted: 'list-disc',
      numbered: 'list-decimal',
      none: 'list-none',
    },
    indent: {
      default: 'ml-6',
      large: 'ml-8',
      none: 'ml-0',
    },
  },
  defaultVariants: {
    variant: 'bulleted',
    indent: 'default',
  },
})

export interface LegalListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement>,
    VariantProps<typeof legalListVariants> {
  ordered?: boolean
}

export function LegalList({ className, variant, indent, ordered = false, ...props }: LegalListProps) {
  const Component = ordered ? 'ol' : 'ul'
  return (
    <Component
      className={cn(legalListVariants({ variant: ordered ? 'numbered' : variant, indent, className }))}
      {...props}
    />
  )
}

export function LegalListItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn('leading-relaxed', className)} {...props} />
}

export function LegalLink({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn('text-primary underline hover:text-primary/80 transition-colors', className)}
      target='_blank'
      rel='noopener noreferrer'
      {...props}
    />
  )
}

export function LegalDivider({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('my-8 border-border', className)} {...props} />
}

export function LegalLastUpdated({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-sm text-muted-foreground italic mt-8', className)} {...props} />
}
