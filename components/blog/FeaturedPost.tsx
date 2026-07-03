import { Link } from '@/components/Link'
import { AuthorByline } from '@/components/blog/AuthorByline'
import { Badge } from '@/components/ui/badge'
import type { BlogPostMeta } from '@/lib/blog/content'
import { formatDate } from '@/lib/blog/format'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Newspaper } from 'lucide-react'

interface FeaturedPostProps {
  post: BlogPostMeta
  locale: string
}

// Large lead card for the newest featured post: image beside long-form summary.
export function FeaturedPost({ post, locale }: FeaturedPostProps) {
  const { t } = useTranslation()
  const { frontmatter, href } = post
  const category = post.categories[0]

  return (
    <article className='group relative'>
      <Link
        href={href}
        variant='card'
        className='block overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg'
      >
        <div className='relative aspect-video overflow-hidden bg-muted'>
          {frontmatter.coverImage ? (
            <img
              src={frontmatter.coverImage}
              alt={frontmatter.coverAlt || frontmatter.title}
              className='image-outline size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]'
            />
          ) : (
            <div className='flex size-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 text-primary/40'>
              <Newspaper className='size-16' aria-hidden='true' />
            </div>
          )}
        </div>

        <div className='flex flex-col gap-4 p-6 sm:p-8'>
          <div className='flex items-center gap-2 text-xs text-muted-foreground'>
            <Badge className='rounded-full'>{t('blog.featured', 'Featured')}</Badge>
            {category ? (
              <Badge variant='secondary' className='rounded-full font-medium'>
                {category.name}
              </Badge>
            ) : null}
            <time dateTime={frontmatter.publishedDate}>{formatDate(frontmatter.publishedDate, locale)}</time>
          </div>

          <h2 className='text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl lg:text-4xl'>
            {frontmatter.title}
          </h2>

          {frontmatter.excerpt ? (
            <p className='line-clamp-3 text-base leading-relaxed text-muted-foreground'>{frontmatter.excerpt}</p>
          ) : null}

          <div className='mt-2 flex flex-wrap items-center justify-between gap-4'>
            <AuthorByline
              authors={post.authors}
              meta={t('blog.reading_time', '{{minutes}} min read', { minutes: post.readingMinutes })}
            />
            <span className='inline-flex items-center gap-1.5 text-sm font-medium text-primary'>
              {t('blog.read_article', 'Read article')}
              <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
