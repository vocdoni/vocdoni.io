import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const createCode = `curl -X POST ${DEVELOPERS_API_BASE_URL}/organizations \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "association",
    "size": "500",
    "country": "ES",
    "timezone": "Europe/Madrid",
    "website": "https://example.org"
  }'`

const inviteCode = `curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/users" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "email": "teammate@example.org", "role": "manager" }'`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='organizations'
      title={t('developers.docs.organizations.title', 'Organizations')}
      lead={t(
        'developers.docs.organizations.lead',
        'An organization is the account that owns members, censuses, processes and API keys. Almost every endpoint is scoped to an organization address.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.organizations.create_title', 'Creating an organization')}</h2>
        <p>
          {t(
            'developers.docs.organizations.create_body',
            'Create an organization with a few descriptive fields. The response returns the full organization, including the address you use to scope later requests.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/organizations' />
      <PropertyTable
        rows={[
          {
            name: 'type',
            type: 'string',
            description: t(
              'developers.docs.organizations.field_type',
              'Organization category, for example association or company.'
            ),
          },
          {
            name: 'size',
            type: 'string',
            description: t('developers.docs.organizations.field_size', 'Approximate membership size band.'),
          },
          {
            name: 'country',
            type: 'string',
            description: t('developers.docs.organizations.field_country', 'Country code for the organization.'),
          },
          {
            name: 'timezone',
            type: 'string',
            description: t(
              'developers.docs.organizations.field_timezone',
              'Default timezone used for election scheduling.'
            ),
          },
          {
            name: 'website',
            type: 'string',
            description: t('developers.docs.organizations.field_website', 'Public website URL.'),
          },
        ]}
      />
      <CodeBlock samples={[{ label: 'cURL', code: createCode }]} />

      <Prose>
        <h2>{t('developers.docs.organizations.read_title', 'Reading and updating')}</h2>
        <p>
          {t(
            'developers.docs.organizations.read_body',
            'Fetch or update an organization by its address. Updates accept the same fields as creation.'
          )}
        </p>
      </Prose>
      <Endpoint method='GET' path='/organizations/{address}' />
      <Endpoint method='PUT' path='/organizations/{address}' />

      <Prose>
        <h2>{t('developers.docs.organizations.users_title', 'Users and roles')}</h2>
        <p>
          {t(
            'developers.docs.organizations.users_body',
            'Organizations can have multiple users, each with a role. Invite teammates by email and assign the access level they need.'
          )}
        </p>
        <ul>
          <li>
            <code>admin</code>
            {t('developers.docs.organizations.role_admin', ' - full control, including billing, users and API keys.')}
          </li>
          <li>
            <code>manager</code>
            {t(
              'developers.docs.organizations.role_manager',
              ' - can create and run elections, but not manage the account.'
            )}
          </li>
          <li>
            <code>viewer</code>
            {t('developers.docs.organizations.role_viewer', ' - read-only access to organization data and results.')}
          </li>
        </ul>
      </Prose>
      <Endpoint method='GET' path='/organizations/{address}/users' />
      <Endpoint method='POST' path='/organizations/{address}/users' />
      <CodeBlock samples={[{ label: 'cURL', code: inviteCode }]} />

      <Callout variant='note' title={t('developers.docs.organizations.managed_title', 'Building for many customers?')}>
        {t(
          'developers.docs.organizations.managed_body',
          'Integrators can create sub-organizations on behalf of their own customers. See Managed organizations for the multi-tenant model.'
        )}
      </Callout>
    </DocArticle>
  )
}
