import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { Link } from '@/components/Link'
import { DEVELOPERS_API_BASE_URL, DEVELOPERS_SWAGGER_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const baseCode = `# Base URL
${DEVELOPERS_API_BASE_URL}

# Authenticated request
curl ${DEVELOPERS_API_BASE_URL}/organizations/$ORG \\
  -H "Authorization: Bearer $TOKEN"`

const errorCode = `{
  "code": 40001,
  "httpstatus": 400,
  "error": "invalid census id",
  "logLevel": "debug"
}`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='api_reference'
      title={t('developers.docs.api_reference.title', 'API reference')}
      lead={t(
        'developers.docs.api_reference.lead',
        'A map of the SaaS API: base URL, authentication, the conventions shared across endpoints, and every endpoint grouped by resource. For machine-readable detail, use the OpenAPI specification.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.api_reference.base_title', 'Base URL and authentication')}</h2>
        <p>
          {t(
            'developers.docs.api_reference.base_body',
            'All endpoints share one base URL. Authenticated endpoints expect an Authorization header with a bearer token in JWT format, obtained by logging in or from an API key.'
          )}
        </p>
      </Prose>
      <CodeBlock samples={[{ label: 'cURL', code: baseCode }]} />
      <Callout variant='note' title={t('developers.docs.api_reference.base_note_title', 'Confirm your base URL')}>
        {t(
          'developers.docs.api_reference.base_note_body',
          'Use the production host shown in your API Dashboard. The examples in these docs use a representative base URL.'
        )}
      </Callout>

      <Prose>
        <h2>{t('developers.docs.api_reference.pagination_title', 'Pagination')}</h2>
        <p>
          {t(
            'developers.docs.api_reference.pagination_body',
            'List endpoints accept page and limit query parameters and wrap results with a pagination object. Some lists also accept a search term or a type filter.'
          )}
        </p>
      </Prose>
      <PropertyTable
        rows={[
          {
            name: 'currentPage',
            type: 'integer',
            description: t('developers.docs.api_reference.p_current', 'The page you requested.'),
          },
          {
            name: 'nextPage',
            type: 'integer',
            description: t('developers.docs.api_reference.p_next', 'The next page, when there is one.'),
          },
          {
            name: 'lastPage',
            type: 'integer',
            description: t('developers.docs.api_reference.p_last', 'The final page available.'),
          },
          {
            name: 'totalItems',
            type: 'integer',
            description: t('developers.docs.api_reference.p_total', 'Total items across all pages.'),
          },
        ]}
      />

      <Prose>
        <h2>{t('developers.docs.api_reference.errors_title', 'Errors')}</h2>
        <p>
          {t(
            'developers.docs.api_reference.errors_body',
            'Errors return a consistent shape with an application code, the HTTP status and a message. Use httpstatus for control flow and code for precise handling.'
          )}
        </p>
      </Prose>
      <CodeBlock samples={[{ label: 'JSON', code: errorCode }]} />

      <Prose>
        <h2>{t('developers.docs.api_reference.endpoints_title', 'Endpoints by resource')}</h2>

        <h3>{t('developers.docs.api_reference.group_auth', 'Authentication')}</h3>
      </Prose>
      <Endpoint method='POST' path='/auth/login' />
      <Endpoint method='POST' path='/auth/refresh' />
      <Endpoint method='POST' path='/oauth/login' />
      <Endpoint method='POST' path='/auth/oauth/link' />
      <Endpoint method='DELETE' path='/auth/oauth/{provider}' />

      <Prose>
        <h3>{t('developers.docs.api_reference.group_orgs', 'Organizations')}</h3>
      </Prose>
      <Endpoint method='POST' path='/organizations' />
      <Endpoint method='GET' path='/organizations/{address}' />
      <Endpoint method='PUT' path='/organizations/{address}' />
      <Endpoint method='GET' path='/organizations/{address}/users' />
      <Endpoint method='POST' path='/organizations/{address}/users' />
      <Endpoint method='GET' path='/organizations/{address}/subscription' />

      <Prose>
        <h3>{t('developers.docs.api_reference.group_members', 'Members and groups')}</h3>
      </Prose>
      <Endpoint method='GET' path='/organizations/{address}/members' />
      <Endpoint method='POST' path='/organizations/{address}/members' />
      <Endpoint method='PUT' path='/organizations/{address}/members' />
      <Endpoint method='DELETE' path='/organizations/{address}/member' />
      <Endpoint method='GET' path='/organizations/{address}/groups' />
      <Endpoint method='POST' path='/organizations/{address}/groups' />
      <Endpoint method='POST' path='/organizations/{address}/groups/{groupID}/validate' />

      <Prose>
        <h3>{t('developers.docs.api_reference.group_census', 'Census')}</h3>
      </Prose>
      <Endpoint method='POST' path='/census' />
      <Endpoint method='GET' path='/census/{id}' />
      <Endpoint method='POST' path='/census/{id}' />
      <Endpoint method='POST' path='/census/{id}/publish' />
      <Endpoint method='POST' path='/census/{id}/group/{groupid}/publish' />

      <Prose>
        <h3>{t('developers.docs.api_reference.group_processes', 'Processes and results')}</h3>
      </Prose>
      <Endpoint method='POST' path='/organizations/{address}/processes' />
      <Endpoint method='GET' path='/organizations/{address}/processes' />
      <Endpoint method='POST' path='/organizations/{address}/processes/bundle' />
      <Endpoint method='POST' path='/organizations/{address}/processes/{processId}/status' />
      <Endpoint method='GET' path='/organizations/{address}/processes/{processId}/results' />

      <Prose>
        <h3>{t('developers.docs.api_reference.group_jobs', 'Jobs and integrator')}</h3>
      </Prose>
      <Endpoint method='GET' path='/jobs/{jobId}' />
      <Endpoint method='GET' path='/organizations/{address}/jobs' />
      <Endpoint method='GET' path='/organizations/{address}/apikeys' />
      <Endpoint method='POST' path='/organizations/{address}/apikeys' />
      <Endpoint method='DELETE' path='/organizations/{address}/apikeys/{keyID}' />
      <Endpoint method='GET' path='/organizations/{address}/managed' />
      <Endpoint method='POST' path='/organizations/{address}/managed' />
      <Endpoint method='GET' path='/organizations/{address}/integrator' />

      <Prose>
        <p>
          {t('developers.docs.api_reference.openapi_pre', 'For the complete, machine-readable contract, see the ')}
          <Link href={DEVELOPERS_SWAGGER_URL}>
            {t('developers.docs.api_reference.openapi_link', 'OpenAPI specification')}
          </Link>
          {t('developers.docs.api_reference.openapi_post', '.')}
        </p>
      </Prose>
    </DocArticle>
  )
}
