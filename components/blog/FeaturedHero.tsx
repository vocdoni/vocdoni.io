import { Link } from '@/components/Link'
import { AuthorByline } from '@/components/blog/AuthorByline'
import { Badge } from '@/components/ui/badge'
import type { BlogPostMeta } from '@/lib/blog/content'
import { formatDate } from '@/lib/blog/format'
import { ArrowRight, Newspaper } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface FeaturedHeroProps {
  post: BlogPostMeta
  locale: string
}

// Lead story: a large, borderless editorial card (image + text) that anchors the
// blog index next to the "latest posts" sidebar. The cover uses a wide 16:10 slot
// with object-cover so banners and photos display without side cropping.
export function FeaturedHero({ post, locale }: FeaturedHeroProps) {
  const { t } = useTranslation()
  const { frontmatter, href } = post
  const category = post.categories[0]

  return (
    <article className='group'>
      <Link href={href} variant='card' className='block rounded-3xl'>
        <div className='relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted'>
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
          <div className='absolute left-4 top-4 flex items-center gap-2'>
            <Badge className='h-6 rounded-full border-transparent px-3 text-xs font-semibold leading-none'>
              {t('blog.featured', 'Featured')}
            </Badge>
            {category ? (
              <Badge
                variant='outline'
                className='h-6 rounded-full border-transparent bg-background px-3 text-xs font-semibold leading-none text-foreground'
              >
                {category.name}
              </Badge>
            ) : null}
          </div>
        </div>

        <div className='mt-6'>
          <time dateTime={frontmatter.publishedDate} className='text-xs uppercase tracking-wide text-muted-foreground'>
            {formatDate(frontmatter.publishedDate, locale)}
          </time>
          <h2 className='mt-2 text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-3xl'>
            {frontmatter.title}
          </h2>
          {frontmatter.excerpt ? (
            <p className='mt-3 line-clamp-3 text-base leading-relaxed text-muted-foreground'>{frontmatter.excerpt}</p>
          ) : null}
          <div className='mt-5 flex flex-wrap items-center justify-between gap-4'>
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
