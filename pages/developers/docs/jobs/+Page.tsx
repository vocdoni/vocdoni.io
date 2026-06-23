import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const pollCode = `curl "${DEVELOPERS_API_BASE_URL}/jobs/$JOB_ID" \\
  -H "Authorization: Bearer $TOKEN"

# Pending
# { "jobId": "a1b2c3", "type": "publish_process", "status": "pending" }

# Completed
# { "jobId": "a1b2c3", "type": "publish_process", "status": "completed",
#   "result": { "address": "0xprocess...", "status": "READY" } }

# Failed
# { "jobId": "a1b2c3", "type": "publish_process", "status": "failed", "error": "..." }`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='jobs'
      title={t('developers.docs.jobs.title', 'Jobs and async operations')}
      lead={t(
        'developers.docs.jobs.lead',
        'Some operations take longer than a single request should wait - bulk imports, census publishing, process publishing and status changes. These return a job id you poll until the work finishes.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.jobs.pattern_title', 'The async pattern')}</h2>
        <p>
          {t(
            'developers.docs.jobs.pattern_body',
            'When an endpoint runs asynchronously it responds immediately with a job id. Poll the job until its status is completed or failed, then read the result. Keep polling intervals reasonable - a few seconds is usually enough.'
          )}
        </p>
      </Prose>
      <Endpoint method='GET' path='/jobs/{jobId}' />
      <PropertyTable
        rows={[
          {
            name: 'jobId',
            type: 'string',
            description: t('developers.docs.jobs.f_jobid', 'Identifier returned when the work was enqueued.'),
          },
          {
            name: 'type',
            type: 'string',
            description: t('developers.docs.jobs.f_type', 'What kind of work the job performs.'),
          },
          {
            name: 'status',
            type: 'string',
            description: t('developers.docs.jobs.f_status', 'pending, completed or failed.'),
          },
          {
            name: 'result',
            type: 'object',
            description: t('developers.docs.jobs.f_result', 'On success, details such as an address or vote id.'),
          },
          {
            name: 'error',
            type: 'string',
            description: t('developers.docs.jobs.f_error', 'On failure, a human-readable reason.'),
          },
        ]}
      />
      <CodeBlock samples={[{ label: 'cURL', code: pollCode }]} />

      <Prose>
        <h2>{t('developers.docs.jobs.types_title', 'Job types')}</h2>
        <ul>
          <li>
            <code>org_members</code>
            {t('developers.docs.jobs.type_members', ' - bulk member import.')}
          </li>
          <li>
            <code>census_participants</code>
            {t('developers.docs.jobs.type_census', ' - adding participants to a census.')}
          </li>
          <li>
            <code>publish_process</code>
            {t('developers.docs.jobs.type_publish', ' - publishing a voting process.')}
          </li>
          <li>
            <code>set_process_status</code>
            {t('developers.docs.jobs.type_status', ' - changing a process status.')}
          </li>
          <li>
            <code>relay_vote</code>
            {t('developers.docs.jobs.type_relay', ' - relaying a vote to the protocol.')}
          </li>
        </ul>

        <h2>{t('developers.docs.jobs.list_title', 'Listing jobs')}</h2>
        <p>
          {t(
            'developers.docs.jobs.list_body',
            "You can list an organization's jobs with pagination and an optional type filter to monitor recent imports and batch operations."
          )}
        </p>
      </Prose>
      <Endpoint method='GET' path='/organizations/{address}/jobs' />

      <Callout variant='warning' title={t('developers.docs.jobs.expiry_title', 'Jobs expire')}>
        {t(
          'developers.docs.jobs.expiry_body',
          'Member import jobs are cleared shortly after they complete. Read the final state promptly rather than relying on the job being available indefinitely.'
        )}
      </Callout>
    </DocArticle>
  )
}
