import { Callout } from '@/components/developers/Callout'
import { CodeBlock } from '@/components/developers/CodeBlock'
import { DocArticle } from '@/components/developers/DocArticle'
import { Endpoint } from '@/components/developers/Endpoint'
import { Prose } from '@/components/developers/Prose'
import { PropertyTable } from '@/components/developers/PropertyTable'
import { DEVELOPERS_API_BASE_URL } from '@/lib/developers'
import { useTranslation } from 'react-i18next'

const createCode = `curl -X POST ${DEVELOPERS_API_BASE_URL}/census \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "orgAddress": "$ORG",
    "authFields": ["memberNumber", "birthDate"],
    "twoFaFields": ["email"]
  }'
# -> { "id": "$CENSUS_ID" }`

const publishCode = `# Add organization members, then publish
curl -X POST "${DEVELOPERS_API_BASE_URL}/census/$CENSUS_ID" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "memberIds": ["<id1>", "<id2>"] }'

curl -X POST "${DEVELOPERS_API_BASE_URL}/census/$CENSUS_ID/publish" \\
  -H "Authorization: Bearer $TOKEN"
# -> { "uri": "...", "root": "deadbeef...", "size": 2 }`

const groupPublishCode = `curl -X POST "${DEVELOPERS_API_BASE_URL}/census/$CENSUS_ID/group/$GROUP_ID/publish" \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "weighted": true, "authFields": ["memberNumber"], "twoFaFields": ["email"] }'`

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='census'
      title={t('developers.docs.census.title', 'Census')}
      lead={t(
        'developers.docs.census.lead',
        'A census is the list of who can vote in an election and how they prove who they are. Publishing a census produces a cryptographic root that binds the eligible voters to a process.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.census.types_title', 'Authentication types')}</h2>
        <p>
          {t(
            'developers.docs.census.types_body',
            'A census has a type that determines how voters authenticate. You can require fields the voter must know (auth fields) and a second factor delivered to them (two-factor fields).'
          )}
        </p>
        <ul>
          <li>
            <code>auth</code>
            {t('developers.docs.census.type_auth', ' - voters authenticate with known fields only.')}
          </li>
          <li>
            <code>mail</code>
            {t('developers.docs.census.type_mail', ' - a code is sent by email as a second factor.')}
          </li>
          <li>
            <code>sms</code>
            {t('developers.docs.census.type_sms', ' - a code is sent by SMS as a second factor.')}
          </li>
          <li>
            <code>sms_or_mail</code>
            {t(
              'developers.docs.census.type_sms_or_mail',
              ' - the voter can choose SMS or email for the second factor.'
            )}
          </li>
        </ul>
        <p>
          {t(
            'developers.docs.census.fields_body',
            'Auth fields can include memberNumber, name, surname, nationalId and birthDate. Two-factor fields can be email or phone. The type is derived from the two-factor fields you choose.'
          )}
        </p>
      </Prose>

      <Prose>
        <h2>{t('developers.docs.census.create_title', 'Creating a census')}</h2>
        <p>
          {t(
            'developers.docs.census.create_body',
            'Create a census for an organization, declaring the authentication and two-factor fields it will use. The response returns the census id.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/census' />
      <PropertyTable
        rows={[
          {
            name: 'orgAddress',
            type: 'string',
            required: true,
            description: t('developers.docs.census.f_orgaddress', 'The organization the census belongs to.'),
          },
          {
            name: 'authFields',
            type: 'string[]',
            description: t('developers.docs.census.f_authfields', 'Fields the voter must provide to authenticate.'),
          },
          {
            name: 'twoFaFields',
            type: 'string[]',
            description: t('developers.docs.census.f_twofafields', 'Channels for the second factor: email or phone.'),
          },
        ]}
      />
      <CodeBlock samples={[{ label: 'cURL', code: createCode }]} />

      <Prose>
        <h2>{t('developers.docs.census.populate_title', 'Adding voters and publishing')}</h2>
        <p>
          {t(
            'developers.docs.census.populate_body',
            'Add existing organization members to the census, then publish it. Members already present are skipped. Publishing returns the census root, its URI and final size - after this the census is locked for voting.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/census/{id}' />
      <Endpoint method='GET' path='/census/{id}/participants' />
      <Endpoint method='POST' path='/census/{id}/publish' />
      <CodeBlock samples={[{ label: 'cURL', code: publishCode }]} />

      <Prose>
        <h2>{t('developers.docs.census.group_title', 'Publishing from a group')}</h2>
        <p>
          {t(
            'developers.docs.census.group_body',
            'You can publish a census directly from a member group, optionally weighting votes by the member weight field. This is the quickest way to turn a saved group into an eligible voter list.'
          )}
        </p>
      </Prose>
      <Endpoint method='POST' path='/census/{id}/group/{groupid}/publish' />
      <CodeBlock samples={[{ label: 'cURL', code: groupPublishCode }]} />

      <Callout variant='note' title={t('developers.docs.census.weight_title', 'Weighted voting')}>
        {t(
          'developers.docs.census.weight_body',
          'When a census is weighted, each voter carries the weight set on their member record. Use it for shareholder meetings or any vote where members do not count equally.'
        )}
      </Callout>
    </DocArticle>
  )
}
