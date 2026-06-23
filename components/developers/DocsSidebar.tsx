import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Menu, PanelLeft } from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

import { DOCS_NAV, navLabels } from './docs-nav'

const normalize = (value: string) => {
  if (value.length > 1 && value.endsWith('/')) return value.slice(0, -1)
  return value
}

function NavTree({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation()
  const pageContext = usePageContext() as any
  const current = normalize((pageContext.urlLogical as string) || '/')
  const labels = navLabels(t)
  const groups = labels.groups
  const items = labels.items

  return (
    <nav className='space-y-7' aria-label={t('developers.docs.nav.aria_label', 'Documentation')}>
      {DOCS_NAV.map((group) => (
        <div key={group.id}>
          <p className='mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground/80'>
            {groups[group.id]}
          </p>
          <ul className='space-y-0.5'>
            {group.items.map((item) => {
              const active = normalize(item.href) === current
              return (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    variant='unstyled'
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'block rounded-md px-3 py-1.5 text-sm transition-colors',
                      active
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    {items[item.slug]}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export function DocsSidebar() {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {/* Mobile / tablet: disclosure trigger */}
      <div className='lg:hidden'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant='outline' size='sm' className='gap-2'>
              <Menu className='size-4' />
              {t('developers.docs.nav.browse', 'Browse docs')}
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[300px] overflow-y-auto p-6'>
            <div className='mb-6 flex items-center gap-2 text-sm font-semibold'>
              <PanelLeft className='size-4 text-primary' />
              {t('developers.docs.nav.title', 'Documentation')}
            </div>
            <NavTree onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: sticky sidebar. No max-height/overflow so the full section
          list always renders without its own scrollbar. */}
      <aside className='hidden lg:block'>
        <div className='sticky top-24 pb-10 pr-2'>
          <NavTree />
        </div>
      </aside>
    </>
  )
}
