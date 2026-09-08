import { Link } from '@/components/Link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useDocsData } from '@/hooks/useDocsData'
import { cn } from '@/lib/utils'
import { Menu, PanelLeft } from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

import { DocsVersionSelector } from './DocsVersionSelector'
import { navGroupLabels } from './docs-nav'

const normalize = (value: string) => {
  if (value.length > 1 && value.endsWith('/')) return value.slice(0, -1)
  return value
}

const ITEM_BASE = 'block rounded-md px-3 py-1.5 text-sm transition-colors'

function NavTree({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation()
  const { nav, bakedSlugs } = useDocsData()
  const pageContext = usePageContext() as any
  const current = normalize((pageContext.urlLogical as string) || '/')
  const groups = navGroupLabels(t)

  return (
    <nav className='space-y-7' aria-label={t('developers.docs.nav.aria_label', 'Documentation')}>
      <DocsVersionSelector />
      {nav.map((group) => (
        <div key={group.id}>
          <p className='mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground/80'>
            {groups[group.id] ?? group.id}
          </p>
          <ul className='space-y-0.5'>
            {group.items.map((item) => {
              const active = normalize(item.href) === current
              // A branch can introduce pages this build never prerendered. They
              // have no route, so they render as inert entries rather than links
              // that 404. Phase 2 adds a Netlify rewrite that serves them for
              // real; until then the badge is the whole story.
              if (!bakedSlugs.has(item.slug)) {
                return (
                  <li key={item.slug}>
                    <span
                      className={cn(ITEM_BASE, 'flex items-center justify-between gap-2 text-muted-foreground/60')}
                      title={t('developers.docs.version.new_page_hint', 'Not published yet')}
                    >
                      {item.label}
                      <Badge variant='warning' className='px-1.5 py-0 text-[10px] font-medium'>
                        {t('developers.docs.version.new_page', 'New')}
                      </Badge>
                    </span>
                  </li>
                )
              }
              return (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    variant='unstyled'
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      ITEM_BASE,
                      active
                        ? 'bg-primary/10 font-medium text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )}
                  >
                    {item.label}
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
        <div className='sticky top-20 pb-10 pr-2'>
          <NavTree />
        </div>
      </aside>
    </>
  )
}
