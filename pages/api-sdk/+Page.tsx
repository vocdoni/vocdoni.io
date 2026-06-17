import { BadgeCheck, Boxes, Code2, Layout, ShieldCheck, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  CodeShowcase,
  CtaBanner,
  FeatureGrid,
  MarketingHero,
  ProseSection,
  RelatedLinks,
  StepList,
} from '@/components/marketing'

// Code samples build on the @vocdoni/sdk API and are not translated: they are
// literal identifiers, not user-facing prose. The examples favour a plain
// backend integration (your own users, your own login) over crypto wallets.
const INSTALL_CODE = `# with npm
npm i @vocdoni/sdk

# with yarn
yarn add @vocdoni/sdk

# with pnpm
pnpm add @vocdoni/sdk`

const CLIENT_CODE = `import { VocdoniSDKClient, EnvOptions } from '@vocdoni/sdk'

// Derive the organizer identity from your own secret, kept on your backend.
// No browser extension, MetaMask or seed phrase for you or your voters.
const organizer = VocdoniSDKClient.generateWalletFromData([process.env.VOCDONI_ORG_KEY])

const client = new VocdoniSDKClient({
  env: EnvOptions.STG, // 'dev' or 'stg' (staging is recommended)
  wallet: organizer,
})

// Registers your organization account the first time it runs
const info = await client.createAccount()

// Testing is free: fund the account with a single call on dev
if (info.balance === 0) {
  await client.collectFaucetTokens()
}`

const CENSUS_CODE = `import { PlainCensus, VocdoniSDKClient } from '@vocdoni/sdk'

// The members you already store in your own database
const members = [
  { id: 'user-1', email: 'ada@example.org' },
  { id: 'user-2', email: 'alan@example.org' },
]

// Turn each member into a voting identity derived from your data.
// Voters never touch a wallet: you simply map your user ids into the census.
const census = new PlainCensus()
for (const member of members) {
  const voter = VocdoniSDKClient.generateWalletFromData([member.id, process.env.VOCDONI_VOTER_SECRET])
  census.add(await voter.getAddress())
}

// Prefer Vocdoni to authenticate voters by email or SMS for you?
// Use a CSP census instead and skip identity management entirely.
// const census = new CspCensus(CSP_PUBKEY, CSP_URL)`

const ELECTION_CODE = `import { Election } from '@vocdoni/sdk'

const election = Election.from({
  title: 'Board election 2026',
  description: 'Choose the next board of the association',
  endDate: new Date('2026-09-30 23:59:59'),
  census,
  electionType: {
    autoStart: true, // start automatically at the start date
    interruptible: true, // can be paused or ended early
    secretUntilTheEnd: false, // hide results until the vote ends
    anonymous: false, // set true for fully secret, private voting
  },
  voteType: { uniqueChoices: false, maxVoteOverwrites: 0 },
})

election.addQuestion('Who should chair the board?', 'Pick one candidate', [
  { title: 'Alice', value: 0 },
  { title: 'Bob', value: 1 },
  { title: 'Carol', value: 2 },
])

const electionId = await client.createElection(election)
console.log(electionId) // share this id with your voters`

const VOTE_CODE = `import { VocdoniSDKClient, EnvOptions, Vote } from '@vocdoni/sdk'

// The voter just signed in through your usual login (email, SSO, magic link).
// Re-derive the same identity you added to the census: deterministic, no wallet.
const voter = VocdoniSDKClient.generateWalletFromData([loggedInUser.id, process.env.VOCDONI_VOTER_SECRET])

const client = new VocdoniSDKClient({ env: EnvOptions.STG, wallet: voter })
client.setElectionId(electionId)

// Optional eligibility checks before showing the ballot
if (!(await client.isInCensus()) || !(await client.isAbleToVote())) {
  throw new Error('This user cannot vote in this election')
}

// Cast a vote for option index 0
const vote = new Vote([0])
const voteId = await client.submitVote(vote)
console.log(voteId) // verifiable receipt you can show the voter`

