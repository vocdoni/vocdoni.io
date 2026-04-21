import { ensureLeadingSlash, getLocalizedPath } from '@/lib/localized-path'
import { cn } from '@/lib/utils'
import { Locale } from '@/locales'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

const linkVariants = cva('transition-colors', {
  variants: {
    variant: {
      default: 'text-foreground hover:text-primary underline-offset-4 hover:underline',
      navbarItem:
        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
      navbarMobile: 'text-sm text-muted-foreground hover:text-foreground py-2 block',
      navbarStatic: 'text-sm font-medium hover:text-primary transition-colors py-2 border-b border-border/40 block',
      footerNav: 'text-sm text-muted-foreground hover:text-foreground transition-colors',
      footerLegal: 'text-muted-foreground hover:text-foreground transition-colors',
      heroBadge:
        'inline-flex items-center gap-2 sm:gap-3 p-1 rounded-3xl border border-border/40 bg-muted/20 text-xs transition-all hover:bg-muted/30 group cursor-pointer max-w-full shadow-sm',
      inlineIcon: 'inline-flex items-center gap-2',
      dropdownItem:
        'relative flex w-full items-center justify-between px-3 py-2 rounded-md transition-all cursor-pointer',
      card: 'block h-full overflow-hidden rounded-md',
      unstyled: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
  href: string
  locale?: Locale
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, locale, className, variant, ...props }, ref) => {
    const { t } = useTranslation()
    const pageContext = usePageContext()
    locale = locale || (pageContext.locale as Locale) || 'en'

    const isExternal =
      href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')

    const fullHref = isExternal ? href : getLocalizedPath(href, locale)

    const urlLogical = (pageContext as any).urlLogical || '/'
    const normalizedLogical = ensureLeadingSlash(urlLogical)

    const isActive = !isExternal && (href === '/' ? normalizedLogical === '/' : normalizedLogical.startsWith(href))

    const externalProps = isExternal
      ? {
          target: props.target ?? '_blank',
          rel: props.rel ?? 'noopener noreferrer',
        }
      : {}

    const opensInNewTab = (externalProps.target ?? props.target) === '_blank'

    return (
      <a
        ref={ref}
        href={fullHref}
        className={cn(linkVariants({ variant }), className, isActive ? 'font-semibold' : '')}
        {...externalProps}
        {...props}
      >
        {children}
        {opensInNewTab && <span className='sr-only'> {t('link.opens_in_new_tab', '(opens in new tab)')}</span>}
      </a>
    )
  }
)

Link.displayName = 'Link'
