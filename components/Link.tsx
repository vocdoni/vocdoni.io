import { cn } from '@/lib/utils'
import { localeDefault } from '@/locales'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { usePageContext } from 'vike-react/usePageContext'

const linkVariants = cva('transition-colors', {
  variants: {
    variant: {
      default: 'text-foreground hover:text-primary underline-offset-4 hover:underline',
      nav: 'text-gray-700 hover:text-gray-900 font-medium capitalize',
      hero: 'inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-md font-medium text-lg bg-white text-black hover:bg-gray-100 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      text: 'hover:decoration-solid hover:underline underline-offset-4',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      xl: 'h-14 rounded-md px-8 py-4',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
  href: string
  children?: React.ReactNode
  locale?: string
}

export function Link({ href, locale, children, className, variant, size, ...props }: LinkProps) {
  const pageContext = usePageContext()
  locale = locale || pageContext.locale

  // Auto-detect external URLs (starting with http:// or https://)
  const isExternal = href.startsWith('http://') || href.startsWith('https://')

  // Build the full href with locale prefix if not default locale and not external
  let fullHref = href
  if (!isExternal && locale !== localeDefault) {
    fullHref = `/${locale}${href}`
  }

  // Check if link is active based on urlLogical (without locale)
  const { urlLogical } = pageContext as any
  const isActive = !isExternal && (href === '/' ? urlLogical === href : urlLogical?.startsWith(href))

  // Set target and rel for external links (unless explicitly overridden)
  const externalProps = isExternal
    ? {
        target: props.target ?? '_blank',
        rel: props.rel ?? 'noopener noreferrer',
      }
    : {}

  return (
    <a
      href={fullHref}
      className={cn(
        linkVariants({ variant, size }),
        isActive && variant === 'nav' && 'text-gray-900 font-semibold',
        isActive && variant === 'default' && 'text-primary font-medium',
        className
      )}
      {...externalProps}
      {...props}
    >
      {children}
      {isExternal && variant === 'text' && ' ↗'}
    </a>
  )
}
