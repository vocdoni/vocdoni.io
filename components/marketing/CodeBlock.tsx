import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

export type CodeBlockProps = {
  code: string
  language?: string
  filename?: string
  className?: string
}

export default function CodeBlock({ code, language, filename, className }: CodeBlockProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be unavailable (insecure context); fail silently.
    }
  }

  const label = filename ?? language

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-border/60 bg-zinc-950 shadow-sm', className)}>
      <div className='flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5'>
        <div className='flex items-center gap-1.5'>
          <span className='size-2.5 rounded-full bg-red-500/70' aria-hidden='true' />
          <span className='size-2.5 rounded-full bg-yellow-500/70' aria-hidden='true' />
          <span className='size-2.5 rounded-full bg-green-500/70' aria-hidden='true' />
          {label && <span className='ml-2 font-mono text-xs text-zinc-400'>{label}</span>}
        </div>
        <button
          type='button'
          onClick={handleCopy}
          aria-label={copied ? t('code_block.copied', 'Copied') : t('code_block.copy', 'Copy code')}
          className='inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40'
        >
          {copied ? (
            <Check className='size-3.5 text-green-400' aria-hidden='true' />
          ) : (
            <Copy className='size-3.5' aria-hidden='true' />
          )}
          {copied ? t('code_block.copied', 'Copied') : t('code_block.copy', 'Copy')}
        </button>
      </div>
      <pre className='overflow-x-auto px-4 py-4 text-sm leading-relaxed'>
        <code className='font-mono text-zinc-100'>{code}</code>
      </pre>
    </div>
  )
}
