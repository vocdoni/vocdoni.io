import { cn } from '@/lib/utils'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

type Heading = { id: string; text: string; level: number }

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)

// "On this page" rail for a blog post. Scans #blog-article for h2/h3 and
// highlights the section currently in view. Mirrors the docs rail behaviour.
// Keyed off the compiled `html` (like BlogArticle) so the scan re-runs whenever
// the article content changes — including language switches, where the URL's
// logical path stays the same but the body is recompiled in the new locale.
export function BlogTOC({ html }: { html: string }) {
  const { t } = useTranslation()
  const [headings, setHeadings] = React.useState<Heading[]>([])
  const [activeId, setActiveId] = React.useState<string>('')

  React.useEffect(() => {
    const article = document.getElementById('blog-article')
    if (!article) return

    const headingText = (node: HTMLElement) => {
      const clone = node.cloneNode(true) as HTMLElement
      clone.querySelector('.heading-anchor')?.remove()
      return (clone.textContent ?? '').trim()
    }

    const nodes = (Array.from(article.querySelectorAll('h2, h3')) as HTMLElement[]).filter(
      (node) => headingText(node).length > 0
    )
    const collected: Heading[] = nodes.map((node) => {
      const text = headingText(node)
      if (!node.id) node.id = slugify(text)
      return { id: node.id, text, level: node.tagName === 'H3' ? 3 : 2 }
    })
    setHeadings(collected)
    if (collected.length === 0) return

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
  }, [html])

  if (headings.length < 2) return <div className='hidden xl:block' />

  return (
    <aside className='hidden xl:block'>
      <div className='sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-10'>
        <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground/80'>
          {t('blog.on_this_page', 'On this page')}
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
