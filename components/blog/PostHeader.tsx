import { Link } from '@/components/Link'
import { AuthorByline } from '@/components/blog/AuthorByline'
import { Badge } from '@/components/ui/badge'
import { BLOG_BASE, BLOG_CATEGORY_BASE, type LoadedBlogPost } from '@/lib/blog/content'
import { formatDate } from '@/lib/blog/format'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface PostHeaderProps {
  post: LoadedBlogPost
  locale: string
}

// Article masthead: breadcrumb, categories, title, excerpt, byline and cover.
export function PostHeader({ post, locale }: PostHeaderProps) {
  const { t } = useTranslation()
  const { frontmatter } = post

  return (
    <header>
      <nav
        aria-label={t('blog.breadcrumb', 'Breadcrumb')}
        className='mb-6 flex items-center gap-1.5 text-sm text-muted-foreground'
      >
        <Link href={BLOG_BASE} variant='unstyled' className='hover:text-foreground'>
          {t('blog.title', 'Blog')}
        </Link>
        {post.categories[0] ? (
          <>
            <ChevronRight className='size-3.5' aria-hidden='true' />
            <Link
              href={`${BLOG_CATEGORY_BASE}/${post.categories[0].slug}`}
              variant='unstyled'
              className='hover:text-foreground'
            >
              {post.categories[0].name}
            </Link>
          </>
        ) : null}
      </nav>

      {post.categories.length ? (
        <div className='mb-4 flex flex-wrap gap-2'>
          {post.categories.map((category) => (
            <Link key={category.slug} href={`${BLOG_CATEGORY_BASE}/${category.slug}`} variant='unstyled'>
              <Badge variant='secondary' className='rounded-full font-medium hover:bg-secondary/70'>
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>
      ) : null}

      <h1 className='text-3xl font-extrabold leading-tight tracking-tight text-balance text-foreground sm:text-4xl lg:text-[2.75rem]'>
        {frontmatter.title}
      </h1>

      {frontmatter.excerpt ? (
        <p className='mt-4 text-lg leading-relaxed text-muted-foreground text-pretty'>{frontmatter.excerpt}</p>
      ) : null}

      <div className='mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-border/60 py-4'>
        <AuthorByline
          authors={post.authors}
          meta={
            <>
              <time dateTime={frontmatter.publishedDate}>{formatDate(frontmatter.publishedDate, locale)}</time>
              {' · '}
              {t('blog.reading_time', '{{minutes}} min read', { minutes: post.readingMinutes })}
            </>
          }
        />
      </div>

      {frontmatter.coverImage ? (
        <figure className='mt-8'>
          <img
            src={frontmatter.coverImage}
            alt={frontmatter.coverAlt || frontmatter.title}
            className='image-outline aspect-[16/9] w-full rounded-2xl object-cover shadow-sm'
          />
        </figure>
      ) : null}
    </header>
  )
}
