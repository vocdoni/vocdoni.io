import { Callout } from '@/components/developers/Callout'
import { CardGrid, DocCard } from '@/components/developers/CardGrid'
import { DocArticle } from '@/components/developers/DocArticle'
import { Prose } from '@/components/developers/Prose'
import { Boxes, KeyRound, ListChecks, Rocket, Users, Vote } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Page() {
  const { t } = useTranslation()

  return (
    <DocArticle
      slug='overview'
      title={t('developers.docs.overview.title', 'Overview')}
      lead={t(
        'developers.docs.overview.lead',
        'The Vocdoni API lets you add secure, anonymous and end-to-end verifiable voting to your own product. This section explains how the pieces fit together and where to go next.'
      )}
    >
      <Prose>
        <h2>{t('developers.docs.overview.audience_title', 'Who this is for')}</h2>
        <p>
          {t(
            'developers.docs.overview.audience_body',
            'These docs are written for integrators: developers who want to run elections from their own software. You bring the product and the voters; Vocdoni provides the voting infrastructure, cryptography and verifiable results.'
          )}
        </p>

        <h2>{t('developers.docs.overview.model_title', 'How the API fits together')}</h2>
        <p>
          {t(
            'developers.docs.overview.model_body',
            'Most integrations follow the same path. Each step maps to a small group of endpoints you will find in this documentation.'
          )}
        </p>
        <ul>
          <li>
            <strong>{t('developers.docs.overview.model_org', 'Organization')}</strong>
            {t(
              'developers.docs.overview.model_org_desc',
              ' - the account that owns elections, members and API keys. Everything is scoped to an organization address.'
            )}
          </li>
          <li>
            <strong>{t('developers.docs.overview.model_members', 'Members')}</strong>
            {t(
              'developers.docs.overview.model_members_desc',
              ' - the people in your organization. Import them once, then reuse them across many elections.'
            )}
          </li>
          <li>
            <strong>{t('developers.docs.overview.model_census', 'Census')}</strong>
            {t(
              'developers.docs.overview.model_census_desc',
              ' - the list of who can vote in a given election, with how they authenticate. Publishing a census produces a cryptographic root.'
            )}
          </li>
          <li>
            <strong>{t('developers.docs.overview.model_process', 'Process')}</strong>
            {t(
              'developers.docs.overview.model_process_desc',
              ' - a voting process (an election) with its questions, vote type and timing, run against a published census.'
            )}
          </li>
          <li>
            <strong>{t('developers.docs.overview.model_results', 'Results')}</strong>
            {t(
              'developers.docs.overview.model_results_desc',
              ' - live or final tallies that anyone can verify against the protocol.'
            )}
          </li>
        </ul>

        <Callout
          variant='tip'
          title={t('developers.docs.overview.jobs_callout_title', 'Heavy work runs asynchronously')}
        >
          {t(
            'developers.docs.overview.jobs_callout_body',
            'Bulk imports, census publishing and process publishing can take time, so they return a job id you poll until completion. See the jobs page for the pattern.'
          )}
        </Callout>

        <h2>{t('developers.docs.overview.integrate_title', 'Two ways to integrate')}</h2>
        <p>
          {t(
            'developers.docs.overview.integrate_body',
            'Most teams use the REST API documented here, which handles organizations, members, censuses, processes and results for you. If you need lower-level control over the protocol, the TypeScript SDK is also available - see SDKs and tools.'
          )}
        </p>
      </Prose>

      <h2 className='mt-12 mb-4 text-2xl font-semibold tracking-tight'>
        {t('developers.docs.overview.next_title', 'Where to go next')}
      </h2>
      <CardGrid columns={3}>
        <DocCard
          href='/developers/docs/quickstart'
          icon={Rocket}
          title={t('developers.docs.overview.next_quickstart', 'Quickstart')}
          description={t('developers.docs.overview.next_quickstart_desc', 'Run a full election in a few API calls.')}
        />
        <DocCard
          href='/developers/docs/authentication'
          icon={KeyRound}
          title={t('developers.docs.overview.next_auth', 'Authentication')}
          description={t('developers.docs.overview.next_auth_desc', 'Log in and create scoped API keys.')}
        />
        <DocCard
          href='/developers/docs/organizations'
          icon={Boxes}
          title={t('developers.docs.overview.next_orgs', 'Organizations')}
          description={t('developers.docs.overview.next_orgs_desc', 'Create the account that owns elections.')}
        />
        <DocCard
          href='/developers/docs/census'
          icon={Users}
          title={t('developers.docs.overview.next_census', 'Census')}
          description={t('developers.docs.overview.next_census_desc', 'Decide who can vote and how.')}
        />
        <DocCard
          href='/developers/docs/voting-processes'
          icon={Vote}
          title={t('developers.docs.overview.next_processes', 'Voting processes')}
          description={t('developers.docs.overview.next_processes_desc', 'Configure ballots and run elections.')}
        />
        <DocCard
          href='/developers/docs/results'
          icon={ListChecks}
          title={t('developers.docs.overview.next_results', 'Results')}
          description={t('developers.docs.overview.next_results_desc', 'Read verifiable tallies.')}
        />
      </CardGrid>
    </DocArticle>
  )
}
