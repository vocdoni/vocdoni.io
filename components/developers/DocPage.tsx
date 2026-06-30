import type { DocsPageData } from '@/lib/docs/nav'
import { useData } from 'vike-react/useData'

import { DocArticle } from './DocArticle'
import { DocLLMButton } from './DocLLMButton'
import { DocReference } from './DocReference'
import { Prose } from './Prose'

// Renders a markdown-sourced doc inside the standard knowledge-base shell.
// The body HTML is compiled at build time (see lib/docs/markdown.ts) and the
// heading ids feed the on-this-page rail (DocsTOC) unchanged.
export function DocPage() {
  const { doc } = useData<DocsPageData>()

  return (
    <DocArticle slug={doc.slug} title={doc.frontmatter.title} lead={doc.frontmatter.lead}>
      <div className='mb-6 flex justify-end'>
        <DocLLMButton href={doc.rawHref} />
      </div>
      <Prose dangerouslySetInnerHTML={{ __html: doc.html }} />
      {doc.frontmatter.reference ? <DocReference reference={doc.frontmatter.reference} /> : null}
    </DocArticle>
  )
}
