import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

export type VerticalIndexItem = {
  id: string
  label: string
}

export function VerticalSectionIndex({ items }: { items: VerticalIndexItem[] }) {
  const { t } = useTranslation()
  const [activeId, setActiveId] = React.useState(items[0]?.id ?? '')
  const [isVisible, setIsVisible] = React.useState(false)
  const navRef = React.useRef<HTMLElement>(null)
  const listRef = React.useRef<HTMLOListElement>(null)
  const linkRefs = React.useRef(new Map<string, HTMLAnchorElement>())

  React.useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) return

    let frame = 0
    const update = () => {
      frame = 0
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const nav = navRef.current
      const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0
      setIsVisible(sections[0].getBoundingClientRect().bottom <= headerBottom)
      const activationLine =
        nav && !window.matchMedia('(min-width: 1280px)').matches ? nav.getBoundingClientRect().bottom + 24 : 120
      let current = atBottom ? sections[sections.length - 1].id : sections[0].id

      if (!atBottom) {
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= activationLine) current = section.id
          else break
        }
      }

      setActiveId((previous) => (previous === current ? previous : current))
    }
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [items])

  React.useEffect(() => {
    const list = listRef.current
    const activeLink = linkRefs.current.get(activeId)
    if (!list || !activeLink || list.scrollWidth <= list.clientWidth) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const left = activeLink.offsetLeft - (list.clientWidth - activeLink.offsetWidth) / 2
    list.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [activeId])

  const navigateTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const section = document.getElementById(id)
    if (!section) return

    event.preventDefault()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nav = navRef.current
    const header = document.querySelector('header')
    const headerBottom = header?.getBoundingClientRect().bottom ?? 0
    const navBottom = nav?.getBoundingClientRect().bottom ?? headerBottom
    const offset = nav && getComputedStyle(nav).position === 'sticky' ? navBottom + 18 : headerBottom + 24
    const top = section.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' })
    window.history.pushState(null, '', `#${id}`)
    setActiveId(id)
  }

  return (
    <nav
      ref={navRef}
      aria-label={t('blog.on_this_page', 'On this page')}
      aria-hidden={!isVisible}
      inert={isVisible ? undefined : true}
      className={cn(
        'fixed top-[71px] right-0 left-0 z-40 border-y bg-background/90 shadow-sm backdrop-blur-xl transition-opacity xl:top-1/2 xl:right-4 xl:left-auto xl:w-auto xl:-translate-y-1/2 xl:rounded-2xl xl:border xl:p-2 xl:shadow-lg 2xl:right-8',
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <ol
        ref={listRef}
        className='flex snap-x snap-mandatory gap-1 overflow-x-auto px-3 py-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:flex-col xl:overflow-visible xl:p-0'
      >
        {items.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id} className='shrink-0 snap-center'>
              <a
                ref={(node) => {
                  if (node) linkRefs.current.set(item.id, node)
                  else linkRefs.current.delete(item.id)
                }}
                href={`#${item.id}`}
                aria-current={active ? 'location' : undefined}
                onClick={(event) => navigateTo(event, item.id)}
                className={cn(
                  'group relative flex min-h-[2.75rem] items-center gap-2 rounded-xl px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background xl:min-h-8 xl:w-8 xl:justify-center xl:px-0',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <span
                  aria-hidden='true'
                  className={cn(
                    'size-1.5 shrink-0 rounded-full border border-current transition-transform',
                    active && 'scale-125 bg-current'
                  )}
                />
                <span
                  className={cn(
                    'max-w-52 truncate whitespace-nowrap first-letter:uppercase',
                    'xl:pointer-events-none xl:absolute xl:top-1/2 xl:right-full xl:mr-2 xl:-translate-y-1/2 xl:rounded-lg xl:border xl:bg-background xl:px-3 xl:py-2 xl:text-foreground xl:shadow-lg xl:transition-opacity',
                    active ? 'xl:opacity-100' : 'xl:opacity-0 xl:group-hover:opacity-100'
                  )}
                >
                  {item.label}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default VerticalSectionIndex
