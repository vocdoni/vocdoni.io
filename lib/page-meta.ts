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
    'Clear, practical guides to secure and verifiable online voting: how it works, privacy, blockchain, GDPR, legally valid AGMs and preventing election fraud.'
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
  'meta.pricing.title': t('meta.pricing.title', 'Pricing - online voting plans and project quotes - Vocdoni'),
  'meta.pricing.description': t(
    'meta.pricing.description',
    'Transparent pricing for secure online voting: a free plan, fixed annual tiers, and tailored quotes for large elections. Start free, no credit card needed.'
  ),
  'meta.solutions.title': t('meta.solutions.title', 'Online voting solutions by sector - Vocdoni'),
  'meta.solutions.description': t(
    'meta.solutions.description',
    'Explore secure online voting solutions for colleges, unions, parties, cooperatives and councils. Verifiable, GDPR compliant. Start free today.'
  ),
  'meta.solutions_professional_colleges.title': t(
    'meta.solutions_professional_colleges.title',
    'Online voting for professional colleges - Vocdoni'
  ),
  'meta.solutions_professional_colleges.description': t(
    'meta.solutions_professional_colleges.description',
    'Run statutory college elections and juntas generales with total legal cover and zero disputes. Trusted by ICOES and COIB. Start free today.'
  ),
  'meta.solutions_associations_federations.title': t(
    'meta.solutions_associations_federations.title',
    'Online voting for associations and federations - Vocdoni'
  ),
  'meta.solutions_associations_federations.description': t(
    'meta.solutions_associations_federations.description',
    'Reach quorum without the chase: members of associations and federations vote from any device. Used by Òmnium Cultural. Start free today.'
  ),
  'meta.solutions_political_parties.title': t(
    'meta.solutions_political_parties.title',
    'Online voting for political parties and primaries - Vocdoni'
  ),
  'meta.solutions_political_parties.description': t(
    'meta.solutions_political_parties.description',
    'Run party primaries and delegate elections without disputes, with private, verifiable ballots every faction trusts. Start free today.'
  ),
  'meta.solutions_trade_unions.title': t(
    'meta.solutions_trade_unions.title',
    'Online voting for trade unions - Vocdoni'
  ),
  'meta.solutions_trade_unions.description': t(
    'meta.solutions_trade_unions.description',
    'Run mass delegate elections with a full audit trail and cut election-day cost by 80%. Secret, verifiable voto sindical. Start free today.'
  ),
  'meta.solutions_chambers_of_commerce.title': t(
    'meta.solutions_chambers_of_commerce.title',
    'Online voting for chambers of commerce - Vocdoni'
  ),
  'meta.solutions_chambers_of_commerce.description': t(
    'meta.solutions_chambers_of_commerce.description',
    'Run chamber elections with weighted voting, an institutional image and eIDAS-grade evidence for every ballot. Start free today.'
  ),
  'meta.solutions_cooperatives.title': t(
    'meta.solutions_cooperatives.title',
    'Online voting for cooperatives - Vocdoni'
  ),
  'meta.solutions_cooperatives.description': t(
    'meta.solutions_cooperatives.description',
    'Run a hybrid asamblea general with vot ponderat and full legal validity under cooperative law. Decisions you can defend. Start free today.'
  ),
  'meta.solutions_ngos_foundations.title': t(
    'meta.solutions_ngos_foundations.title',
    'Online voting for NGOs and foundations - Vocdoni'
  ),
  'meta.solutions_ngos_foundations.description': t(
    'meta.solutions_ngos_foundations.description',
    'Transparent, affordable governance that matches your mission. Board elections and assemblies that are easy to run and trust. Start free.'
  ),
  'meta.solutions_universities.title': t(
    'meta.solutions_universities.title',
    'Online voting for universities - Vocdoni'
  ),
  'meta.solutions_universities.description': t(
    'meta.solutions_universities.description',
    'Run student, faculty senate and rectorate elections on one platform, with weighted colleges and verifiable results. Start free today.'
  ),
  'meta.solutions_public_administration.title': t(
    'meta.solutions_public_administration.title',
    'Online voting for public administration - Vocdoni'
  ),
  'meta.solutions_public_administration.description': t(
    'meta.solutions_public_administration.description',
    'Run participatory budgeting and citizen consultations with cryptographic proof. Trusted by city councils. Start free today.'
  ),
  'meta.solutions_sports_clubs.title': t(
    'meta.solutions_sports_clubs.title',
    'Online voting for sports clubs - Vocdoni'
  ),
  'meta.solutions_sports_clubs.description': t(
    'meta.solutions_sports_clubs.description',
    'Run board and presidential club elections the press cannot pull apart, with private, verifiable ballots. Start free today.'
  ),
  'meta.compare.title': t('meta.compare.title', 'Compare online voting platforms - Vocdoni'),
  'meta.compare.description': t(
    'meta.compare.description',
    'Compare Vocdoni with Kuorum, Polyas, Sequent, Assembly Voting and Eligo on verifiability, privacy, openness and price. Find your best fit.'
  ),
  'meta.compare_kuorum.title': t('meta.compare_kuorum.title', 'Vocdoni vs Kuorum online voting - Vocdoni'),
  'meta.compare_kuorum.description': t(
    'meta.compare_kuorum.description',
    'An honest Vocdoni vs Kuorum comparison on verifiability, privacy, open source and price, so you can pick the right online voting platform.'
  ),
  'meta.compare_polyas.title': t('meta.compare_polyas.title', 'Vocdoni vs Polyas online voting - Vocdoni'),
  'meta.compare_polyas.description': t(
    'meta.compare_polyas.description',
    'Compare Vocdoni and Polyas on verifiability, open source, free tier and transparent pricing. See which online voting platform fits your vote.'
  ),
  'meta.compare_sequent.title': t('meta.compare_sequent.title', 'Vocdoni vs Sequent online voting - Vocdoni'),
  'meta.compare_sequent.description': t(
    'meta.compare_sequent.description',
    'Compare Vocdoni and Sequent on privacy, verifiability, hosting and support. Two open approaches to verifiable online voting, side by side.'
  ),
  'meta.compare_assembly_voting.title': t('meta.compare_assembly_voting.title', 'Vocdoni vs Assembly Voting - Vocdoni'),
  'meta.compare_assembly_voting.description': t(
    'meta.compare_assembly_voting.description',
    'Compare Vocdoni and Assembly Voting on end-to-end verifiability, privacy, open source and price. Choose the right platform for your election.'
  ),
  'meta.compare_eligo.title': t('meta.compare_eligo.title', 'Vocdoni vs Eligo online voting - Vocdoni'),
  'meta.compare_eligo.description': t(
    'meta.compare_eligo.description',
    'Compare Vocdoni and Eligo on verifiability, open source and transparent pricing. See which online voting platform best fits your organization.'
  ),
  'meta.alternatives.title': t('meta.alternatives.title', 'Online voting platform alternatives - Vocdoni'),
  'meta.alternatives.description': t(
    'meta.alternatives.description',
    'Looking for a Kuorum, Polyas, Sequent or Eligo alternative? Compare verifiable, private, open source online voting platforms and start free.'
  ),
  'meta.security.title': t('meta.security.title', 'Security - verifiable, private online voting - Vocdoni'),
  'meta.security.description': t(
    'meta.security.description',
    'See how Vocdoni keeps every vote private, verifiable, open source and EU-hosted. Explore the security pillars and start a verifiable vote for free.'
  ),
  'meta.security_verifiability.title': t(
    'meta.security_verifiability.title',
    'End-to-end verifiable voting explained - Vocdoni'
  ),
  'meta.security_verifiability.description': t(
    'meta.security_verifiability.description',
    'Learn how end-to-end verifiable voting proves your ballot is cast, recorded and counted correctly. Follow a worked example and run a verifiable vote.'
  ),
  'meta.security_zero_knowledge.title': t(
    'meta.security_zero_knowledge.title',
    'Zero-knowledge voting: secret even from us - Vocdoni'
  ),
  'meta.security_zero_knowledge.description': t(
    'meta.security_zero_knowledge.description',
    'Discover how zero-knowledge voting and zk-SNARKs keep your ballot secret, receipt-free and coercion-resistant. Try anonymous, verifiable voting for free.'
  ),
  'meta.security_blockchain_voting.title': t(
    'meta.security_blockchain_voting.title',
    'Blockchain voting platform, explained honestly - Vocdoni'
  ),
  'meta.security_blockchain_voting.description': t(
    'meta.security_blockchain_voting.description',
    'Understand what the blockchain does in a voting platform, a tamper-evident public bulletin board, and what it does not. See verifiable voting in action.'
  ),
  'meta.security_audit.title': t('meta.security_audit.title', 'Audits and certifications for online voting - Vocdoni'),
  'meta.security_audit.description': t(
    'meta.security_audit.description',
    'Review the audits behind Vocdoni and the technical certification we issue for telematic votes, plus our roadmap toward SOC2 and penetration tests. Talk to our team today.'
  ),
  'meta.security_open_source.title': t(
    'meta.security_open_source.title',
    'Open source online voting you can inspect - Vocdoni'
  ),
  'meta.security_open_source.description': t(
    'meta.security_open_source.description',
    'Find out why elections should run on open source code anyone can read, reproduce and review. Explore the Vocdoni protocol and clients on GitHub now.'
  ),
  'meta.compliance.title': t('meta.compliance.title', 'Compliance: GDPR, eIDAS, ENS and LSSI - Vocdoni'),
  'meta.compliance.description': t(
    'meta.compliance.description',
    'See how Vocdoni meets GDPR, eIDAS, ENS and LSSI with EU hosting and a DPA available on request. Request a data processing addendum for your organization.'
  ),
  'meta.case_studies.title': t('meta.case_studies.title', 'Online voting case studies - Vocdoni'),
  'meta.case_studies.description': t(
    'meta.case_studies.description',
    'See how professional colleges, city councils and citizen initiatives run secure, verifiable online voting with Vocdoni. Real projects, real results.'
  ),
  'meta.case_studies_icoes.title': t('meta.case_studies_icoes.title', 'ICOES college elections case study - Vocdoni'),
  'meta.case_studies_icoes.description': t(
    'meta.case_studies_icoes.description',
    'How the Official College of Nursing of Seville digitized its electoral process with Vocdoni, with an audited technical certification and full legal cover.'
  ),
  'meta.case_studies_coib.title': t('meta.case_studies_coib.title', 'COIB online assembly case study - Vocdoni'),
  'meta.case_studies_coib.description': t(
    'meta.case_studies_coib.description',
    'How the Official College of Nurses of Barcelona ran its assembly online for around 180,000 members, with instant and verifiable results.'
  ),
  'meta.case_studies_ccv_supernodes.title': t(
    'meta.case_studies_ccv_supernodes.title',
    'CCV SuperNodes channel partnership case study - Vocdoni'
  ),
  'meta.case_studies_ccv_supernodes.description': t(
    'meta.case_studies_ccv_supernodes.description',
    'How the CCV SuperNodes partner programme brings verifiable online voting to more organizations through trusted distribution partners.'
  ),
  'meta.case_studies_ilp.title': t('meta.case_studies_ilp.title', 'ILP digital platform case study - Vocdoni'),
  'meta.case_studies_ilp.description': t(
    'meta.case_studies_ilp.description',
    'How the Plataforma Digital Vocdoni supports citizen initiatives with digital signature collection and a verifiable process for public administration.'
  ),
  'meta.case_studies_municipal_pilot.title': t(
    'meta.case_studies_municipal_pilot.title',
    'Municipal digital voting pilot case study - Vocdoni'
  ),
  'meta.case_studies_municipal_pilot.description': t(
    'meta.case_studies_municipal_pilot.description',
    'How city councils piloted municipal digital voting with guarantees, giving residents secure, verifiable and hybrid participation with Vocdoni.'
  ),
  'meta.use_cases_agm_voting.title': t('meta.use_cases_agm_voting.title', 'How to run an online AGM - Vocdoni'),
  'meta.use_cases_agm_voting.description': t(
    'meta.use_cases_agm_voting.description',
    'Run your annual general meeting online with verifiable results and quorum tracking. A step-by-step guide to online AGM voting. Start free.'
  ),
  'meta.use_cases_board_elections.title': t(
    'meta.use_cases_board_elections.title',
    'Run board elections online - Vocdoni'
  ),
  'meta.use_cases_board_elections.description': t(
    'meta.use_cases_board_elections.description',
    'Hold secret, verifiable board and committee elections online from any device. A step-by-step guide to running board elections. Start free.'
  ),
  'meta.use_cases_primaries.title': t('meta.use_cases_primaries.title', 'Run party primaries online - Vocdoni'),
  'meta.use_cases_primaries.description': t(
    'meta.use_cases_primaries.description',
    'Run online primaries with private, verifiable ballots and no disputes. A step-by-step guide to digital primary elections. Start free.'
  ),
  'meta.use_cases_delegate_elections.title': t(
    'meta.use_cases_delegate_elections.title',
    'Run delegate elections online - Vocdoni'
  ),
  'meta.use_cases_delegate_elections.description': t(
    'meta.use_cases_delegate_elections.description',
    'Run large-scale delegate elections online with a full audit trail and instant results. A step-by-step guide for unions and parties. Start free.'
  ),
  'meta.use_cases_bylaws_amendments.title': t(
    'meta.use_cases_bylaws_amendments.title',
    'Vote on bylaws amendments online - Vocdoni'
  ),
  'meta.use_cases_bylaws_amendments.description': t(
    'meta.use_cases_bylaws_amendments.description',
    'Approve statute and bylaws amendments online with verifiable, legally valid results. A step-by-step guide to amendment votes. Start free.'
  ),
  'meta.use_cases_participatory_budgeting.title': t(
    'meta.use_cases_participatory_budgeting.title',
    'Run participatory budgeting online - Vocdoni'
  ),
  'meta.use_cases_participatory_budgeting.description': t(
    'meta.use_cases_participatory_budgeting.description',
    'Run participatory budgeting with cryptographic proof and instant results. A step-by-step guide for councils and institutions. Start free.'
  ),
  'meta.use_cases_weighted_voting.title': t(
    'meta.use_cases_weighted_voting.title',
    'Run weighted voting online - Vocdoni'
  ),
  'meta.use_cases_weighted_voting.description': t(
    'meta.use_cases_weighted_voting.description',
    'Run online votes with weighted shares or seats and verifiable tallies. A step-by-step guide to weighted voting (vot ponderat). Start free.'
  ),
  'meta.use_cases_citizen_consultations.title': t(
    'meta.use_cases_citizen_consultations.title',
    'Run citizen consultations online - Vocdoni'
  ),
  'meta.use_cases_citizen_consultations.description': t(
    'meta.use_cases_citizen_consultations.description',
    'Run secure citizen consultations and surveys with verifiable results. A step-by-step guide for public participation. Start free.'
  ),
  'meta.use_cases_hybrid_voting.title': t(
    'meta.use_cases_hybrid_voting.title',
    'Run hybrid in-person and remote voting - Vocdoni'
  ),
  'meta.use_cases_hybrid_voting.description': t(
    'meta.use_cases_hybrid_voting.description',
    'Combine in-person and remote ballots in one verifiable count. A step-by-step guide to hybrid voting for assemblies. Start free.'
  ),
  'meta.use_cases_referenda.title': t('meta.use_cases_referenda.title', 'Run an online referendum - Vocdoni'),
  'meta.use_cases_referenda.description': t(
    'meta.use_cases_referenda.description',
    'Run yes/no referenda and consultations online with private, verifiable ballots. A step-by-step guide to digital referenda. Start free.'
  ),
  'meta.learn.title': t('meta.learn.title', 'Learn about online voting - Vocdoni'),
  'meta.learn.description': t(
    'meta.learn.description',
    'Plain-language guides to how online voting works, election security and cryptographic voting. Build the background to choose a platform with confidence.'
  ),
  'meta.learn_how_online_voting_works.title': t(
    'meta.learn_how_online_voting_works.title',
    'How online voting works - Vocdoni'
  ),
  'meta.learn_how_online_voting_works.description': t(
    'meta.learn_how_online_voting_works.description',
    'From census to verified result: a clear, step-by-step explanation of how secure online voting works. Learn the basics and try it for free.'
  ),
  'meta.learn_election_security.title': t(
    'meta.learn_election_security.title',
    'Election security explained - Vocdoni'
  ),
  'meta.learn_election_security.description': t(
    'meta.learn_election_security.description',
    'What threatens elections and how privacy, verifiability and tamper-evidence protect them. A plain-language guide to election security.'
  ),
  'meta.learn_cryptographic_voting.title': t(
    'meta.learn_cryptographic_voting.title',
    'Cryptographic voting explained - Vocdoni'
  ),
  'meta.learn_cryptographic_voting.description': t(
    'meta.learn_cryptographic_voting.description',
    'zk-SNARKs, mixnets, threshold cryptography and end-to-end verifiability, explained for non-cryptographers. Learn how cryptographic voting works.'
  ),
  'meta.resources.title': t('meta.resources.title', 'Online voting resources and guides - Vocdoni'),
  'meta.resources.description': t(
    'meta.resources.description',
    'Free guides, checklists, templates and a glossary for running secure online votes. Everything you need to plan your next election. Start free.'
  ),
  'meta.resources_online_voting_guide.title': t(
    'meta.resources_online_voting_guide.title',
    'The complete guide to online voting - Vocdoni'
  ),
  'meta.resources_online_voting_guide.description': t(
    'meta.resources_online_voting_guide.description',
    'A complete guide to online voting for organizations: why, how, choosing a platform, legal validity and running your first vote. Read the guide.'
  ),
  'meta.resources_agm_checklist.title': t('meta.resources_agm_checklist.title', 'Online AGM checklist - Vocdoni'),
  'meta.resources_agm_checklist.description': t(
    'meta.resources_agm_checklist.description',
    'A practical checklist for running your annual general meeting online, from census to verified results. Plan a smooth, valid AGM. Start free.'
  ),
  'meta.resources_election_rules_template.title': t(
    'meta.resources_election_rules_template.title',
    'Election rules template - Vocdoni'
  ),
  'meta.resources_election_rules_template.description': t(
    'meta.resources_election_rules_template.description',
    'A ready-made election and voting rules template you can adapt for your statutes. Set clear, fair rules for your next vote. Get the template.'
  ),
  'meta.resources_glossary.title': t('meta.resources_glossary.title', 'Online voting glossary - Vocdoni'),
  'meta.resources_glossary.description': t(
    'meta.resources_glossary.description',
    'Clear definitions of online voting terms: end-to-end verifiability, zk-SNARK, mixnet, quorum, weighted voting and more. Learn the vocabulary.'
  ),
  'meta.product.title': t('meta.product.title', 'The Vocdoni online voting platform - Vocdoni'),
  'meta.product.description': t(
    'meta.product.description',
    'An overview of the Vocdoni platform: private, end-to-end verifiable online voting with weighted and hybrid ballots. Explore the product. Start free.'
  ),
  'meta.product_features.title': t('meta.product_features.title', 'Online voting features - Vocdoni'),
  'meta.product_features.description': t(
    'meta.product_features.description',
    'Voting methods, 2FA, white-label portals, multi-language and accessibility, hybrid voting and instant results. Explore every Vocdoni feature.'
  ),
  'meta.product_integrations.title': t(
    'meta.product_integrations.title',
    'Online voting integrations and API - Vocdoni'
  ),
  'meta.product_integrations.description': t(
    'meta.product_integrations.description',
    'Connect Vocdoni with SSO, your CRM and member databases, or build with the API and SDK. See how Vocdoni fits your stack. Start free.'
  ),
  'meta.api_sdk.title': t('meta.api_sdk.title', 'Voting API and SDK for developers - Vocdoni'),
  'meta.api_sdk.description': t(
    'meta.api_sdk.description',
    'Build verifiable voting into your product with the Vocdoni SDK and API. Real code to create a census, launch an election, cast votes and read results, plus a ready-made voter frontend.'
  ),
  'meta.partners.title': t('meta.partners.title', 'Partner programme for online voting - Vocdoni'),
  'meta.partners.description': t(
    'meta.partners.description',
    'Join the Vocdoni partner programme: resellers, integrators and public-sector channels bringing verifiable online voting to more organizations.'
  ),
  'meta.customers.title': t('meta.customers.title', 'Customers and success stories - Vocdoni'),
  'meta.customers.description': t(
    'meta.customers.description',
    'Colleges, unions, associations and city councils trust Vocdoni for secure, verifiable online voting. See who votes with Vocdoni and why.'
  ),
  'meta.changelog.title': t('meta.changelog.title', 'Product changelog - Vocdoni'),
  'meta.changelog.description': t(
    'meta.changelog.description',
    'Recent improvements to the Vocdoni online voting platform: verifiability, performance, languages and accessibility. See what is new.'
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
