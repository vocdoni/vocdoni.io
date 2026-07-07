import { localeDefault } from '@/locales'

const t = (_key: string, defaultValue: string) => defaultValue

const metaDefaults = {
  'meta.index.title': t('meta.index.title', 'Secure online voting platform for organizations | Vocdoni'),
  'meta.index.description': t(
    'meta.index.description',
    'Run secure, legally valid elections for your organization with the most verifiable voting technology. Start free, set up in minutes, no credit card needed.'
  ),
  'meta.contact.title': t('meta.contact.title', 'Contact - Vocdoni'),
  'meta.contact.description': t(
    'meta.contact.description',
    'Talk to Vocdoni about secure online voting, verifiable elections, pricing, demos, and custom digital governance projects.'
  ),
  'blog.eyebrow': t('blog.eyebrow', 'Vocdoni blog'),
  'meta.blog_index.title': t('meta.blog_index.title', 'Vocdoni blog - insights on secure digital voting'),
  'meta.blog_index.description': t(
    'meta.blog_index.description',
    'Product updates, technical deep-dives and success stories from organizations running secure, verifiable online voting with Vocdoni.'
  ),
  'meta.about_us.title': t('meta.about_us.title', 'About Vocdoni - open source online voting infrastructure'),
  'meta.about_us.description': t(
    'meta.about_us.description',
    'Meet the team building open source, verifiable digital voting infrastructure for organizations that need trustworthy decisions.'
  ),
  'meta.privacy.title': t('meta.privacy.title', 'Privacy policy - Vocdoni'),
  'meta.privacy.description': t(
    'meta.privacy.description',
    'Learn how Vocdoni collects, uses, and protects your personal data and privacy.'
  ),
  'meta.terms.title': t('meta.terms.title', 'Terms & conditions - Vocdoni'),
  'meta.terms.description': t(
    'meta.terms.description',
    "Read the terms and conditions that govern the use of Vocdoni's services and platform."
  ),
  'meta.use_cases.title': t('meta.use_cases.title', 'Online voting use cases by organization type | Vocdoni'),
  'meta.use_cases.description': t(
    'meta.use_cases.description',
    "Discover real-world voting and governance use cases powered by Vocdoni's secure and transparent technology."
  ),
  'meta.app.title': t('meta.app.title', 'Online voting software for associations & organizations | Vocdoni'),
  'meta.app.description': t(
    'meta.app.description',
    'Start free, upload your voter list, and publish results your members can verify. Built for organizations that need trust, speed, and proof.'
  ),
  'meta.solutions_index.title': t(
    'meta.solutions_index.title',
    'Online voting solutions by organization type | Vocdoni'
  ),
  'meta.solutions_index.description': t(
    'meta.solutions_index.description',
    'Secure, verifiable online voting tailored to your organization: associations, cooperatives, professional colleges, political parties, municipalities, sports clubs, NGOs, universities, companies and unions.'
  ),
  'meta.solutions.associations.title': t(
    'meta.solutions.associations.title',
    'Association voting platform for board elections | Vocdoni'
  ),
  'meta.solutions.associations.description': t(
    'meta.solutions.associations.description',
    'Secure, verifiable online voting for associations and federations. Run board elections, statutory votes and member consultations with secret ballots and instant results.'
  ),
  'meta.solutions.cooperatives.title': t(
    'meta.solutions.cooperatives.title',
    'Cooperative voting software for assemblies | Vocdoni'
  ),
  'meta.solutions.cooperatives.description': t(
    'meta.solutions.cooperatives.description',
    'Run cooperative general assemblies and board elections online. One member one vote or weighted votes, secret ballots, higher participation and verifiable results.'
  ),
  'meta.solutions.professional_colleges.title': t(
    'meta.solutions.professional_colleges.title',
    'Professional association voting software | Vocdoni'
  ),
  'meta.solutions.professional_colleges.description': t(
    'meta.solutions.professional_colleges.description',
    'Compliant, auditable online voting for professional colleges and bodies. Run statutory elections and AGMs with a full audit trail and instant, verifiable results.'
  ),
  'meta.solutions.political_parties.title': t(
    'meta.solutions.political_parties.title',
    'Political party voting software for primaries | Vocdoni'
  ),
  'meta.solutions.political_parties.description': t(
    'meta.solutions.political_parties.description',
    'Run primaries, leadership elections and member consultations with secret, coercion-resistant ballots, higher turnout and end-to-end verifiable results.'
  ),
  'meta.solutions.municipalities.title': t(
    'meta.solutions.municipalities.title',
    'Municipal voting software for citizen consultations | Vocdoni'
  ),
  'meta.solutions.municipalities.description': t(
    'meta.solutions.municipalities.description',
    'Run local referendums, participatory budgeting and citizen consultations with public auditability, accessibility for all residents and verifiable results.'
  ),
  'meta.solutions.sports_clubs.title': t(
    'meta.solutions.sports_clubs.title',
    'Sports club voting software for elections | Vocdoni'
  ),
  'meta.solutions.sports_clubs.description': t(
    'meta.solutions.sports_clubs.description',
    'Run presidential and board elections and member votes for clubs of any size. Scales to hundreds of thousands of members with secret ballots and instant results.'
  ),
  'meta.solutions.ngos.title': t('meta.solutions.ngos.title', 'NGO voting software for board elections | Vocdoni'),
  'meta.solutions.ngos.description': t(
    'meta.solutions.ngos.description',
    'Private, verifiable online voting for NGOs, foundations and civic movements. Run board elections and member decisions across borders, free to start.'
  ),
  'meta.solutions.universities.title': t(
    'meta.solutions.universities.title',
    'University voting software for student elections | Vocdoni'
  ),
  'meta.solutions.universities.description': t(
    'meta.solutions.universities.description',
    'Run student union, faculty and governance elections with high turnout, secret ballots and verifiable results across departments and campuses.'
  ),
  'meta.solutions.companies_agm.title': t(
    'meta.solutions.companies_agm.title',
    'AGM voting software for shareholder meetings | Vocdoni'
  ),
  'meta.solutions.companies_agm.description': t(
    'meta.solutions.companies_agm.description',
    'Run annual general meetings and shareholder votes digitally. Weighted votes and proxies, a full audit trail and verifiable results that satisfy auditors.'
  ),
  'meta.solutions.trade_unions.title': t(
    'meta.solutions.trade_unions.title',
    'Union voting software for officer elections | Vocdoni'
  ),
  'meta.solutions.trade_unions.description': t(
    'meta.solutions.trade_unions.description',
    'Run union officer elections, collective bargaining ballots and works council votes with truly secret, coercion-resistant and verifiable online voting.'
  ),
  'meta.learn_index.title': t('meta.learn_index.title', 'Learn: guides to secure online voting | Vocdoni'),
  'meta.learn_index.description': t(
    'meta.learn_index.description',
    'Clear, practical guides to secure and verifiable online voting: how it works, anonymity, blockchain, GDPR, legally valid AGMs and preventing election fraud.'
  ),
  'meta.learn.how_secure_online_voting_works.title': t(
    'meta.learn.how_secure_online_voting_works.title',
    'How secure online voting works | Vocdoni'
  ),
  'meta.learn.how_secure_online_voting_works.description': t(
    'meta.learn.how_secure_online_voting_works.description',
    'A clear explanation of how secure online voting works: authentication, ballot secrecy, encryption, verifiability and the guarantees that make a digital result trustworthy.'
  ),
  'meta.learn.verifiable_voting_explained.title': t(
    'meta.learn.verifiable_voting_explained.title',
    'Verifiable voting explained | Vocdoni'
  ),
  'meta.learn.verifiable_voting_explained.description': t(
    'meta.learn.verifiable_voting_explained.description',
    'What verifiable voting and end-to-end verifiability mean, why they matter, and how voters and observers can check an election result without trusting the platform.'
  ),
  'meta.learn.anonymous_voting_explained.title': t(
    'meta.learn.anonymous_voting_explained.title',
    'Anonymous voting explained | Vocdoni'
  ),
  'meta.learn.anonymous_voting_explained.description': t(
    'meta.learn.anonymous_voting_explained.description',
    'How anonymous online voting keeps ballots secret while results stay verifiable, and how zero-knowledge cryptography prevents coercion and vote buying.'
  ),
  'meta.learn.blockchain_voting_myths_vs_reality.title': t(
    'meta.learn.blockchain_voting_myths_vs_reality.title',
    'Blockchain voting: myths vs reality | Vocdoni'
  ),
  'meta.learn.blockchain_voting_myths_vs_reality.description': t(
    'meta.learn.blockchain_voting_myths_vs_reality.description',
    'A grounded look at blockchain voting: what blockchain does and does not solve for elections, common myths, real risks, and where it genuinely adds value.'
  ),
  'meta.learn.how_to_run_a_legally_valid_agm_online.title': t(
    'meta.learn.how_to_run_a_legally_valid_agm_online.title',
    'How to run a legally valid AGM online | Vocdoni'
  ),
  'meta.learn.how_to_run_a_legally_valid_agm_online.description': t(
    'meta.learn.how_to_run_a_legally_valid_agm_online.description',
    'A practical guide to running a legally valid annual general meeting online: bylaws, notice, quorum, proxies, secret ballots, verifiable results and record-keeping.'
  ),
  'meta.learn.gdpr_requirements_for_digital_voting.title': t(
    'meta.learn.gdpr_requirements_for_digital_voting.title',
    'GDPR requirements for digital voting | Vocdoni'
  ),
  'meta.learn.gdpr_requirements_for_digital_voting.description': t(
    'meta.learn.gdpr_requirements_for_digital_voting.description',
    'What GDPR means for digital voting: lawful basis, data minimization, the voter census, ballot secrecy, retention, processors and EU hosting, in plain language.'
  ),
  'meta.learn.how_to_prevent_election_fraud_online.title': t(
    'meta.learn.how_to_prevent_election_fraud_online.title',
    'How to prevent election fraud in online voting | Vocdoni'
  ),
  'meta.learn.how_to_prevent_election_fraud_online.description': t(
    'meta.learn.how_to_prevent_election_fraud_online.description',
    'The real risks in online voting and how to prevent fraud: voter authentication, ballot secrecy, verifiable tallies, audit trails and open-source scrutiny.'
  ),
  'meta.case_studies_index.title': t('meta.case_studies_index.title', 'Online voting case studies | Vocdoni'),
  'meta.case_studies_index.description': t(
    'meta.case_studies_index.description',
    'Real online voting case studies: professional colleges, political parties, municipalities, civic movements and associations that ran secure, verifiable elections with Vocdoni.'
  ),
  'meta.case_studies.coib.title': t(
    'meta.case_studies.coib.title',
    'COIB online AGM case study: nurses vote securely | Vocdoni'
  ),
  'meta.case_studies.coib.description': t(
    'meta.case_studies.coib.description',
    'How COIB, the official college of nurses of Barcelona, ran its 2025 annual general meeting vote online, securely and with instant, verifiable results.'
  ),
  'meta.case_studies.esquerra_republicana.title': t(
    'meta.case_studies.esquerra_republicana.title',
    'Esquerra Republicana case study: 77% turnout vote | Vocdoni'
  ),
  'meta.case_studies.esquerra_republicana.description': t(
    'meta.case_studies.esquerra_republicana.description',
    'How Esquerra Republicana ran a decisive party membership vote with 77.12% turnout and verifiable results available seconds after closing.'
  ),
  'meta.case_studies.bellpuig.title': t(
    'meta.case_studies.bellpuig.title',
    'Bellpuig case study: municipal online referendum | Vocdoni'
  ),
  'meta.case_studies.bellpuig.description': t(
    'meta.case_studies.bellpuig.description',
    'How Bellpuig City Council ran a hybrid municipal consultation online with full guarantees, recognized by the OECD as a standard for civic participation.'
  ),
  'meta.case_studies.new_belarus.title': t(
    'meta.case_studies.new_belarus.title',
    'New Belarus case study: censorship-resistant vote | Vocdoni'
  ),
  'meta.case_studies.new_belarus.description': t(
    'meta.case_studies.new_belarus.description',
    'How the New Belarus Coordination Council ran censorship-resistant elections for a democratic movement in exile, supervised by international observers.'
  ),
  'meta.case_studies.omnium_cultural.title': t(
    'meta.case_studies.omnium_cultural.title',
    'Òmnium Cultural case study: statutory assemblies | Vocdoni'
  ),
  'meta.case_studies.omnium_cultural.description': t(
    'meta.case_studies.omnium_cultural.description',
    'How Òmnium Cultural runs secure, verifiable statutory assemblies online, giving a large membership organization decisions with full guarantees.'
  ),
  'meta.developers_index.title': t(
    'meta.developers_index.title',
    'Vocdoni for developers: integrate verifiable voting | Vocdoni'
  ),
  'meta.developers_index.description': t(
    'meta.developers_index.description',
    'Build secure, anonymous and end-to-end verifiable elections into your software with the Vocdoni API. Quickstart, guides and full API reference for integrators.'
  ),
  'meta.developers.overview.title': t('meta.developers.overview.title', 'Developer docs overview | Vocdoni'),
  'meta.developers.overview.description': t(
    'meta.developers.overview.description',
    'Understand how the Vocdoni API fits together: organizations, censuses, voting processes, results and jobs, and how to integrate verifiable voting.'
  ),
  'meta.developers.quickstart.title': t('meta.developers.quickstart.title', 'API quickstart | Vocdoni'),
  'meta.developers.quickstart.description': t(
    'meta.developers.quickstart.description',
    'Run your first election end to end with the Vocdoni API: authenticate, create an organization, build and publish a census, create a process and read results.'
  ),
  'meta.developers.sdks_and_tools.title': t('meta.developers.sdks_and_tools.title', 'SDKs and tools | Vocdoni'),
  'meta.developers.sdks_and_tools.description': t(
    'meta.developers.sdks_and_tools.description',
    'Choose between the Vocdoni REST API and the TypeScript SDK, and find the tools, references and repositories you need to integrate.'
  ),
  'meta.developers.organizations.title': t('meta.developers.organizations.title', 'Organizations | Vocdoni'),
  'meta.developers.organizations.description': t(
    'meta.developers.organizations.description',
    'Create and manage organizations with the Vocdoni API, including users, roles and organization settings.'
  ),
  'meta.developers.members_and_groups.title': t(
    'meta.developers.members_and_groups.title',
    'Members and groups | Vocdoni'
  ),
  'meta.developers.members_and_groups.description': t(
    'meta.developers.members_and_groups.description',
    'Import organization members in bulk, track async jobs, and organize members into groups you can turn into censuses.'
  ),
  'meta.developers.census.title': t('meta.developers.census.title', 'Census | Vocdoni'),
  'meta.developers.census.description': t(
    'meta.developers.census.description',
    'Create, populate and publish a census with the Vocdoni API, choosing authentication and two-factor fields and optional vote weighting.'
  ),
  'meta.developers.voting_processes.title': t('meta.developers.voting_processes.title', 'Voting processes | Vocdoni'),
  'meta.developers.voting_processes.description': t(
    'meta.developers.voting_processes.description',
    'Configure and publish voting processes with the Vocdoni API: election parameters, vote types, questions, bundles and status changes.'
  ),
  'meta.developers.results.title': t('meta.developers.results.title', 'Results | Vocdoni'),
  'meta.developers.results.description': t(
    'meta.developers.results.description',
    'Read live and final results for a Vocdoni voting process, including vote counts, per-question tallies and result finality.'
  ),
  'meta.developers.jobs.title': t('meta.developers.jobs.title', 'Jobs and async operations | Vocdoni'),
  'meta.developers.jobs.description': t(
    'meta.developers.jobs.description',
    'Handle long-running Vocdoni operations with the async job model: enqueue work, poll job status and react to completion or failure.'
  ),
  'meta.developers.managed_organizations.title': t(
    'meta.developers.managed_organizations.title',
    'Managed organizations | Vocdoni'
  ),
  'meta.developers.managed_organizations.description': t(
    'meta.developers.managed_organizations.description',
    'Provision and manage sub-organizations for your own customers as a Vocdoni integrator, and track your quota and usage.'
  ),
  'meta.developers.api_keys.title': t('meta.developers.api_keys.title', 'API keys | Vocdoni'),
  'meta.developers.api_keys.description': t(
    'meta.developers.api_keys.description',
    'Create, list and revoke scoped API keys for the Vocdoni API, and follow best practices for storing and rotating secrets.'
  ),
  'meta.developers.quotas_and_subscriptions.title': t(
    'meta.developers.quotas_and_subscriptions.title',
    'Quotas and subscriptions | Vocdoni'
  ),
  'meta.developers.quotas_and_subscriptions.description': t(
    'meta.developers.quotas_and_subscriptions.description',
    'Understand Vocdoni subscription plans, features and limits, and read your current usage counters through the API.'
  ),
} as const

const getNestedValue = (source: unknown, key: string) => {
  return key.split('.').reduce<unknown>((value, segment) => {
    if (value && typeof value === 'object' && segment in value) {
      return (value as Record<string, unknown>)[segment]
    }

    return undefined
  }, source)
}

export const getMetaByKey = (pageContext: Vike.PageContextServer, key: string) => {
  const locale = pageContext.initialLocale || pageContext.locale || localeDefault
  const resources = pageContext.initialI18nStore
  const fallback = metaDefaults[key as keyof typeof metaDefaults] ?? key
  if (!resources || !resources[locale]) {
    return fallback
  }

  const value = getNestedValue(resources[locale]?.common, key.replace(/^common\./, ''))
  return typeof value === 'string' && value.trim() ? value : fallback
}
