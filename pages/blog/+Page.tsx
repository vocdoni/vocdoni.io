import { BlogCard } from '@/components/blog/BlogCard'
import { BlogHero } from '@/components/blog/BlogHero'
import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { FeaturedHero } from '@/components/blog/FeaturedHero'
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

  // Lead story + "latest posts" rail on top, the rest in the grid below.
  const sidebarPosts = posts.slice(0, 4)
  const gridPosts = posts.slice(4)

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
          <div className='mt-10 grid items-start gap-8 lg:grid-cols-3 lg:gap-10'>
            <MotionPreset fade slide={{ direction: 'up', offset: 24 }} className='lg:col-span-2'>
              <FeaturedHero post={featured} locale={locale} />
            </MotionPreset>
            {sidebarPosts.length ? (
              <MotionPreset fade slide={{ direction: 'up', offset: 24 }} delay={0.05}>
                <BlogSidebar posts={sidebarPosts} locale={locale} />
              </MotionPreset>
            ) : null}
          </div>
        ) : null}

        {gridPosts.length ? (
          <div className='mt-16 border-t border-border/60 pt-12'>
            <div className='grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
              {gridPosts.map((post, index) => (
                <MotionPreset key={post.slug} fade slide={{ direction: 'up', offset: 24 }} delay={index * 0.03}>
                  <BlogCard post={post} locale={locale} />
                </MotionPreset>
              ))}
            </div>
          </div>
        ) : null}

        {!featured && !gridPosts.length ? (
          <p className='mt-16 text-center text-muted-foreground'>{t('blog.empty', 'No posts yet. Check back soon.')}</p>
        ) : null}
      </Container>
    </div>
  )
}
