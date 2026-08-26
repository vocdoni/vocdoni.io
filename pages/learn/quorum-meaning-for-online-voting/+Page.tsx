import { useTranslation } from 'react-i18next'

import { ArticlePage, type ArticleContent } from '@/components/learn/ArticlePage'

export default function Page() {
  const { t } = useTranslation()
  const content = t('learn.quorum_meaning_for_online_voting', { returnObjects: true }) as ArticleContent

  return (
    <ArticlePage content={content} currentGuide='quorum_meaning_for_online_voting' ctaHref='/solutions/associations' />
  )
}
