import { cn } from '@/lib/utils'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

const methodStyles: Record<HttpMethod, string> = {
  GET: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 ring-sky-500/20',
  POST: 'bg-primary/10 text-primary ring-primary/20',
  PUT: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-amber-500/20',
  DELETE: 'bg-destructive/10 text-destructive ring-destructive/20',
  PATCH: 'bg-violet-500/10 text-violet-700 dark:text-violet-300 ring-violet-500/20',
}

interface EndpointProps {
  method: HttpMethod
  path: string
  className?: string
}

// Compact HTTP method pill + path row used across the reference. The method and
// path are technical tokens (rendered in a code element), not translatable copy.
export function Endpoint({ method, path, className }: EndpointProps) {
  return (
    <div
      className={cn(
        'my-4 flex items-center gap-3 overflow-x-auto rounded-lg border border-border/60 bg-muted/30 px-3 py-2',
        className
      )}
    >
      <span
        className={cn(
          'inline-flex shrink-0 items-center rounded-md px-2 py-0.5 font-mono text-xs font-semibold uppercase ring-1 ring-inset',
          methodStyles[method]
        )}
      >
        {method}
      </span>
      <code className='whitespace-nowrap font-mono text-[13px] text-foreground'>{path}</code>
    </div>
  )
}
