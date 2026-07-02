import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface BlogProseProps extends HTMLAttributes<HTMLDivElement> {}

// Long-form editorial typography for compiled blog post HTML (lib/docs/markdown.ts
// pipeline). Tuned for reading comfort: a slightly larger measure than the docs
// Prose, block images with captions, and softer blockquotes. Code blocks, tables
// and admonitions keep the shared pipeline styling.
export function BlogProse({ className, ...props }: BlogProseProps) {
  return (
    <div
      className={cn(
        'max-w-none text-[1.0625rem] leading-8 text-foreground/85',
        // Headings
        '[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground sm:[&_h2]:text-[1.75rem]',
        '[&_h3]:mt-9 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground',
        '[&_h4]:mt-7 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground',
        // Body + lists
        '[&_p]:my-5',
        '[&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul>li]:my-2 [&_ul>li]:pl-1.5',
        '[&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:my-2 [&_ol>li]:pl-1.5',
        // Emphasis + links
        '[&_strong]:font-semibold [&_strong]:text-foreground',
        '[&_a:not(.heading-anchor)]:font-medium [&_a:not(.heading-anchor)]:text-primary [&_a:not(.heading-anchor)]:underline [&_a:not(.heading-anchor)]:decoration-primary/30 [&_a:not(.heading-anchor)]:underline-offset-[3px] hover:[&_a:not(.heading-anchor)]:decoration-primary',
        // Inline code (code blocks + table cells keep their own pipeline styling)
        '[&_:not(pre):not(td):not(th)>code]:rounded-md [&_:not(pre):not(td):not(th)>code]:border [&_:not(pre):not(td):not(th)>code]:border-border/60 [&_:not(pre):not(td):not(th)>code]:bg-muted/60 [&_:not(pre):not(td):not(th)>code]:px-1.5 [&_:not(pre):not(td):not(th)>code]:py-0.5 [&_:not(pre):not(td):not(th)>code]:font-mono [&_:not(pre):not(td):not(th)>code]:text-[0.85em] [&_:not(pre):not(td):not(th)>code]:text-foreground',
        // Images + figures
        '[&_img]:my-8 [&_img]:w-full [&_img]:rounded-2xl [&_img]:object-cover [&_img]:shadow-sm [&_img]:image-outline',
        '[&_figure]:my-8 [&_figure>img]:my-0',
        '[&_figcaption]:mt-3 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground',
        // Blockquote
        '[&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-5 [&_blockquote]:text-lg [&_blockquote]:italic [&_blockquote]:text-foreground/80',
        // Horizontal rule
        '[&_hr]:my-12 [&_hr]:border-border/60',
        className
      )}
      {...props}
    />
  )
}
