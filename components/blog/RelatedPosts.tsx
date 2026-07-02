import { BlogCard } from '@/components/blog/BlogCard'
import { Container } from '@/components/Container'
import type { BlogPostMeta } from '@/lib/blog/content'
import { useTranslation } from 'react-i18next'

interface RelatedPostsProps {
  posts: BlogPostMeta[]
  locale: string
}

export function RelatedPosts({ posts, locale }: RelatedPostsProps) {
  const { t } = useTranslation()
  if (!posts.length) return null

  return (
    <section className='border-t border-border/60 bg-muted/20 py-16'>
      <Container className='max-w-6xl'>
        <h2 className='mb-8 text-2xl font-bold tracking-tight text-foreground'>
          {t('blog.related_posts', 'Related posts')}
        </h2>
        <div className='grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </Container>
    </section>
  )
}
