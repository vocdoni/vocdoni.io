import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export type CodeSample = {
  // Tab label, e.g. "cURL", "JavaScript". Shown only when more than one sample.
  label: string
  // Raw code. Rendered inside <pre>, so it is exempt from copy translation rules.
  code: string
}

interface CodeBlockProps {
  samples: CodeSample[]
  className?: string
  // Optional caption shown above the block (e.g. a request line). Pass translated copy.
  caption?: React.ReactNode
}

function CopyButton({ value }: { value: string }) {
  const { t } = useTranslation()
  const [copied, setCopied] = React.useState(false)

  const onCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be unavailable (insecure context); fail quietly.
    }
  }, [value])

  return (
    <button
      type='button'
      onClick={onCopy}
      aria-label={copied ? t('developers.docs.common.copied', 'Copied') : t('developers.docs.common.copy', 'Copy')}
      className='press-scale absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40'
    >
      {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
    </button>
  )
}

function Pre({ code }: { code: string }) {
  return (
    <pre className='overflow-x-auto p-4 font-mono text-[13px] leading-6 text-zinc-100'>
      <code>{code}</code>
    </pre>
  )
}

// Dark, rounded code surface with a copy button and optional language tabs.
// Syntax highlighting is intentionally omitted for now (no extra dependency);
// the monospace token + dark surface keep it readable and easy to scan.
export function CodeBlock({ samples, className, caption }: CodeBlockProps) {
  if (samples.length === 0) return null
  const multiple = samples.length > 1

  return (
    <div className={cn('my-6', className)}>
      {caption ? <div className='mb-2 text-xs font-medium text-muted-foreground'>{caption}</div> : null}
      <div className='relative overflow-hidden rounded-xl border border-border/60 bg-zinc-950 shadow-sm'>
        {multiple ? (
          <Tabs defaultValue={samples[0].label}>
            <div className='flex items-center justify-between border-b border-white/10 bg-zinc-900/60 px-2'>
              <TabsList className='h-10 gap-1 bg-transparent p-1'>
                {samples.map((sample) => (
                  <TabsTrigger
                    key={sample.label}
                    value={sample.label}
                    className='text-xs text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white'
                  >
                    {sample.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {samples.map((sample) => (
              <TabsContent key={sample.label} value={sample.label} className='relative mt-0'>
                <CopyButton value={sample.code} />
                <Pre code={sample.code} />
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className='relative'>
            <CopyButton value={samples[0].code} />
            <Pre code={samples[0].code} />
          </div>
        )}
      </div>
    </div>
  )
}
