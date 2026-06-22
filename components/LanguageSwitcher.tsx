import { Link } from '@/components/Link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { setLocalePreference } from '@/lib/localeDetection'
import { getLocalizedPath, stripLocaleFromPath } from '@/lib/localized-path'
import { availableLocales, Locale } from '@/locales'
import { Check, Globe } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

type LanguageSwitcherPageContext = {
  urlLogical?: string
}

function buildHref(target: Locale, urlLogical?: string) {
  const pathname = stripLocaleFromPath(urlLogical ?? '/')
  const suffix = typeof window !== 'undefined' ? `${window.location.search ?? ''}${window.location.hash ?? ''}` : ''
  return `${getLocalizedPath(pathname, target)}${suffix}`
}

function isPlainLeftClick(event: React.MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey
}

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const pageContext = usePageContext() as LanguageSwitcherPageContext
  const current = i18n.language.split('-')[0] as Locale

  const currentPath = pageContext?.urlLogical || '/'
  const currentOption = availableLocales.find((l) => l.value === current) || availableLocales[0]

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className='press-scale inline-flex h-10 w-[72px] items-center justify-center gap-1.5 rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,background-color,scale] hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
          <Globe className='h-4 w-4 flex-shrink-0' />
          <span className='w-5 text-center uppercase'>{currentOption.value}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='min-w-[140px] p-1.5'>
        {availableLocales.map((lang) => {
          const href = buildHref(lang.value, currentPath)
          const isActive = lang.value === current
          const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
            setLocalePreference(lang.value)

            if (isActive && !event.defaultPrevented && isPlainLeftClick(event)) {
              event.preventDefault()
              event.stopPropagation()
              return
            }
          }

          return (
            <DropdownMenuItem key={lang.value} asChild>
              <Link
                href={href}
                locale={lang.value}
                keep-scroll-position='true'
                onClick={handleClick}
                variant='dropdownItem'
                className={`${
                  isActive
                    ? 'bg-primary/10 text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>{lang.label}</span>
                {isActive && <Check className='h-3.5 w-3.5 ml-2 text-primary flex-shrink-0' />}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcher
