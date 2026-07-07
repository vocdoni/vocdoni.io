import { BlogCard } from '@/components/blog/BlogCard'
import { BlogHero } from '@/components/blog/BlogHero'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { Container } from '@/components/Container'
import { MotionPreset } from '@/components/ui/motion-preset'
import { useTranslation } from 'react-i18next'
import { useData } from 'vike-react/useData'
import { usePageContext } from 'vike-react/usePageContext'
import type { BlogCategoryData } from './+data'

export default function BlogCategoryPage() {
  const { category, posts, categories } = useData<BlogCategoryData>()
  const { locale } = usePageContext() as { locale: string }
  const { t } = useTranslation()

  return (
    <div className='pb-24'>
      <BlogHero eyebrow={t('blog.eyebrow', 'Vocdoni blog')} title={category.name} />

      <Container className='mt-10 max-w-6xl'>
        <CategoryFilter categories={categories} activeCategory={category.slug} />

        <h2 className='sr-only'>{t('blog.all_posts', 'All posts')}</h2>
        <div className='mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
          {posts.map((post, index) => (
            <MotionPreset key={post.slug} fade slide={{ direction: 'up', offset: 24 }} delay={index * 0.03}>
              <BlogCard post={post} locale={locale} />
            </MotionPreset>
          ))}
        </div>
      </Container>
    </div>
  )
}
