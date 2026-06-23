import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Prose } from '@/components/developers/Prose'
import { Step, Steps } from '@/components/developers/Steps'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const loginCode = `curl -X POST ${DEVELOPERS_API_BASE_URL}/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{ "email": "you@example.org", "password": "••••••••" }'

# Response
# { "token": "eyJhbGciOi...", "expirity": "2026-06-24T10:00:00Z" }`

const orgCode = `curl -X POST ${DEVELOPERS_API_BASE_URL}/organizations \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "type": "association", "size": "100", "country": "ES" }'`

const membersCode = `curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/members" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "members": [
      { "memberNumber": "0001", "name": "Ada",  "surname": "Lovelace", "email": "ada@example.org" },
      { "memberNumber": "0002", "name": "Alan", "surname": "Turing",   "email": "alan@example.org" }
    ]
  }'`

const censusCode = `# 1. Create a census for the organization
curl -X POST ${DEVELOPERS_API_BASE_URL}/census \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "orgAddress": "$ORG", "authFields": ["memberNumber"], "twoFaFields": ["email"] }'
# -> { "id": "$CENSUS_ID" }

# 2. Add organization members to the census
curl -X POST "${DEVELOPERS_API_BASE_URL}/census/$CENSUS_ID" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "memberIds": ["<memberId1>", "<memberId2>"] }'

# 3. Publish the census to lock it for voting
curl -X POST "${DEVELOPERS_API_BASE_URL}/census/$CENSUS_ID/publish" \\
  -H "Authorization: Bearer $TOKEN"
# -> { "uri": "...", "root": "deadbeef...", "size": 2 }`

const processCode = `curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/processes" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "censusId": "$CENSUS_ID",
    "electionParams": {
      "title": { "default": "Board election 2026" },
      "startDate": "2026-07-01T09:00:00Z",
      "endDate":   "2026-07-03T18:00:00Z",
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

const resultsCode = `curl "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/processes/$PROCESS/results" \\
  -H "Authorization: Bearer $TOKEN"
# -> { "status": "ENDED", "voteCount": 2, "results": [["1","1"]], "finalResults": true }`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='quickstart'
      title={t('developers.docs.quickstart.title', 'Quickstart')}
      lead={t(
        'developers.docs.quickstart.lead',
        'Run a full election end to end - authenticate, build a census, create a voting process and read the results. The examples use cURL; any HTTP client works the same way.'
      )}
    >
      <Prose>
        <p>
          {t(
            'developers.docs.quickstart.intro',
            'You will need an integrator account and an organization. Every request below is authenticated with a bearer token obtained in step one. Replace the placeholders ($ORG, $CENSUS_ID, $PROCESS) with the values returned along the way.'
          )}
        </p>
      </Prose>

      <Callout variant='note' title={t('developers.docs.quickstart.prereq_title', 'Before you start')}>
        {t(
          'developers.docs.quickstart.prereq_body',
          'Create an account in the API Dashboard and note your organization address. You can also authenticate with an API key instead of email and password for server-to-server use.'
        )}
      </Callout>

      <Steps>
        <Step title={t('developers.docs.quickstart.step_auth', 'Authenticate')}>
          {t(
            'developers.docs.quickstart.step_auth_body',
            'Exchange your email and password for a JWT. Send it as a bearer token on every following request.'
          )}
          <CodeBlock samples={[{ label: 'cURL', code: loginCode }]} />
        </Step>

        <Step title={t('developers.docs.quickstart.step_org', 'Create an organization')}>
          {t(
            'developers.docs.quickstart.step_org_body',
            'Skip this if you already have one. The response includes the organization address used in later calls.'
          )}
          <CodeBlock samples={[{ label: 'cURL', code: orgCode }]} />
        </Step>

        <Step title={t('developers.docs.quickstart.step_members', 'Add members')}>
          {t(
            'developers.docs.quickstart.step_members_body',
            'Import the people in your organization. For large lists, pass ?async=true and poll the returned job id.'
          )}
          <CodeBlock samples={[{ label: 'cURL', code: membersCode }]} />
        </Step>

        <Step title={t('developers.docs.quickstart.step_census', 'Build and publish a census')}>
          {t(
            'developers.docs.quickstart.step_census_body',
            'A census defines who can vote and how they authenticate. Publishing produces a cryptographic root that the election is bound to.'
          )}
          <CodeBlock samples={[{ label: 'cURL', code: censusCode }]} />
        </Step>

        <Step title={t('developers.docs.quickstart.step_process', 'Create a voting process')}>
          {t(
            'developers.docs.quickstart.step_process_body',
            'Define the questions, choices and timing, and bind the process to the published census. The process is your election.'
          )}
          <CodeBlock samples={[{ label: 'cURL', code: processCode }]} />
        </Step>

        <Step title={t('developers.docs.quickstart.step_results', 'Read the results')}>
          {t(
            'developers.docs.quickstart.step_results_body',
            'Poll the results endpoint at any time. Results are verifiable against the protocol and marked final once the process ends.'
          )}
          <CodeBlock samples={[{ label: 'cURL', code: resultsCode }]} />
        </Step>
      </Steps>

      <Callout variant='tip' title={t('developers.docs.quickstart.next_title', 'Next steps')}>
        {t(
          'developers.docs.quickstart.next_body',
          'Read Authentication to issue API keys, Census to fine-tune voter authentication, and Voting processes to configure vote types such as multiple choice or weighted voting.'
        )}
      </Callout>
    </DocArticle>
  )
}
