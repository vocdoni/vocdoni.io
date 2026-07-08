import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

interface MarkdownLinkButtonProps {
  href: string
  label: string
}

// Links to the raw markdown source of the current page so a reader (or an LLM) can
// grab clean, HTML-free content. Shared by the developer docs and the blog; the label
// is passed in so each section keeps its own translation key. Opens in a new tab.
export function MarkdownLinkButton({ href, label }: MarkdownLinkButtonProps) {
  return (
    <Button asChild variant='outline' size='sm'>
      <a href={href} target='_blank' rel='noopener noreferrer'>
        <FileText />
        {label}
      </a>
    </Button>
  )
}
