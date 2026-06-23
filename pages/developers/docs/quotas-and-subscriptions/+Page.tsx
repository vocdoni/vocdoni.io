import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const code = `curl "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/subscription" \\
  -H "Authorization: Bearer $TOKEN"
# -> { "plan": { ... }, "subscriptionDetails": { ... }, "usage": { ... } }`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='quotas_and_subscriptions'
      title={t('developers.docs.quotas_and_subscriptions.title', 'Quotas and subscriptions')}
      lead={t(
        'developers.docs.quotas_and_subscriptions.lead',
        'Each organization has a subscription that sets which features are available and how much it can use. Read it to adapt your integration and to show plan limits to your users.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.quotas_and_subscriptions.read_title', 'Reading the subscription')}</h2>
        <p>
          {t(
            'developers.docs.quotas_and_subscriptions.read_body',
            'Fetch the subscription for an organization to get its plan, the current details, and usage counters such as processes run and members imported.'
          )}
        </p>
      </Prose>
      <Endpoint method='GET' path='/organizations/{address}/subscription' />
      <CodeBlock samples={[{ label: 'cURL', code }]} />

      <Prose>
        <h2>{t('developers.docs.quotas_and_subscriptions.features_title', 'Plan features')}</h2>
        <p>
          {t(
            'developers.docs.quotas_and_subscriptions.features_body',
            'Features describe what a plan unlocks. Check them before offering an option in your UI - for example, only show anonymous voting if the plan allows it.'
          )}
        </p>
      </Prose>
      <PropertyTable
        rows={[
          {
            name: 'anonymous',
            type: 'boolean',
            description: t(
              'developers.docs.quotas_and_subscriptions.f_anonymous',
              'Anonymous voting with zero-knowledge proofs.'
            ),
          },
          {
            name: 'liveResults',
            type: 'boolean',
            description: t(
              'developers.docs.quotas_and_subscriptions.f_live',
              'Live results while a process is running.'
            ),
          },
          {
            name: 'whiteLabel',
            type: 'boolean',
            description: t(
              'developers.docs.quotas_and_subscriptions.f_whitelabel',
              'White-label branding for the voting experience.'
            ),
          },
          {
            name: 'overwrite',
            type: 'boolean',
            description: t(
              'developers.docs.quotas_and_subscriptions.f_overwrite',
              'Allow voters to change their vote.'
            ),
          },
          {
            name: '2FAemail',
            type: 'integer',
            description: t(
              'developers.docs.quotas_and_subscriptions.f_2faemail',
              'Quota of email second-factor messages.'
            ),
          },
          {
            name: '2FAsms',
            type: 'integer',
            description: t('developers.docs.quotas_and_subscriptions.f_2fasms', 'Quota of SMS second-factor messages.'),
          },
        ]}
      />

      <Prose>
        <h2>{t('developers.docs.quotas_and_subscriptions.details_title', 'Subscription details')}</h2>
        <p>
          {t(
            'developers.docs.quotas_and_subscriptions.details_body',
            'The details object reports whether the subscription is active, the plan id, the maximum census size and key dates such as start and renewal.'
          )}
        </p>
      </Prose>
      <PropertyTable
        rows={[
          {
            name: 'active',
            type: 'boolean',
            description: t(
              'developers.docs.quotas_and_subscriptions.d_active',
              'Whether the subscription is currently active.'
            ),
          },
          {
            name: 'planId',
            type: 'integer',
            description: t('developers.docs.quotas_and_subscriptions.d_planid', 'The plan the organization is on.'),
          },
          {
            name: 'maxCensusSize',
            type: 'integer',
            description: t('developers.docs.quotas_and_subscriptions.d_maxcensus', 'Largest census the plan permits.'),
          },
          {
            name: 'renewalDate',
            type: 'string',
            description: t('developers.docs.quotas_and_subscriptions.d_renewal', 'When the subscription next renews.'),
          },
        ]}
      />
    </DocArticle>
  )
}
