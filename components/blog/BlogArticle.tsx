import { BlogProse } from '@/components/blog/BlogProse'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

// Wires the copy buttons ([data-copy]) baked into compiled code blocks. The
// buttons are static HTML from the markdown pipeline; this adds clipboard
// behaviour after hydration.
function useCodeCopyButtons() {
  const { t } = useTranslation()
  React.useEffect(() => {
    const article = document.getElementById('blog-article')
    if (!article) return
    const copyLabel = t('blog.copy', 'Copy')
    const copiedLabel = t('blog.copied', 'Copied')

    const buttons = Array.from(article.querySelectorAll<HTMLButtonElement>('button[data-copy]'))
    const timers = new Map<HTMLButtonElement, number>()

    const onClick = async (event: Event) => {
      const button = event.currentTarget as HTMLButtonElement
      const pre = button.parentElement?.querySelector('pre')
      if (!pre) return
      try {
        await navigator.clipboard.writeText(pre.textContent ?? '')
        button.setAttribute('aria-label', copiedLabel)
        button.dataset.copied = 'true'
        const existing = timers.get(button)
        if (existing) window.clearTimeout(existing)
        timers.set(
          button,
          window.setTimeout(() => {
            button.setAttribute('aria-label', copyLabel)
            delete button.dataset.copied
          }, 2000)
        )
      } catch {
        // Clipboard can be unavailable (insecure context); fail quietly.
      }
    }

    buttons.forEach((button) => {
      button.setAttribute('aria-label', copyLabel)
      button.addEventListener('click', onClick)
    })
    return () => {
      buttons.forEach((button) => button.removeEventListener('click', onClick))
      timers.forEach((id) => window.clearTimeout(id))
    }
  })
}

// Progressive enhancement for :::code-tabs groups baked into the compiled HTML.
const CODE_LANG_KEY = 'blog-code-lang'

function useCodeTabs() {
  React.useEffect(() => {
    const article = document.getElementById('blog-article')
    if (!article) return
    const groups = Array.from(article.querySelectorAll<HTMLElement>('.code-tabs'))
    if (!groups.length) return

    const tabsOf = (group: HTMLElement) => Array.from(group.querySelectorAll<HTMLButtonElement>('[role="tab"]'))
    const setActive = (group: HTMLElement, tab: HTMLButtonElement) => {
      for (const current of tabsOf(group)) {
        const selected = current === tab
        current.setAttribute('aria-selected', selected ? 'true' : 'false')
        current.tabIndex = selected ? 0 : -1
        const panel = document.getElementById(current.getAttribute('aria-controls') ?? '')
        if (panel) panel.hidden = !selected
      }
    }
    const applyLang = (lang: string | null) => {
      if (!lang) return
      for (const group of groups) {
        const match = tabsOf(group).find((tab) => tab.dataset.codeTab === lang)
        if (match) setActive(group, match)
      }
    }

    let stored: string | null = null
    try {
      stored = window.localStorage.getItem(CODE_LANG_KEY)
    } catch {
      /* ignore */
    }

    const cleanups: Array<() => void> = []
    for (const group of groups) {
      const tablist = group.querySelector<HTMLElement>('[role="tablist"]')
      const tabs = tabsOf(group)
      if (!tablist || !tabs.length) continue
      tablist.hidden = false
      setActive(group, tabs[0])

      const select = (tab: HTMLButtonElement) => {
        const lang = tab.dataset.codeTab ?? null
        applyLang(lang)
        if (lang) {
          try {
            window.localStorage.setItem(CODE_LANG_KEY, lang)
          } catch {
            /* ignore */
          }
        }
      }
      const onClick = (event: Event) => select(event.currentTarget as HTMLButtonElement)
      const onKeydown = (event: KeyboardEvent) => {
        const i = tabs.indexOf(event.currentTarget as HTMLButtonElement)
        let next = -1
        if (event.key === 'ArrowRight') next = (i + 1) % tabs.length
        else if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length
        else if (event.key === 'Home') next = 0
        else if (event.key === 'End') next = tabs.length - 1
        else return
        event.preventDefault()
        tabs[next].focus()
        select(tabs[next])
      }
      for (const tab of tabs) {
        tab.addEventListener('click', onClick)
        tab.addEventListener('keydown', onKeydown)
        cleanups.push(() => {
          tab.removeEventListener('click', onClick)
          tab.removeEventListener('keydown', onKeydown)
        })
      }
    }
    applyLang(stored)
    return () => cleanups.forEach((fn) => fn())
  })
}

// The post body: renders compiled HTML in the reading-optimised prose wrapper and
// activates the code affordances. The #blog-article id feeds the on-this-page rail.
export function BlogArticle({ html }: { html: string }) {
  useCodeCopyButtons()
  useCodeTabs()
  return (
    <div id='blog-article' className='min-w-0'>
      <BlogProse dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
