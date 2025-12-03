import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { setLocalePreference } from '@/lib/localeDetection'
import { SECTIONS_CONFIG, useUrlSync } from '@/lib/useUrlSync'
import { availableLocales, Locale, localeDefault } from '@/locales'
import { LuChevronDown } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

type LanguageSwitcherPageContext = {
  urlLogical?: string
}

function buildHref(target: Locale, urlLogical?: string) {
  const pathname = urlLogical ?? '/'
  let suffix = ''
  if (typeof window !== 'undefined') {
    suffix = `${window.location.search ?? ''}${window.location.hash ?? ''}`
  }

  // For default locale, use the path without locale prefix
  // For other locales, prepend the locale
  if (target === localeDefault) {
    return `${pathname}${suffix}`
  }

  return `/${target}${pathname}${suffix}`
}

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const pageContext = usePageContext() as LanguageSwitcherPageContext
  const current = i18n.language.split('-')[0] as Locale
  const { getCurrentSection } = useUrlSync()

  // Get the current path: use section path for landing page sections,
  // fall back to actual URL for standalone pages like /terms
  const getCurrentPath = () => {
    const urlLogical = pageContext?.urlLogical || '/'
    const currentSection = getCurrentSection()?.path || '/'

    // Check if current URL is in SECTIONS_CONFIG (i.e., we're on landing page)
    const isLandingSection = SECTIONS_CONFIG.some((section) => section.path === urlLogical)

    // If on landing page, use section from useUrlSync (updates with scroll)
    // Otherwise, use actual URL path (for standalone pages)
    return isLandingSection ? currentSection : urlLogical
  }

  const currentPath = getCurrentPath()
  const currentLabel = availableLocales.find((l) => l.value === current)?.label ?? current.toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='transparent'
          className='group gap-2 data-[state=open]:bg-white px-2 py-1 h-auto [&_svg]:size-4'
        >
          <span className='hidden sm:inline'>{currentLabel}</span>
          <span className='sm:hidden uppercase'>{current}</span>
          <LuChevronDown className='h-4 w-4 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='min-w-max p-0'>
        {availableLocales
          .filter((l) => l.value !== current)
          .map(({ value, label }) => {
            const href = buildHref(value, currentPath)
            return (
              <DropdownMenuItem key={value} asChild className='px-3 py-2'>
                <a
                  href={href}
                  className='flex w-full items-center justify-between'
                  onClick={() => setLocalePreference(value)}
                >
                  <span>{label}</span>
                </a>
              </DropdownMenuItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcher
