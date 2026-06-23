import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const createCode = `curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/managed" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "ownerEmail": "customer@example.org",
    "type": "association",
    "size": "200",
    "country": "FR"
  }'
# -> the new managed OrganizationInfo, with its own address`

const integratorCode = `curl "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/integrator" \\
  -H "Authorization: Bearer $TOKEN"
# -> { "enabled": true, "limits": { ... }, "usage": { ... } }`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='managed_organizations'
      title={t('developers.docs.managed_organizations.title', 'Managed organizations')}
      lead={t(
        'developers.docs.managed_organizations.lead',
        'As an integrator you can provision sub-organizations on behalf of your own customers, each isolated with its own address, members and elections, all under your integrator account.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.managed_organizations.model_title', 'The multi-tenant model')}</h2>
        <p>
          {t(
            'developers.docs.managed_organizations.model_body',
            'Your integrator organization is the parent. Each managed organization you create is a separate tenant whose data never mixes with another. You drive everything through your own credentials, so your customers do not need Vocdoni accounts.'
          )}
        </p>

        <h2>{t('developers.docs.managed_organizations.create_title', 'Creating a managed organization')}</h2>
        <p>
          {t(
            'developers.docs.managed_organizations.create_body',
            'Create a managed organization under your integrator address. Provide the owner email and the same descriptive fields as a normal organization. The response is the new organization, including the address you use to run its elections.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/organizations/{address}/managed' />
      <Endpoint method='GET' path='/organizations/{address}/managed' />
      <PropertyTable
        rows={[
          {
            name: 'ownerEmail',
            type: 'string',
            description: t(
              'developers.docs.managed_organizations.f_owneremail',
              'Email of the customer who owns the managed organization.'
            ),
          },
          {
            name: 'type',
            type: 'string',
            description: t('developers.docs.managed_organizations.f_type', 'Organization category.'),
          },
          {
            name: 'size',
            type: 'string',
            description: t('developers.docs.managed_organizations.f_size', 'Approximate membership size band.'),
          },
          {
            name: 'country',
            type: 'string',
            description: t('developers.docs.managed_organizations.f_country', 'Country code.'),
          },
        ]}
      />
      <CodeBlock samples={[{ label: 'cURL', code: createCode }]} />

      <Prose>
        <h2>{t('developers.docs.managed_organizations.quota_title', 'Quota and usage')}</h2>
        <p>
          {t(
            'developers.docs.managed_organizations.quota_body',
            'Check whether your integrator features are enabled and how much of your quota you have used. Limits cover the number of managed organizations, processes and census size.'
          )}
        </p>
      </Prose>
      <Endpoint method='GET' path='/organizations/{address}/integrator' />
      <PropertyTable
        rows={[
          {
            name: 'maxManagedOrgs',
            type: 'integer',
            description: t(
              'developers.docs.managed_organizations.l_orgs',
              'Maximum managed organizations you can create.'
            ),
          },
          {
            name: 'maxManagedProcesses',
            type: 'integer',
            description: t(
              'developers.docs.managed_organizations.l_processes',
              'Maximum processes across managed organizations.'
            ),
          },
          {
            name: 'maxManagedCensusSize',
            type: 'integer',
            description: t(
              'developers.docs.managed_organizations.l_census',
              'Maximum census size per managed organization.'
            ),
          },
        ]}
      />
      <CodeBlock samples={[{ label: 'cURL', code: integratorCode }]} />

      <Callout
        variant='note'
        title={t('developers.docs.managed_organizations.enable_title', 'Enabling integrator access')}
      >
        {t(
          'developers.docs.managed_organizations.enable_body',
          'Integrator features are enabled per account. If the enabled flag is false, contact us through the API Dashboard to turn on managed organizations for your plan.'
        )}
      </Callout>
    </DocArticle>
  )
}
