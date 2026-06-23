import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const resultsCode = `curl "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/processes/$PROCESS/results" \\
  -H "Authorization: Bearer $TOKEN"

# Response (apicommon.ProcessResultsResponse)
# {
#   "status": "ENDED",
#   "voteCount": 128,
#   "results": [ ["54", "74"] ],
#   "startDate": "2026-07-01T09:00:00Z",
#   "endDate":   "2026-07-03T18:00:00Z",
#   "finalResults": true
# }`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='results'
      title={t('developers.docs.results.title', 'Results')}
      lead={t(
        'developers.docs.results.lead',
        'Read the tally for a voting process at any time. Results are computed from the protocol and can be independently verified, so you can show live counts and a trustworthy final outcome.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.results.read_title', 'Reading results')}</h2>
        <p>
          {t(
            'developers.docs.results.read_body',
            'Fetch results by organization and process id. The results field is an array per question, with one tally per choice in the order the choices were defined.'
          )}
        </p>
      </Prose>
      <Endpoint method='GET' path='/organizations/{address}/processes/{processId}/results' />
      <PropertyTable
        rows={[
          {
            name: 'status',
            type: 'string',
            description: t('developers.docs.results.f_status', 'Process state, for example READY, PAUSED or ENDED.'),
          },
          {
            name: 'voteCount',
            type: 'integer',
            description: t('developers.docs.results.f_votecount', 'Total number of votes cast so far.'),
          },
          {
            name: 'results',
            type: 'string[][]',
            description: t('developers.docs.results.f_results', 'Tallies per question, one entry per choice.'),
          },
          {
            name: 'startDate',
            type: 'string',
            description: t('developers.docs.results.f_startdate', 'When voting opened.'),
          },
          {
            name: 'endDate',
            type: 'string',
            description: t('developers.docs.results.f_enddate', 'When voting closed.'),
          },
          {
            name: 'finalResults',
            type: 'boolean',
            description: t('developers.docs.results.f_final', 'True once the process has ended and results are final.'),
          },
        ]}
      />
      <CodeBlock samples={[{ label: 'cURL', code: resultsCode }]} />

      <Callout variant='note' title={t('developers.docs.results.live_title', 'Live versus final results')}>
        {t(
          'developers.docs.results.live_body',
          'While a process is running, results reflect votes counted so far unless the election was configured to keep results secret until the end. Once the process ends, finalResults becomes true and the tally no longer changes.'
        )}
      </Callout>
    </DocArticle>
  )
}