const RESULTS_CODE = `// Read one election with its live results and metadata
const election = await client.fetchElection(electionId)
console.log(election.status) // READY | PAUSED | ENDED | CANCELED
console.log(election.results) // tally per question and choice

// List every election your organization has created (paginated)
const elections = await client.fetchElections(organizerAddress)

// Manage the lifecycle when you need to
await client.pauseElection(electionId)
await client.continueElection(electionId)
await client.endElection(electionId)`

export default function ApiSdkPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('api_sdk.hero.eyebrow', 'Developers')}
        title={t('api_sdk.hero.title', 'Build verifiable voting into your own product')}
        subtitle={t(
          'api_sdk.hero.subtitle',
          'The Vocdoni SDK and API let you create a census, launch an election and collect anonymous, end-to-end verifiable votes in a few lines of code. Open source, TypeScript-first, and free to try.'
        )}
        primaryCta={{
          label: t('api_sdk.hero.cta_primary', 'Read the developer docs'),
          href: 'https://developer.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('api_sdk.hero.cta_secondary', 'Jump to the quickstart'), href: '#quickstart' }}
        bullets={[
          t('api_sdk.hero.bullet_1', 'Open source SDK published as @vocdoni/sdk on npm'),
          t('api_sdk.hero.bullet_2', 'TypeScript types for clients, censuses, elections and votes'),
          t('api_sdk.hero.bullet_3', 'Free to test, with no crypto wallets, tokens to buy or payment to start'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('api_sdk.why.eyebrow', 'Why build on Vocdoni')}
        title={t('api_sdk.why.title', 'Everything you need to ship a trustworthy vote')}
        columns={3}
        features={[
          {
            icon: Code2,
            title: t('api_sdk.why.sdk.title', 'TypeScript SDK'),
            description: t(
              'api_sdk.why.sdk.description',
              'A typed client that works in the browser and in Node, with one method per voting action.'
            ),
          },
          {
            icon: Boxes,
            title: t('api_sdk.why.api.title', 'Open REST API'),
            description: t(
              'api_sdk.why.api.description',
              'Prefer raw HTTP? Every SDK call maps to a documented API endpoint you can hit from any language.'
            ),
          },
          {
            icon: Users,
            title: t('api_sdk.why.census.title', 'Flexible censuses'),
            description: t(
              'api_sdk.why.census.description',
              'Build voter lists straight from the users already in your database, or let Vocdoni verify voters by email or SMS.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('api_sdk.why.anonymous.title', 'Anonymous ballots'),
            description: t(
              'api_sdk.why.anonymous.description',
              'Flip one flag to make an election anonymous with zero-knowledge proofs, no extra infrastructure.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('api_sdk.why.verifiable.title', 'Verifiable results'),
            description: t(
              'api_sdk.why.verifiable.description',
              'Every vote produces a receipt and anyone can verify the tally against the votes cast.'
            ),
          },
          {
            icon: Layout,
            title: t('api_sdk.why.frontend.title', 'Ready-made frontend'),
            description: t(
              'api_sdk.why.frontend.description',
              'Reuse the open source Vocdoni App to give voters a polished voting page without building UI.'
            ),
          },
        ]}
      />

      <StepList
        eyebrow={t('api_sdk.steps.eyebrow', 'Integration flow')}
        title={t('api_sdk.steps.title', 'From zero to a live election in six steps')}
        description={t(
          'api_sdk.steps.description',
          'The same flow powers our own app. Each step is one SDK call, so you can wire it into your backend or run it straight from the browser.'
        )}
        steps={[
          {
            title: t('api_sdk.steps.step_1.title', 'Install the SDK'),
            description: t(
              'api_sdk.steps.step_1.description',
              'Add @vocdoni/sdk to your project with npm, yarn or pnpm.'
            ),
          },
          {
            title: t('api_sdk.steps.step_2.title', 'Create a client and account'),
            description: t(
              'api_sdk.steps.step_2.description',
              'Initialize the client with an environment and a signer, then register an account funded by the faucet.'
            ),
          },
          {
            title: t('api_sdk.steps.step_3.title', 'Build the census'),
            description: t(
              'api_sdk.steps.step_3.description',
              'Decide who can vote: add addresses by hand, sync from your system, or gate by a token balance.'
            ),
          },
          {
            title: t('api_sdk.steps.step_4.title', 'Create the election'),
            description: t(
              'api_sdk.steps.step_4.description',
              'Set the title, dates and rules, add your questions and choices, and publish the election on chain.'
            ),
          },
          {
            title: t('api_sdk.steps.step_5.title', 'Collect votes'),
            description: t(
              'api_sdk.steps.step_5.description',
              'Check that a voter is eligible, then submit their choices and hand back a verifiable receipt.'
            ),
          },
          {
            title: t('api_sdk.steps.step_6.title', 'Read and verify results'),
            description: t(
              'api_sdk.steps.step_6.description',
              'Fetch live tallies, manage the election lifecycle, and let anyone audit the outcome.'
            ),
          },
        ]}
      />

      <CodeShowcase
        id='quickstart'
        muted
        eyebrow={t('api_sdk.code.eyebrow', 'Quickstart')}
        title={t('api_sdk.code.title', 'Real code, copy and paste to get going')}
        description={t(
          'api_sdk.code.description',
          'These snippets mirror the official SDK examples. Run them against the dev or staging environment to launch a working election end to end.'
        )}
        tabs={[
          {
            value: 'install',
            label: t('api_sdk.code.install.label', 'Install'),
            description: t('api_sdk.code.install.description', 'Add the SDK with your package manager of choice.'),
            code: INSTALL_CODE,
            language: 'bash',
            filename: 'terminal',
          },
          {
            value: 'client',
            label: t('api_sdk.code.client.label', 'Client & account'),
            description: t(
              'api_sdk.code.client.description',
              'Create the client with an identity derived from your own secret, no crypto wallet required.'
            ),
            code: CLIENT_CODE,
            language: 'ts',
            filename: 'client.ts',
          },
          {
            value: 'census',
            label: t('api_sdk.code.census.label', 'Census'),
            description: t(
              'api_sdk.code.census.description',
              'Turn the users already in your database into eligible voters.'
            ),
            code: CENSUS_CODE,
            language: 'ts',
            filename: 'census.ts',
          },
          {
            value: 'election',
            label: t('api_sdk.code.election.label', 'Election'),
            description: t(
              'api_sdk.code.election.description',
              'Configure the rules, add questions, and publish the election.'
            ),
            code: ELECTION_CODE,
            language: 'ts',
            filename: 'election.ts',
          },
          {
            value: 'vote',
            label: t('api_sdk.code.vote.label', 'Vote'),
            description: t(
              'api_sdk.code.vote.description',
              'Re-derive the voter after your normal login, then cast the ballot.'
            ),
            code: VOTE_CODE,
            language: 'ts',
            filename: 'vote.ts',
          },
          {
            value: 'results',
            label: t('api_sdk.code.results.label', 'Results'),
            description: t('api_sdk.code.results.description', 'Read live results and manage the election lifecycle.'),
            code: RESULTS_CODE,
            language: 'ts',
            filename: 'results.ts',
          },
        ]}
      />

      <ProseSection
        eyebrow={t('api_sdk.frontend.eyebrow', 'Voter frontend')}
        title={t('api_sdk.frontend.title', 'Spin up a voting page without building the UI')}
        intro={t(
          'api_sdk.frontend.intro',
          'The Vocdoni App is the same open source React frontend that powers app.vocdoni.io. Point it at an election id and your voters get a tested, accessible voting page. Fork it to match your brand.'
        )}
        blocks={[
          {
            heading: t('api_sdk.frontend.block_1.heading', 'Use the hosted app'),
            paragraphs: [
              t(
                'api_sdk.frontend.block_1.paragraph_1',
                'Every election you create is instantly votable at app.vocdoni.io/processes/<electionId>. Share the link and you are done, no frontend work required.'
              ),
            ],
          },
          {
            heading: t('api_sdk.frontend.block_2.heading', 'Fork and brand it'),
            bullets: [
              t('api_sdk.frontend.block_2.bullet_1', 'Clone the vocdoni-app repository and run it with pnpm start'),
              t(
                'api_sdk.frontend.block_2.bullet_2',
                'Switch between environments with the VOCDONI_ENVIRONMENT variable (dev or prod)'
              ),
              t(
                'api_sdk.frontend.block_2.bullet_3',
                'Map a custom domain to your organization with CUSTOM_ORGANIZATION_DOMAINS'
              ),
            ],
          },
          {
            heading: t('api_sdk.frontend.block_3.heading', 'Embed a shared-census portal'),
            paragraphs: [
              t(
                'api_sdk.frontend.block_3.paragraph_1',
                'The shared-census page lists several elections at once. Set PROCESS_IDS to the elections you want to show, add custom intro text per language, and optionally embed a live stream with STREAM_URL.'
              ),
            ],
          },
        ]}
        muted
      />

      <FeatureGrid
        eyebrow={t('api_sdk.showcase.eyebrow', 'Voting pages you can ship')}
        title={t('api_sdk.showcase.title', 'Configure the ballot that fits your vote')}
        columns={3}
        features={[
          {
            title: t('api_sdk.showcase.single.title', 'Single-choice ballot'),
            description: t(
              'api_sdk.showcase.single.description',
              'One question, pick one option. The classic yes/no or candidate election, ready in minutes.'
            ),
          },
          {
            title: t('api_sdk.showcase.survey.title', 'Multi-question survey'),
            description: t(
              'api_sdk.showcase.survey.description',
              'Chain several questions in a single ballot for statutory votes or member consultations.'
            ),
          },
          {
            title: t('api_sdk.showcase.weighted.title', 'Weighted or restricted vote'),
            description: t(
              'api_sdk.showcase.weighted.description',
              'Give voters different weights, or restrict who can take part by member tier, role or shares held.'
            ),
          },
          {
            title: t('api_sdk.showcase.anonymous.title', 'Anonymous vote'),
            description: t(
              'api_sdk.showcase.anonymous.description',
              'Turn on zero-knowledge proofs so ballots stay secret while results remain verifiable.'
            ),
          },
          {
            title: t('api_sdk.showcase.hybrid.title', 'Shared-census portal'),
            description: t(
              'api_sdk.showcase.hybrid.description',
              'Show several active elections on one branded page for assemblies and multi-vote events.'
            ),
          },
          {
            title: t('api_sdk.showcase.custom_domain.title', 'Custom-domain org page'),
            description: t(
              'api_sdk.showcase.custom_domain.description',
              'Serve the voter experience from your own domain, with your organization profile as the homepage.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('api_sdk.cta.title', 'Start building today')}
        description={t(
          'api_sdk.cta.description',
          'Read the docs, clone the examples, and launch your first verifiable election for free. Stuck on an integration? Our team is happy to help.'
        )}
        primaryCta={{
          label: t('api_sdk.cta.primary', 'Open the developer docs'),
          href: 'https://developer.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('api_sdk.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('api_sdk.related.title', 'Resources for builders')}
        links={[
          {
            label: t('api_sdk.related.docs', 'Developer documentation'),
            href: 'https://developer.vocdoni.io',
            external: true,
            description: t('api_sdk.related.docs_desc', 'API reference, SDK guides and tutorials.'),
          },
          {
            label: t('api_sdk.related.sdk', 'Vocdoni SDK on GitHub'),
            href: 'https://github.com/vocdoni/vocdoni-sdk',
            external: true,
            description: t('api_sdk.related.sdk_desc', 'Source, examples and release notes for @vocdoni/sdk.'),
          },
          {
            label: t('api_sdk.related.app', 'Vocdoni App on GitHub'),
            href: 'https://github.com/vocdoni/vocdoni-app',
            external: true,
            description: t('api_sdk.related.app_desc', 'The open source voter frontend you can fork and brand.'),
          },
          {
            label: t('api_sdk.related.integrations', 'Integrations'),
            href: '/product/integrations',
            description: t('api_sdk.related.integrations_desc', 'SSO, CRM connectors and census import options.'),
          },
        ]}
      />
    </>
  )
}
