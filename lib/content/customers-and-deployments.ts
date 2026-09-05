export type DeploymentSource = {
  label: string
  href: string
  publisher: string
  supports: string
}

export type DeploymentRecord = {
  organization: string
  organizationType: string
  relationship: string
  date: string
  electorate: string
  ballots: string
  turnout: string
  productRole: string
  evidenceNote: string
  logo: 'coib' | 'esquerra' | 'bellpuig'
  sources: DeploymentSource[]
}

export type CustomersAndDeploymentsContent = {
  eyebrow: string
  title: string
  lede: string
  reviewed: string
  primaryCta: string
  evidencePanelLabel: string
  evidencePanelItems: string[]
  evidencePanelCountText: string
  answerEyebrow: string
  answerTitle: string
  answerParagraphs: string[]
  registryEyebrow: string
  registryTitle: string
  registryLede: string
  relationshipLabel: string
  factLabels: {
    date: string
    electorate: string
    ballots: string
    turnout: string
    productRole: string
  }
  evidenceNoteLabel: string
  sourceLabel: string
  methodEyebrow: string
  methodTitle: string
  methodIntro: string
  methodRules: string[]
  relatedLabel: string
  relatedTitle: string
  relatedText: string
  relatedLink: string
  records: DeploymentRecord[]
}

