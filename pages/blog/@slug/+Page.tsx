import { AuthorBio } from '@/components/blog/AuthorBio'
import { BlogArticle } from '@/components/blog/BlogArticle'
import { BlogTOC } from '@/components/blog/BlogTOC'
import { PostHeader } from '@/components/blog/PostHeader'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { BLOG_BASE } from '@/lib/blog/content'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useData } from 'vike-react/useData'
import { usePageContext } from 'vike-react/usePageContext'
import type { BlogPostData } from './+data'

export default function BlogPostPage() {
  const { post, related } = useData<BlogPostData>()
  const { locale } = usePageContext() as { locale: string }
  const { t } = useTranslation()

  return (
    <>
      <div className='pt-8 lg:pt-12'>
        <Container className='max-w-6xl'>
          <div className='xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-12'>
            <div className='mx-auto w-full min-w-0 max-w-3xl'>
              <PostHeader post={post} locale={locale} />
              <div className='mt-10'>
                <BlogArticle html={post.html} />
              </div>

              <div className='mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6'>
                <Link
                  href={BLOG_BASE}
                  variant='unstyled'
                  className='inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground'
                >
                  <ArrowLeft className='size-4' />
                  {t('blog.back_to_blog', 'Back to blog')}
                </Link>
                <ShareButtons title={post.frontmatter.title} />
              </div>

              <AuthorBio authors={post.authors} />
            </div>

            <BlogTOC />
          </div>
        </Container>
      </div>

      <div className='mt-16'>
        <RelatedPosts posts={related} locale={locale} />
      </div>
    </>
  )
}
