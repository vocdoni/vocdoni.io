import { BlogCard } from '@/components/blog/BlogCard'
import { BlogHero } from '@/components/blog/BlogHero'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { FeaturedPost } from '@/components/blog/FeaturedPost'
import { Container } from '@/components/Container'
import { MotionPreset } from '@/components/ui/motion-preset'
import { useTranslation } from 'react-i18next'
import { useData } from 'vike-react/useData'
import { usePageContext } from 'vike-react/usePageContext'
import type { BlogIndexData } from './+data'

export default function BlogIndexPage() {
  const { featured, posts, categories } = useData<BlogIndexData>()
  const { locale } = usePageContext() as { locale: string }
  const { t } = useTranslation()

  return (
    <div className='pb-24'>
      <BlogHero
        eyebrow={t('blog.eyebrow', 'Vocdoni blog')}
        title={t('blog.index.title', 'Insights on secure digital voting')}
        subtitle={t(
          'blog.index.subtitle',
          'Product updates, engineering deep-dives and stories from organizations running verifiable elections with Vocdoni.'
        )}
      />

      <Container className='mt-10 max-w-6xl'>
        <CategoryFilter categories={categories} />

        {featured ? (
          <MotionPreset fade slide={{ direction: 'up', offset: 24 }} className='mt-10'>
            <FeaturedPost post={featured} locale={locale} />
          </MotionPreset>
        ) : null}

        {posts.length ? (
          <div className='mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post, index) => (
              <MotionPreset key={post.slug} fade slide={{ direction: 'up', offset: 24 }} delay={index * 0.03}>
                <BlogCard post={post} locale={locale} />
              </MotionPreset>
            ))}
          </div>
        ) : (
          <p className='mt-16 text-center text-muted-foreground'>{t('blog.empty', 'No posts yet. Check back soon.')}</p>
        )}
      </Container>
    </div>
  )
}