export const customersAndDeploymentsContent = {
  eyebrow: 'Deployment evidence registry',
  title: 'Customer and deployment evidence, source by source',
  lede: "These records show where Vocdoni's role is documented. Each entry separates organization facts from Vocdoni's first-hand deployment account.",
  reviewed: 'Evidence last reviewed 5 September 2026',
  primaryCta: 'Start a free test vote',
  evidencePanelLabel: 'Evidence standard',
  evidencePanelItems: ['Named relationship', 'Dated process', 'Published election facts', 'Direct primary sources'],
  evidencePanelCountText: 'records that meet the current proof threshold',
  answerEyebrow: 'Direct answer',
  answerTitle: 'Which organizations have used Vocdoni?',
  answerParagraphs: [
    'Primary records identify a COIB remote-voting pilot, an Esquerra Republicana member consultation, and a Bellpuig citizen consultation.',
    'The relationship differs in each case. COIB names a pilot platform. Esquerra is documented by the organizer and Vocdoni. Bellpuig records paid platform and process support.',
    'This is a checked registry, not a complete customer list. Missing evidence means a name stays off the page.',
  ],
  registryEyebrow: 'Verified records',
  registryTitle: 'Three relationships with direct evidence',
  registryLede:
    'Every record gives the process date, electorate, published participation facts, product role, and the source supporting each claim.',
  relationshipLabel: 'Relationship',
  factLabels: {
    date: 'Process date',
    electorate: 'Electorate',
    ballots: 'Ballots',
    turnout: 'Turnout',
    productRole: 'Product role',
  },
  evidenceNoteLabel: 'Evidence boundary',
  sourceLabel: 'Direct sources',
  methodEyebrow: 'Inclusion method',
  methodTitle: 'How a record qualifies',
  methodIntro:
    'We include a relationship only when a primary organization record, a first-hand Vocdoni account, or both support it.',
  methodRules: [
    'Name the relationship as customer, organizer, provider, partner, integration, or pilot.',
    'Show the process date and every published participation fact. Mark missing facts as not published.',
    'Link to the original organization or provider record. Do not rely on a third-party summary.',
    'Remove a name when the available source does not prove the relationship.',
  ],
  relatedLabel: 'Planning a vote?',
  relatedTitle: 'Compare the service model before the feature list',
  relatedText:
    'Use the buyer guide to compare self-service voting tools, managed election services, and full meeting suites.',
  relatedLink: 'Read the online voting software guide',
  records: [
    {
      organization: 'COIB',
      organizationType: 'Professional body',
      relationship: 'Named remote-voting pilot platform',
      date: '6 March 2025 pilot; 18 March 2025 AGM',
      electorate: 'COIB members. The official sources do not publish an eligible total.',
      ballots: 'Not published by COIB',
      turnout: 'Not published by COIB',
      productRole: 'Hosted the named remote-voting pilot used to test the electronic voting tool before the AGM.',
      evidenceNote:
        "COIB names coib.vocdoni.vote for the pilot. Its later report confirms the AGM's first electronic vote, but does not name that supplier.",
      logo: 'coib',
      sources: [
        {
          label: 'COIB pilot notice',
          href: 'https://www.coib.cat/ca-es/actualitat/noticies-del-col-legi/participa-la-prova-pilot-de-vot-telematic-del-coib.html',
          publisher: 'COIB',
          supports: 'Pilot date, electorate, named Vocdoni platform, and intended AGM use',
        },
        {
          label: 'COIB AGM report',
          href: 'https://www.coib.cat/ca-es/actualitat/noticies-del-col-legi/assemblea-del-coib-aprova-els-pressupostos-de-2025-la-memoria-el-tancament-economic-del-2024.html',
          publisher: 'COIB',
          supports: 'AGM date and first use of electronic voting at the AGM',
        },
        {
          label: 'Vocdoni deployment account',
          href: '/blog/how-coib-a-professional-body-of-nurses-ran-its-2025-annual-general-meeting-vote-online-securely-and-with-instant-results',
          publisher: 'Vocdoni',
          supports: "Vocdoni's first-hand account of its AGM role",
        },
      ],
    },
    {
      organization: 'Esquerra Republicana de Catalunya',
      organizationType: 'Political party',
      relationship: 'Voting platform provider for a member consultation',
      date: '2 August 2024',
      electorate: 'Esquerra Republicana members. The official source does not publish an eligible total.',
      ballots: '6,349',
      turnout: '77% in the party report; 77.12% in the Vocdoni account',
      productRole:
        'Provided the online voting system for the member consultation, according to the deployment account.',
      evidenceNote:
        'The party source confirms the date, ballot total, turnout, and result. The Vocdoni source documents the provider relationship and product role.',
      logo: 'esquerra',
      sources: [
        {
          label: 'Esquerra result report',
          href: 'https://www.esquerra.cat/rovira-consulta-preacord/',
          publisher: 'Esquerra Republicana',
          supports: 'Date, member electorate, ballot total, turnout, and result',
        },
        {
          label: 'Vocdoni deployment account',
          href: '/blog/esquerra-republicana-political-party-membership-vote-with-vocdoni-77-12-turnout-in-a-decisive-political-decision',
          publisher: 'Vocdoni',
          supports: 'Provider relationship, product role, ballot total, and precise turnout',
        },
      ],
    },
    {
      organization: 'Bellpuig Council',
      organizationType: 'Municipality',
      relationship: 'Paid platform subscription and process-support provider',
      date: '21 April to 5 May 2022',
      electorate:
        'Bellpuig residents aged 16 or older by 1 October 2020, with residence since at least 1 January 2016.',
      ballots: '1,095 in the Vocdoni account',
      turnout: '31.67% in the Vocdoni account',
      productRole: 'Provided the electronic voting platform subscription and support for the participation process.',
      evidenceNote:
        "The council's decree names Vocdoni in the cost schedule. The council publishes the voting rules and dates. Vocdoni publishes the participation result.",
      logo: 'bellpuig',
      sources: [
        {
          label: 'Bellpuig consultation notice',
          href: 'https://www.bellpuig.cat/actualitat/noticies/decret-de-convocatoria-de-la-primera-consulta-popular-no-referendaria-de-bellpuig-1',
          publisher: 'Bellpuig Council',
          supports: 'Dates, electorate, question, and electronic voting method',
        },
        {
          label: 'Bellpuig decree and cost schedule',
          href: 'https://www.bellpuig.cat/actualitat/noticies/decret-de-convocatoria-de-la-primera-consulta-popular-no-referendaria-de-bellpuig/consultapopular1623153402747-docx.pdf',
          publisher: 'Bellpuig Council',
          supports: 'Vocdoni process support and one-year platform subscription',
        },
        {
          label: 'Vocdoni deployment account',
          href: '/blog/referendum-bellpuig',
          publisher: 'Vocdoni',
          supports: 'Ballot total, turnout, and product role',
        },
      ],
    },
  ],
} satisfies CustomersAndDeploymentsContent
