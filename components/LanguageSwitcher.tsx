import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { availableLocales, Locale, localeDefault } from '@/locales'
import { ChevronDown } from 'lucide-react'
import { usePageContext } from 'vike-react/usePageContext'

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
  const pageContext = usePageContext() as any
  const current: Locale = pageContext?.initialLocale ?? pageContext?.locale
  const urlLogical: string | undefined = pageContext?.urlLogical

  const currentLabel = availableLocales.find((l) => l.value === current)?.label ?? current.toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='group gap-2 border-0 bg-transparent hover:bg-transparent data-[state=open]:bg-white px-2 py-1 h-auto'
        >
          <span className='hidden sm:inline'>{currentLabel}</span>
          <span className='sm:hidden uppercase'>{current}</span>
          <ChevronDown className='h-4 w-4 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='min-w-0 w-[var(--radix-dropdown-menu-trigger-width)] p-0'>
        {availableLocales
          .filter((l) => l.value !== current)
          .map(({ value, label }) => {
            const href = buildHref(value, urlLogical)
            return (
              <DropdownMenuItem key={value} asChild className='px-3 py-2'>
                <a href={href} className='flex w-full items-center justify-between'>
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
