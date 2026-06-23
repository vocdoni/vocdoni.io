import { CardGrid, DocCard } from '@/components/developers/CardGrid'
import { DocArticle } from '@/components/developers/DocArticle'
import { Prose } from '@/components/developers/Prose'
import { DEVELOPERS_GITHUB_URL, DEVELOPERS_SDK_URL, DEVELOPERS_SWAGGER_URL } from '@/lib/developers'
import { BookOpen, Github, FileJson, Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='sdks_and_tools'
      title={t('developers.docs.sdks_and_tools.title', 'SDKs and tools')}
      lead={t(
        'developers.docs.sdks_and_tools.lead',
        'There are two ways to integrate Vocdoni: the REST API documented here, and the lower-level TypeScript SDK. Pick the one that matches how much control you need.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.sdks_and_tools.rest_title', 'When to use the REST API')}</h2>
        <p>
          {t(
            'developers.docs.sdks_and_tools.rest_body',
            'The SaaS REST API is the fastest path for most teams. It manages organizations, members, censuses, processes and results for you, handles the cryptography behind the scenes, and works from any language with an HTTP client. Use it when you want managed elections without operating protocol internals.'
          )}
        </p>

        <h2>{t('developers.docs.sdks_and_tools.sdk_title', 'When to use the SDK')}</h2>
        <p>
          {t(
            'developers.docs.sdks_and_tools.sdk_body',
            'The TypeScript SDK talks to the voting protocol more directly and is a good fit when you need fine-grained control over census and voting operations, or when you are building a custom voting client. It can be combined with the API where it makes sense.'
          )}
        </p>
      </Prose>

      <h2 className='mt-12 mb-4 text-2xl font-semibold tracking-tight'>
        {t('developers.docs.sdks_and_tools.refs_title', 'References and repositories')}
      </h2>
      <CardGrid columns={2}>
        <DocCard
          href='/developers/docs/api-reference'
          icon={BookOpen}
          title={t('developers.docs.sdks_and_tools.ref_api', 'API reference')}
          description={t(
            'developers.docs.sdks_and_tools.ref_api_desc',
            'Every endpoint, schema and field of the SaaS API.'
          )}
        />
        <DocCard
          href={DEVELOPERS_SDK_URL}
          external
          icon={Terminal}
          title={t('developers.docs.sdks_and_tools.ref_sdk', 'TypeScript SDK')}
          description={t('developers.docs.sdks_and_tools.ref_sdk_desc', 'Install the SDK and follow its guides.')}
        />
        <DocCard
          href={DEVELOPERS_SWAGGER_URL}
          external
          icon={FileJson}
          title={t('developers.docs.sdks_and_tools.ref_openapi', 'OpenAPI specification')}
          description={t(
            'developers.docs.sdks_and_tools.ref_openapi_desc',
            'The raw swagger spec to generate clients.'
          )}
        />
        <DocCard
          href={DEVELOPERS_GITHUB_URL}
          external
          icon={Github}
          title={t('developers.docs.sdks_and_tools.ref_github', 'GitHub')}
          description={t(
            'developers.docs.sdks_and_tools.ref_github_desc',
            'Open-source repositories, issues and examples.'
          )}
        />
      </CardGrid>
    </DocArticle>
  )
}
