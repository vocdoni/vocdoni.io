// https://vike.dev/Head
import { HeadTags } from '@/lib/seo-head'
import { usePageContext } from 'vike-react/usePageContext'
import type { PageContext } from 'vike/types'

export default function HeadDefault() {
  return (
    <>
      <meta name='build-commit' content={__COMMIT_SHA__} />
      <HeadTags {...(usePageContext() as PageContext)} />
    </>
  )
}
