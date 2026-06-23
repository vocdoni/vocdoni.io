import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const createCode = `curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/processes" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "censusId": "$CENSUS_ID",
    "electionParams": {
      "title":       { "default": "Board election 2026" },
      "description": { "default": "Elect the new board" },
      "startDate":   "2026-07-01T09:00:00Z",
      "endDate":     "2026-07-03T18:00:00Z",
      "electionType": { "anonymous": true, "autostart": true, "interruptible": true },
      "voteType":     { "maxCount": 1, "maxValue": 1, "uniqueChoices": true },
      "questions": [{
        "title": { "default": "Who should chair the board?" },
        "choices": [
          { "title": { "default": "Ada Lovelace" }, "value": 0 },
          { "title": { "default": "Alan Turing" },  "value": 1 }
        ]
      }]
    }
  }'
# -> { "address": "0xprocess...", "status": "READY" }`

const statusCode = `curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/processes/$PROCESS/status" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "status": "paused" }'
# -> { "jobId": "a1b2c3" }  (poll /jobs/{jobId})`

const bundleCode = `curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/processes/bundle" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "censusId": "$CENSUS_ID", "processes": ["0xprocessA", "0xprocessB"] }'
# -> { "uri": "...", "root": "deadbeef..." }`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='voting_processes'
      title={t('developers.docs.voting_processes.title', 'Voting processes')}
      lead={t(
        'developers.docs.voting_processes.lead',
        'A process is an election: a set of questions run against a published census, with rules for how votes are cast and when voting opens and closes.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.voting_processes.create_title', 'Creating a process')}</h2>
        <p>
          {t(
            'developers.docs.voting_processes.create_body',
            'Bind a process to a published census and describe it with election parameters. Titles and descriptions are multilingual objects keyed by language, with a default value.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/organizations/{address}/processes' />

      <Prose>
        <h3>{t('developers.docs.voting_processes.params_title', 'Election parameters')}</h3>
      </Prose>
      <PropertyTable
        rows={[
          {
            name: 'title',
            type: 'multilang',
            description: t(
              'developers.docs.voting_processes.f_title',
              'Election title, keyed by language with a default.'
            ),
          },
          {
            name: 'description',
            type: 'multilang',
            description: t('developers.docs.voting_processes.f_description', 'Longer description of the election.'),
          },
          {
            name: 'startDate',
            type: 'string',
            description: t('developers.docs.voting_processes.f_startdate', 'When voting opens (ISO 8601).'),
          },
          {
            name: 'endDate',
            type: 'string',
            description: t('developers.docs.voting_processes.f_enddate', 'When voting closes (ISO 8601).'),
          },
          {
            name: 'electionType',
            type: 'object',
            description: t(
              'developers.docs.voting_processes.f_electiontype',
              'Behaviour flags such as anonymous and autostart.'
            ),
          },
          {
            name: 'voteType',
            type: 'object',
            description: t(
              'developers.docs.voting_processes.f_votetype',
              'Ballot rules such as how many choices a voter may select.'
            ),
          },
          {
            name: 'questions',
            type: 'array',
            description: t(
              'developers.docs.voting_processes.f_questions',
              'One or more questions, each with a list of choices.'
            ),
          },
          {
            name: 'streamUri',
            type: 'string',
            description: t(
              'developers.docs.voting_processes.f_streamuri',
              'Optional live stream URL shown with the election.'
            ),
          },
        ]}
      />

      <Prose>
        <h3>{t('developers.docs.voting_processes.electiontype_title', 'Election type flags')}</h3>
        <ul>
          <li>
            <code>anonymous</code>
            {t('developers.docs.voting_processes.et_anonymous', ' - hide who voted using zero-knowledge proofs.')}
          </li>
          <li>
            <code>autostart</code>
            {t('developers.docs.voting_processes.et_autostart', ' - open voting automatically at the start date.')}
          </li>
          <li>
            <code>interruptible</code>
            {t('developers.docs.voting_processes.et_interruptible', ' - allow pausing or ending the process early.')}
          </li>
          <li>
            <code>dynamicCensus</code>
            {t(
              'developers.docs.voting_processes.et_dynamic',
              ' - allow the census to change after the process starts.'
            )}
          </li>
          <li>
            <code>secretUntilTheEnd</code>
            {t('developers.docs.voting_processes.et_secret', ' - keep results hidden until voting closes.')}
          </li>
        </ul>

        <h3>{t('developers.docs.voting_processes.votetype_title', 'Vote type')}</h3>
        <p>
          {t(
            'developers.docs.voting_processes.votetype_body',
            'The vote type shapes the ballot. Combine these fields to express single choice, multiple choice, ranked or weighted voting.'
          )}
        </p>
      </Prose>
      <PropertyTable
        rows={[
          {
            name: 'maxCount',
            type: 'integer',
            description: t('developers.docs.voting_processes.vt_maxcount', 'How many choices a voter may select.'),
          },
          {
            name: 'maxValue',
            type: 'integer',
            description: t('developers.docs.voting_processes.vt_maxvalue', 'Maximum value allowed per choice.'),
          },
          {
            name: 'uniqueChoices',
            type: 'boolean',
            description: t(
              'developers.docs.voting_processes.vt_unique',
              'Require every selected choice to be distinct.'
            ),
          },
          {
            name: 'costExponent',
            type: 'integer',
            description: t('developers.docs.voting_processes.vt_cost', 'Cost curve for quadratic-style voting.'),
          },
          {
            name: 'costFromWeight',
            type: 'boolean',
            description: t(
              'developers.docs.voting_processes.vt_costweight',
              'Derive vote credits from the voter weight.'
            ),
          },
          {
            name: 'maxVoteOverwrites',
            type: 'integer',
            description: t(
              'developers.docs.voting_processes.vt_overwrite',
              'How many times a voter may change their vote.'
            ),
          },
        ]}
      />
      <CodeBlock samples={[{ label: 'cURL', code: createCode }]} />

      <Prose>
        <h2>{t('developers.docs.voting_processes.status_title', 'Changing status')}</h2>
        <p>
          {t(
            'developers.docs.voting_processes.status_body',
            'Move a process between states - ready, paused, ended or canceled. Status changes run asynchronously and return a job id to poll.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/organizations/{address}/processes/{processId}/status' />
      <CodeBlock samples={[{ label: 'cURL', code: statusCode }]} />

      <Prose>
        <h2>{t('developers.docs.voting_processes.bundles_title', 'Process bundles')}</h2>
        <p>
          {t(
            'developers.docs.voting_processes.bundles_body',
            'A bundle groups several processes under one census so a voter can complete them together - useful when an assembly votes on multiple motions in a single session.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/organizations/{address}/processes/bundle' />
      <Endpoint method='GET' path='/organizations/{address}/processes' />
      <CodeBlock samples={[{ label: 'cURL', code: bundleCode }]} />

      <Callout variant='tip' title={t('developers.docs.voting_processes.results_title', 'Reading results')}>
        {t(
          'developers.docs.voting_processes.results_body',
          'Once a process is running you can read live or final tallies. See Results for the response shape and how finality works.'
        )}
      </Callout>
    </DocArticle>
  )
}
