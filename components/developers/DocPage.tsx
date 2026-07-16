import { MarkdownLinkButton } from '@/components/MarkdownLinkButton'
import { Button } from '@/components/ui/button'
import { DEVELOPERS_SKILLS_URL } from '@/lib/developers'
import type { DocsPageData } from '@/lib/docs/nav'
import { Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useData } from 'vike-react/useData'

import { DocArticle } from './DocArticle'
import { DocReference } from './DocReference'
import { DocsLanguageNotice } from './DocsLanguageNotice'
import { Prose } from './Prose'

// Renders a markdown-sourced doc inside the standard knowledge-base shell.
// The body HTML is compiled at build time (see lib/docs/markdown.ts) and the
// heading ids feed the on-this-page rail (DocsTOC) unchanged.
export function DocPage() {
  const { doc } = useData<DocsPageData>()
  const { t } = useTranslation()

  return (
    <DocArticle
      slug={doc.slug}
      title={doc.frontmatter.title}
      lead={doc.frontmatter.lead}
      notice={<DocsLanguageNotice />}
    >
      <div className='mb-6 flex flex-wrap justify-end gap-3'>
        {doc.frontmatter.skill ? (
          <Button asChild variant='outline' size='sm'>
            <a href={DEVELOPERS_SKILLS_URL} target='_blank' rel='noopener noreferrer'>
              <Sparkles />
              {t('developers.docs.common.agent_skill', 'Agent skill')}
            </a>
          </Button>
        ) : null}
        <MarkdownLinkButton href={doc.rawHref} label={t('developers.docs.common.view_markdown', 'View as markdown')} />
      </div>
      <Prose dangerouslySetInnerHTML={{ __html: doc.html }} />
      {doc.frontmatter.reference ? <DocReference reference={doc.frontmatter.reference} /> : null}
    </DocArticle>
  )
}
