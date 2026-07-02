import { Link } from '@/components/Link'
import { AuthorByline } from '@/components/blog/AuthorByline'
import { Badge } from '@/components/ui/badge'
import type { BlogPostMeta } from '@/lib/blog/content'
import { formatDate } from '@/lib/blog/format'
import { cn } from '@/lib/utils'
import { Newspaper } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface BlogCardProps {
  post: BlogPostMeta
  locale: string
  className?: string
}

// Post card for listings: cover image, category, title, excerpt, byline.
export function BlogCard({ post, locale, className }: BlogCardProps) {
  const { t } = useTranslation()
  const { frontmatter, href } = post
  const category = post.categories[0]

  return (
    <article className={cn('group relative flex h-full flex-col', className)}>
      <Link href={href} variant='card' className='flex h-full flex-col rounded-2xl'>
        <div className='relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted'>
          {frontmatter.coverImage ? (
            <img
              src={frontmatter.coverImage}
              alt={frontmatter.coverAlt || frontmatter.title}
              loading='lazy'
              className='image-outline size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]'
            />
          ) : (
            <div className='flex size-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 text-primary/40'>
              <Newspaper className='size-10' aria-hidden='true' />
            </div>
          )}
        </div>

        <div className='flex flex-1 flex-col pt-5'>
          <div className='mb-3 flex items-center gap-2 text-xs text-muted-foreground'>
            {category ? (
              <Badge variant='secondary' className='rounded-full font-medium'>
                {category.name}
              </Badge>
            ) : null}
            <time dateTime={frontmatter.publishedDate}>{formatDate(frontmatter.publishedDate, locale)}</time>
          </div>

          <h3 className='text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl'>
            {frontmatter.title}
          </h3>

          {frontmatter.excerpt ? (
            <p className='mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground'>{frontmatter.excerpt}</p>
          ) : null}

          <div className='mt-auto pt-5'>
            <AuthorByline
              authors={post.authors}
              size='sm'
              meta={t('blog.reading_time', '{{minutes}} min read', { minutes: post.readingMinutes })}
            />
          </div>
        </div>
      </Link>
    </article>
  )
}
