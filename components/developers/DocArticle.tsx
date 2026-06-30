import * as React from 'react'

import { DocsBreadcrumbs } from './DocsBreadcrumbs'
import { DocsPager } from './DocsPager'

interface DocArticleProps {
  slug: string
  title: React.ReactNode
  lead?: React.ReactNode
  children: React.ReactNode
}

// Standard shell for a knowledge-base page: breadcrumbs, title + lead, the body
// (scanned by the on-this-page rail via #docs-article) and the prev/next pager.
export function DocArticle({ slug, title, lead, children }: DocArticleProps) {
  return (
    <article className='min-w-0'>
      <DocsBreadcrumbs slug={slug} />
      <header className='mb-2'>
        <h1 className='text-3xl font-bold tracking-tight text-balance sm:text-4xl'>{title}</h1>
        {lead ? <p className='mt-3 text-lg leading-8 text-muted-foreground'>{lead}</p> : null}
      </header>
      <div id='docs-article' className='min-w-0'>
        {children}
      </div>
      <DocsPager slug={slug} />
    </article>
  )
}
