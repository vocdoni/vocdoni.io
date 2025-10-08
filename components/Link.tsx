import { cn } from '@/lib/utils'
import { localeDefault } from '@/locales'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { usePageContext } from 'vike-react/usePageContext'

const linkVariants = cva('transition-colors', {
  variants: {
    variant: {
      default: 'text-foreground hover:text-primary underline-offset-4 hover:underline',
      nav: 'text-gray-700 hover:text-gray-900 font-medium',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
  href: string
  children: React.ReactNode
  locale?: string
}

export function Link({ href, locale, children, className, variant, ...props }: LinkProps) {
  const pageContext = usePageContext()
  locale = locale || pageContext.locale
  if (locale !== localeDefault) {
    href = '/' + locale + href
  }
  const { urlPathname } = pageContext
  const isActive = href === '/' ? urlPathname === href : urlPathname.startsWith(href)

  return (
    <a
      href={href}
      className={cn(
        linkVariants({ variant }),
        isActive && variant === 'nav' && 'text-gray-900 font-semibold',
        isActive && variant === 'default' && 'text-primary font-medium',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
