import { cn } from '@/lib/utils'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

type Heading = { id: string; text: string; level: number }

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)

// "On this page" rail. Scans the rendered article for h2/h3, assigns ids when
// missing, and highlights the heading currently in view.
export function DocsTOC() {
  const { t } = useTranslation()
  const pageContext = usePageContext() as any
  const urlLogical = pageContext.urlLogical as string
  const [headings, setHeadings] = React.useState<Heading[]>([])
  const [activeId, setActiveId] = React.useState<string>('')

  React.useEffect(() => {
    const article = document.getElementById('docs-article')
    if (!article) return

    const nodes = (Array.from(article.querySelectorAll('h2, h3')) as HTMLElement[]).filter(
      (node) => (node.textContent ?? '').trim().length > 0
    )
    const collected: Heading[] = nodes.map((node) => {
      const text = (node.textContent ?? '').trim()
      if (!node.id) node.id = slugify(text)
      return { id: node.id, text, level: node.tagName === 'H3' ? 3 : 2 }
    })
    setHeadings(collected)

    if (collected.length === 0) return

    // Active = the last heading whose top has scrolled above the navbar line.
    // A scroll-driven check is more reliable than IntersectionObserver for tall
    // sections and pins the final heading once the page is scrolled to the end.
    const NAV_OFFSET = 120
    let frame = 0

    const update = () => {
      frame = 0
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (scrolledToBottom) {
        setActiveId(collected[collected.length - 1].id)
        return
      }
      let current = collected[0].id
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= NAV_OFFSET) current = node.id
        else break
      }
      setActiveId(current)
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [urlLogical])

  if (headings.length < 2) return <div className='hidden xl:block' />

  return (
    <aside className='hidden xl:block'>
      <div className='sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10'>
        <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground/80'>
          {t('developers.docs.common.on_this_page', 'On this page')}
        </p>
        <ul className='space-y-1.5 border-l border-border/60'>
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={() => setActiveId(heading.id)}
                className={cn(
                  '-ml-px block border-l-2 py-0.5 text-sm transition-colors',
                  heading.level === 3 ? 'pl-6' : 'pl-4',
                  activeId === heading.id
                    ? 'border-primary font-medium text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
