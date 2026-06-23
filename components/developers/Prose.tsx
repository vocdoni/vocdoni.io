import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface ProseProps extends HTMLAttributes<HTMLDivElement> {}

// Typographic rhythm for documentation body content. Doc pages compose explicit
// elements (h2, p, ul, ...) and this wrapper applies consistent spacing, sizing
// and link styling to whatever they render, using design-system tokens.
export function Prose({ className, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        'max-w-none text-[15px] leading-7 text-muted-foreground',
        // Headings (anchor offset handled globally via html scroll-padding-top)
        '[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4',
        '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3',
        // Paragraphs and lists
        '[&_p]:my-4',
        '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul>li]:my-1.5 [&_ul>li]:pl-1',
        '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol>li]:my-1.5 [&_ol>li]:pl-1',
        // Strong and links
        '[&_strong]:font-semibold [&_strong]:text-foreground',
        '[&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline',
        // Inline code
        '[&_code]:rounded-md [&_code]:border [&_code]:border-border/60 [&_code]:bg-muted/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground',
        // Horizontal rule
        '[&_hr]:my-10 [&_hr]:border-border/60',
        className
      )}
      {...props}
    />
  )
}
