import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface DocLLMButtonProps {
  href: string
}

// Links to the raw markdown source of the current doc so a reader (or an LLM)
// can grab clean, HTML-free content. Opens in a new tab.
export function DocLLMButton({ href }: DocLLMButtonProps) {
  const { t } = useTranslation()

  return (
    <Button asChild variant='outline' size='sm'>
      <a href={href} target='_blank' rel='noopener noreferrer'>
        <FileText />
        {t('developers.docs.common.view_markdown', 'View as markdown')}
      </a>
    </Button>
  )
}
