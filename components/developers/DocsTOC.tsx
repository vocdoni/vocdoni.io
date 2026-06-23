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

    const nodes = Array.from(article.querySelectorAll('h2, h3')) as HTMLElement[]
    const collected: Heading[] = nodes
      .filter((node) => (node.textContent ?? '').trim().length > 0)
      .map((node) => {
        const text = (node.textContent ?? '').trim()
        if (!node.id) node.id = slugify(text)
        return { id: node.id, text, level: node.tagName === 'H3' ? 3 : 2 }
      })
    setHeadings(collected)

    if (collected.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
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
