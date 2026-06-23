import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { Link } from '@/components/Link'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const loginCode = `curl -X POST ${DEVELOPERS_API_BASE_URL}/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{ "email": "you@example.org", "password": "••••••••" }'

# Response (apicommon.LoginResponse)
# { "token": "eyJhbGciOi...", "expirity": "2026-06-24T10:00:00Z" }`

const bearerCode = `curl ${DEVELOPERS_API_BASE_URL}/organizations/$ORG \\
  -H "Authorization: Bearer eyJhbGciOi..."`

const refreshCode = `curl -X POST ${DEVELOPERS_API_BASE_URL}/auth/refresh \\
  -H "Authorization: Bearer $TOKEN"
# -> a fresh { "token", "expirity" } pair`

const oauthCode = `curl -X POST ${DEVELOPERS_API_BASE_URL}/oauth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "provider": "google",
    "email": "you@example.org",
    "oauthSignature": "...",
    "userOAuthSignature": "..."
  }'
# -> { "token", "expirity", "registered": true }`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='authentication'
      title={t('developers.docs.authentication.title', 'Authentication')}
      lead={t(
        'developers.docs.authentication.lead',
        'The Vocdoni API authenticates requests with a bearer token. You obtain a token by logging in with email and password or OAuth, or you issue a long-lived API key for server-to-server use.'
      )}
    >
      <Prose>
        <p>
          {t(
            'developers.docs.authentication.intro',
            'All authenticated endpoints expect an Authorization header. The security scheme is a standard HTTP bearer token in JWT format.'
          )}
        </p>

        <h2>{t('developers.docs.authentication.login_title', 'Logging in')}</h2>
        <p>
          {t(
            'developers.docs.authentication.login_body',
            'Exchange credentials for a token. The response contains the token and its expiry time.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/auth/login' />
      <PropertyTable
        rows={[
          {
            name: 'email',
            type: 'string',
            required: true,
            description: t('developers.docs.authentication.field_email', 'The account email address.'),
          },
          {
            name: 'password',
            type: 'string',
            required: true,
            description: t('developers.docs.authentication.field_password', 'The account password.'),
          },
        ]}
      />
      <CodeBlock samples={[{ label: 'cURL', code: loginCode }]} />

      <Prose>
        <h2>{t('developers.docs.authentication.use_title', 'Using the token')}</h2>
        <p>
          {t(
            'developers.docs.authentication.use_body',
            'Send the token as a bearer token on every request. Tokens are short lived, so treat them as session credentials rather than long-term secrets.'
          )}
        </p>
      </Prose>
      <CodeBlock samples={[{ label: 'cURL', code: bearerCode }]} />

      <Prose>
        <h2>{t('developers.docs.authentication.refresh_title', 'Refreshing a token')}</h2>
        <p>
          {t(
            'developers.docs.authentication.refresh_body',
            'Before a token expires, call refresh with the current token to receive a new one without asking the user to log in again.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/auth/refresh' />
      <CodeBlock samples={[{ label: 'cURL', code: refreshCode }]} />

      <Prose>
        <h2>{t('developers.docs.authentication.oauth_title', 'OAuth')}</h2>
        <p>
          {t(
            'developers.docs.authentication.oauth_body',
            'Users can also authenticate through Google, GitHub or Facebook. The login call returns a registered flag indicating whether a new account was created. You can link or unlink providers on an existing account.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/oauth/login' />
      <Endpoint method='POST' path='/auth/oauth/link' />
      <Endpoint method='DELETE' path='/auth/oauth/{provider}' />
      <CodeBlock samples={[{ label: 'cURL', code: oauthCode }]} />

      <Prose>
        <h2>{t('developers.docs.authentication.apikeys_title', 'API keys')}</h2>
        <p>
          {t(
            'developers.docs.authentication.apikeys_body',
            'For automated, server-to-server integrations, issue a scoped API key instead of logging in with a password. Keys are created per organization, carry a set of scopes and an optional expiry, and can be revoked at any time.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/organizations/{address}/apikeys' />
      <Callout variant='warning' title={t('developers.docs.authentication.secret_title', 'The secret is shown once')}>
        {t(
          'developers.docs.authentication.secret_body',
          'The full API key secret is returned only when you create it. Store it securely - it cannot be retrieved again, only revoked and replaced.'
        )}
      </Callout>
      <Prose>
        <p>
          {t('developers.docs.authentication.apikeys_more', 'See ')}
          <Link href='/developers/docs/api-keys'>{t('developers.docs.authentication.apikeys_link', 'API keys')}</Link>
          {t('developers.docs.authentication.apikeys_more_end', ' for the full lifecycle and best practices.')}
        </p>
      </Prose>
    </DocArticle>
  )
}
