import { Link } from '@/components/Link'
import { BLOG_BASE, BLOG_CATEGORY_BASE, type CategoryWithCount } from '@/lib/blog/content'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface CategoryFilterProps {
  categories: CategoryWithCount[]
  activeCategory?: string
  className?: string
}

const pill = (active: boolean) =>
  cn(
    'inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
    active
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border/70 bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground'
  )

// Horizontal, scrollable category chips linking to real archive pages.
export function CategoryFilter({ categories, activeCategory, className }: CategoryFilterProps) {
  const { t } = useTranslation()
  if (!categories.length) return null

  return (
    <nav
      aria-label={t('blog.categories', 'Categories')}
      className={cn('flex flex-wrap items-center justify-center gap-2', className)}
    >
      <Link href={BLOG_BASE} variant='unstyled' className={pill(!activeCategory)}>
        {t('blog.all_posts', 'All posts')}
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`${BLOG_CATEGORY_BASE}/${category.slug}`}
          variant='unstyled'
          className={pill(activeCategory === category.slug)}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
