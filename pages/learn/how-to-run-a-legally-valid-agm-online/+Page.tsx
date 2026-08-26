import { useTranslation } from 'react-i18next'

import { ArticlePage, type ArticleContent } from '@/components/learn/ArticlePage'

export default function Page() {
  const { t } = useTranslation()
  const content = t('learn.how_to_run_a_legally_valid_agm_online', { returnObjects: true }) as ArticleContent

  return <ArticlePage content={content} currentGuide='how_to_run_a_legally_valid_agm_online' />
}
