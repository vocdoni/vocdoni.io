import { useTranslation } from 'react-i18next'

import { ArticlePage, type ArticleContent } from '@/components/learn/ArticlePage'

export default function Page() {
  const { t } = useTranslation()
  const content = t('learn.blockchain_voting_myths_vs_reality', { returnObjects: true }) as ArticleContent

  return <ArticlePage content={content} currentGuide='blockchain_voting_myths_vs_reality' />
}
