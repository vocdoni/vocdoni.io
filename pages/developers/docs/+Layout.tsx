import { DocsSidebar } from '@/components/developers/DocsSidebar'
import { DocsTOC } from '@/components/developers/DocsTOC'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

// Wires the copy buttons baked into the compiled markdown code blocks
// (`[data-copy]`). The buttons are static HTML; this adds the clipboard
// behaviour after hydration. No markdown renderer ships to the client.
function useCodeCopyButtons() {
  const { t } = useTranslation()
  React.useEffect(() => {
    const article = document.getElementById('docs-article')
    if (!article) return
    const copyLabel = t('developers.docs.common.copy', 'Copy')
    const copiedLabel = t('developers.docs.common.copied', 'Copied')

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

// Progressive enhancement for the `:::code-tabs` groups baked into the compiled
// markdown (`.code-tabs`). The static HTML ships every language panel stacked
// and visible with the tab bar `hidden`, so the no-JS view is a graceful
// fallback. After hydration this reveals the tab bar, shows one panel at a time,
// and persists the chosen language across every group and page via localStorage.
const CODE_LANG_KEY = 'docs-code-lang'

function useCodeTabs() {
  React.useEffect(() => {
    const article = document.getElementById('docs-article')
    if (!article) return
    const groups = Array.from(article.querySelectorAll<HTMLElement>('.code-tabs'))
    if (!groups.length) return

    const tabsOf = (group: HTMLElement) => Array.from(group.querySelectorAll<HTMLButtonElement>('[role="tab"]'))

    const setActive = (group: HTMLElement, tab: HTMLButtonElement) => {
      for (const t of tabsOf(group)) {
        const selected = t === tab
        t.setAttribute('aria-selected', selected ? 'true' : 'false')
        t.tabIndex = selected ? 0 : -1
        const panel = document.getElementById(t.getAttribute('aria-controls') ?? '')
        if (panel) panel.hidden = !selected
      }
    }

    // Apply a language across every group that offers it; groups without it keep
    // their current tab. Returns nothing - persistence is handled by the caller.
    const applyLang = (lang: string | null) => {
      if (!lang) return
      for (const group of groups) {
        const match = tabsOf(group).find((t) => t.dataset.codeTab === lang)
        if (match) setActive(group, match)
      }
    }

    let stored: string | null = null
    try {
      stored = window.localStorage.getItem(CODE_LANG_KEY)
    } catch {
      // localStorage can be unavailable (private mode); ignore.
    }

    const cleanups: Array<() => void> = []

    for (const group of groups) {
      const tablist = group.querySelector<HTMLElement>('[role="tablist"]')
      const tabs = tabsOf(group)
      if (!tablist || !tabs.length) continue
      tablist.hidden = false
      setActive(group, tabs[0]) // default before the stored language is applied

      const select = (tab: HTMLButtonElement) => {
        const lang = tab.dataset.codeTab ?? null
        applyLang(lang)
        if (lang) {
          try {
            window.localStorage.setItem(CODE_LANG_KEY, lang)
          } catch {
            // ignore write failures
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

    applyLang(stored) // honour the site-wide choice without overwriting it

    return () => cleanups.forEach((fn) => fn())
  })
}

// Nested layout: renders inside the global Navbar + Footer layout and adds the
// documentation sidebar (left) and on-this-page rail (right). The landing at
// /developers does not use this layout - only /developers/docs/* pages do.
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  useCodeCopyButtons()
  useCodeTabs()

  return (
    <div className='mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10'>
      <div className='lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[15rem_minmax(0,1fr)_14rem] xl:gap-12'>
        <DocsSidebar />
        <div className='min-w-0 pt-5 lg:pt-0'>{children}</div>
        <DocsTOC />
      </div>
    </div>
  )
}
