import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const createCode = `curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/apikeys" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "label": "CI server", "scopes": ["processes", "census"], "expiresAt": "2027-01-01T00:00:00Z" }'

# Response (apicommon.CreateAPIKeyResponse) - the secret is shown only here
# { "id": "key_123", "prefix": "vk_live_ab12", "secret": "vk_live_ab12....", "scopes": ["processes","census"], "revoked": false }`

const useCode = `curl "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/processes" \\
  -H "Authorization: Bearer vk_live_ab12...."`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='api_keys'
      title={t('developers.docs.api_keys.title', 'API keys')}
      lead={t(
        'developers.docs.api_keys.lead',
        'API keys let your backend authenticate without a password. Each key belongs to an organization, carries a set of scopes and an optional expiry, and can be revoked at any time.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.api_keys.create_title', 'Creating a key')}</h2>
        <p>
          {t(
            'developers.docs.api_keys.create_body',
            'Create a key with a descriptive label and the scopes it needs. The full secret is returned only in this response - store it immediately in your secret manager.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/organizations/{address}/apikeys' />
      <PropertyTable
        rows={[
          {
            name: 'label',
            type: 'string',
            required: true,
            description: t('developers.docs.api_keys.f_label', 'A human-readable name to recognise the key later.'),
          },
          {
            name: 'scopes',
            type: 'string[]',
            required: true,
            description: t(
              'developers.docs.api_keys.f_scopes',
              'The permissions the key grants. Request only what you need.'
            ),
          },
          {
            name: 'expiresAt',
            type: 'string',
            description: t(
              'developers.docs.api_keys.f_expires',
              'Optional expiry timestamp; omit for a non-expiring key.'
            ),
          },
        ]}
      />
      <CodeBlock samples={[{ label: 'cURL', code: createCode }]} />

      <Callout variant='warning' title={t('developers.docs.api_keys.secret_title', 'Store the secret now')}>
        {t(
          'developers.docs.api_keys.secret_body',
          'The secret cannot be retrieved after creation. If you lose it, revoke the key and create a new one. Only the key metadata - id, prefix, scopes and timestamps - is available afterwards.'
        )}
      </Callout>

      <Prose>
        <h2>{t('developers.docs.api_keys.use_title', 'Using a key')}</h2>
        <p>
          {t(
            'developers.docs.api_keys.use_body',
            'Send the key as a bearer token, exactly like a login token. The prefix is safe to log for identification; the full secret is not.'
          )}
        </p>
      </Prose>
      <CodeBlock samples={[{ label: 'cURL', code: useCode }]} />

      <Prose>
        <h2>{t('developers.docs.api_keys.manage_title', 'Listing and revoking')}</h2>
        <p>
          {t(
            'developers.docs.api_keys.manage_body',
            'List the keys for an organization to review their scopes and last use, and revoke any key immediately when it is no longer needed or may be compromised.'
          )}
        </p>
      </Prose>
      <Endpoint method='GET' path='/organizations/{address}/apikeys' />
      <Endpoint method='DELETE' path='/organizations/{address}/apikeys/{keyID}' />

      <Callout variant='tip' title={t('developers.docs.api_keys.scopes_title', 'About scopes')}>
        {t(
          'developers.docs.api_keys.scopes_body',
          'Scopes restrict what a key can do. Grant the minimum a workload needs, use separate keys per environment, and rotate them periodically. The scopes available to you are shown in the API Dashboard when you create a key.'
        )}
      </Callout>
    </DocArticle>
  )
}
