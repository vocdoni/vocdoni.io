import { Link } from '@/components/Link'
import type { BlogPostMeta } from '@/lib/blog/content'
import { formatDate } from '@/lib/blog/format'
import { Newspaper } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface BlogSidebarProps {
  posts: BlogPostMeta[]
  locale: string
}

// Compact "latest posts" list shown beside the lead story on the blog index.
export function BlogSidebar({ posts, locale }: BlogSidebarProps) {
  const { t } = useTranslation()
  if (!posts.length) return null

  return (
    <aside className='rounded-3xl border border-border/60 bg-muted/20 p-6 sm:p-7'>
      <h2 className='mb-5 text-lg font-bold tracking-tight text-foreground'>
        {t('blog.latest_posts', 'Latest posts')}
      </h2>
      <ul className='divide-y divide-border/60'>
        {posts.map((post) => (
          <li key={post.slug} className='py-4 first:pt-0 last:pb-0'>
            <Link href={post.href} variant='unstyled' className='group flex items-start gap-4'>
              <div className='relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted'>
                {post.frontmatter.coverImage ? (
                  <img
                    src={post.frontmatter.coverImage}
                    alt={post.frontmatter.coverAlt || post.frontmatter.title}
                    loading='lazy'
                    className='image-outline size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                  />
                ) : (
                  <div className='flex size-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 text-primary/40'>
                    <Newspaper className='size-5' aria-hidden='true' />
                  </div>
                )}
              </div>
              <div className='min-w-0'>
                <h3 className='line-clamp-3 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary'>
                  {post.frontmatter.title}
                </h3>
                <time dateTime={post.frontmatter.publishedDate} className='mt-1 block text-xs text-muted-foreground'>
                  {formatDate(post.frontmatter.publishedDate, locale)}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
