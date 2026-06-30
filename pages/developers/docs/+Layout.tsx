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

// Nested layout: renders inside the global Navbar + Footer layout and adds the
// documentation sidebar (left) and on-this-page rail (right). The landing at
// /developers does not use this layout - only /developers/docs/* pages do.
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  useCodeCopyButtons()

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
