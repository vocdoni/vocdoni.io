import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const addCode = `# Synchronous: returns the count immediately
curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/members" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "members": [ { "memberNumber": "0001", "name": "Ada", "surname": "Lovelace", "email": "ada@example.org", "weight": "1" } ] }'
# -> { "added": 1, "errors": [] }`

const asyncCode = `# Asynchronous: returns a job id to poll
curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/members?async=true" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "members": [ /* thousands of members */ ] }'
# -> { "added": 0, "errors": [], "jobId": "deadbeef" }

# Poll progress
curl "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/members/job/deadbeef" \\
  -H "Authorization: Bearer $TOKEN"
# -> { "added": 5400, "total": 9000, "errors": [], "progress": 60 }`

const groupCode = `curl -X POST "${DEVELOPERS_API_BASE_URL}/organizations/$ORG/groups" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "title": "Board 2026", "description": "Eligible board voters", "memberIds": ["<id1>", "<id2>"] }'`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='members_and_groups'
      title={t('developers.docs.members_and_groups.title', 'Members and groups')}
      lead={t(
        'developers.docs.members_and_groups.lead',
        'Members are the people in your organization. Import them once, organize them into groups, and reuse them to build censuses for many elections.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.members_and_groups.member_title', 'The member object')}</h2>
        <p>
          {t(
            'developers.docs.members_and_groups.member_body',
            'A member carries identity and contact fields plus an optional census weight and arbitrary custom fields. Provide whatever your authentication strategy needs; you do not have to fill every field.'
          )}
        </p>
      </Prose>
      <PropertyTable
        rows={[
          {
            name: 'memberNumber',
            type: 'string',
            description: t(
              'developers.docs.members_and_groups.f_membernumber',
              'Your identifier for the member, unique within the organization.'
            ),
          },
          { name: 'name', type: 'string', description: t('developers.docs.members_and_groups.f_name', 'Given name.') },
          {
            name: 'surname',
            type: 'string',
            description: t('developers.docs.members_and_groups.f_surname', 'Family name.'),
          },
          {
            name: 'email',
            type: 'string',
            description: t(
              'developers.docs.members_and_groups.f_email',
              'Email, used for email-based authentication and reminders.'
            ),
          },
          {
            name: 'phone',
            type: 'string',
            description: t('developers.docs.members_and_groups.f_phone', 'Phone number, used for SMS authentication.'),
          },
          {
            name: 'nationalId',
            type: 'string',
            description: t(
              'developers.docs.members_and_groups.f_nationalid',
              'National identity document, when used to authenticate.'
            ),
          },
          {
            name: 'birthDate',
            type: 'string',
            description: t('developers.docs.members_and_groups.f_birthdate', 'Date of birth in YYYY-MM-DD format.'),
          },
          {
            name: 'weight',
            type: 'string',
            description: t(
              'developers.docs.members_and_groups.f_weight',
              'Vote weight for weighted censuses. Defaults to 1.'
            ),
          },
          {
            name: 'other',
            type: 'object',
            description: t(
              'developers.docs.members_and_groups.f_other',
              'Custom key-value fields specific to your organization.'
            ),
          },
        ]}
      />

      <Prose>
        <h2>{t('developers.docs.members_and_groups.add_title', 'Adding members')}</h2>
        <p>
          {t(
            'developers.docs.members_and_groups.add_body',
            'Add members in bulk. Small batches run synchronously and return the count and any per-member errors. For large imports, pass async=true to get a job id you poll until it completes.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/organizations/{address}/members' />
      <CodeBlock samples={[{ label: 'cURL', code: addCode }]} />

      <Callout
        variant='tip'
        title={t('developers.docs.members_and_groups.async_title', 'Large lists run asynchronously')}
      >
        {t(
          'developers.docs.members_and_groups.async_body',
          'With async=true the request returns immediately with a jobId. Poll the members job endpoint for progress as a percentage. Jobs are cleared shortly after they finish, so read the final state promptly.'
        )}
      </Callout>
      <CodeBlock samples={[{ label: 'cURL', code: asyncCode }]} />

      <Prose>
        <h2>{t('developers.docs.members_and_groups.manage_title', 'Listing, updating and deleting')}</h2>
        <p>
          {t(
            'developers.docs.members_and_groups.manage_body',
            'List members with pagination and an optional search term, update a single member, or delete specific members or all of them.'
          )}
        </p>
      </Prose>
      <Endpoint method='GET' path='/organizations/{address}/members' />
      <Endpoint method='PUT' path='/organizations/{address}/members' />
      <Endpoint method='DELETE' path='/organizations/{address}/member' />

      <Prose>
        <h2>{t('developers.docs.members_and_groups.groups_title', 'Groups')}</h2>
        <p>
          {t(
            'developers.docs.members_and_groups.groups_body',
            'Groups are reusable subsets of members - for example everyone eligible for a particular election. You can create a census directly from a group, and validate that members carry the fields a census will require.'
          )}
        </p>
      </Prose>
      <Endpoint method='GET' path='/organizations/{address}/groups' />
      <Endpoint method='POST' path='/organizations/{address}/groups' />
      <Endpoint method='PUT' path='/organizations/{address}/groups/{groupID}' />
      <Endpoint method='POST' path='/organizations/{address}/groups/{groupID}/validate' />
      <CodeBlock samples={[{ label: 'cURL', code: groupCode }]} />
    </DocArticle>
  )
}
