import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import type { BlogAuthor } from '@/lib/blog/content'
import { authorInitials } from '@/lib/blog/format'
import { ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// End-of-post author card(s). Rendered only for authors that have a bio.
export function AuthorBio({ authors }: { authors: BlogAuthor[] }) {
  const { t } = useTranslation()
  const withBio = authors.filter((author) => author.bioHtml)
  if (!withBio.length) return null

  return (
    <div className='mt-12 space-y-4'>
      {withBio.map((author) => (
        <div key={author.slug} className='flex gap-4 rounded-2xl border border-border/60 bg-muted/20 p-5'>
          <Avatar className='size-12 shrink-0'>
            {author.avatar ? <AvatarImage src={author.avatar} alt={author.name} /> : null}
            <AvatarFallback className='text-sm font-medium'>{authorInitials(author.name)}</AvatarFallback>
          </Avatar>
          <div className='min-w-0'>
            <p className='font-semibold text-foreground'>{author.name}</p>
            {author.role ? <p className='text-sm text-muted-foreground'>{author.role}</p> : null}
            <div
              className='mt-2 text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_p]:my-1'
              dangerouslySetInnerHTML={{ __html: author.bioHtml! }}
            />
            {author.website ? (
              <a
                href={author.website}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline'
              >
                {t('blog.author_website', 'Website')}
                <ExternalLink className='size-3.5' />
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
