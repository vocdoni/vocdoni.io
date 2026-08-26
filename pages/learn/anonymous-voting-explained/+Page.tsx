import { useTranslation } from 'react-i18next'

import { ArticlePage, type ArticleContent } from '@/components/learn/ArticlePage'

export default function Page() {
  const { t } = useTranslation()
  const content = t('learn.anonymous_voting_explained', { returnObjects: true }) as ArticleContent

  return <ArticlePage content={content} currentGuide='anonymous_voting_explained' />
}
