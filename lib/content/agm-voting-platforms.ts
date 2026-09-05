export type AgmPlatform = {
  name: string
  nameHref?: string
  model: string
  summary: string
  price: string
  priceLinks?: readonly InlineLink[]
  check: string
  detailsHref: string
  priceHref: string
}

export type InlineLink = {
  label: string
  href: string
}

export type LinkedTextContent = {
  text: string
  links?: readonly InlineLink[]
}

export const agmPlatformGuideContent = {
  eyebrow: 'AGM platform guide',
  title: 'Choose the AGM job before you choose the platform',
  intro:
    'Some platforms run the vote. Others run registration, questions, broadcast, and voting together. Start with that boundary.',
  reviewed: 'Vendor facts and prices reviewed 1 September 2026',
  primaryCta: 'Start a free test vote',
  primaryCtaAria: 'Start a free test vote in Vocdoni in a new tab',
  imageCaption: 'The Vocdoni ballot builder',
  imageAlt: 'Vocdoni election builder showing a ballot question and voting choices',
  boundaryEyebrow: 'The first decision',
  boundaryTitle: 'Do you need a voting layer or the whole meeting?',
  boundaryIntro:
    'Write down who owns each meeting task. This stops a ballot feature list from hiding a larger event gap.',
  votingLayerTitle: 'Voting layer',
  votingLayerText:
    'Choose this when you already have tools for attendance, discussion, broadcast, and minutes. The voting platform handles eligible voters, motions, ballots, and the tally.',
  meetingSuiteTitle: 'Full AGM meeting suite',
  meetingSuiteText:
    'Choose this when one supplier must cover registration, quorum, proxies, live questions, broadcast, voting, and the meeting record.',
  serviceNoteTitle: 'Service level is a separate choice',
  serviceNoteText:
    'A voting layer can be self-service or managed. A meeting suite can also include event production. Confirm who builds the ballot and supports participants.',
  optionsEyebrow: 'Verified shortlist',
  optionsTitle: 'Five options for two different AGM jobs',
  optionsIntro:
    'These are not product scores. Each option fits a different operating model, ballot need, and budget process.',
  votingOptionsTitle: 'Ballot and live-voting platforms',
  votingOptionsHref: '/compare/online-voting-software',
  suiteOptionsTitle: 'Full AGM meeting suites',
  priceLabel: 'Published price path',
  checkLabel: 'Check before buying',
  productSourceLabel: 'Official product page',
  priceSourceLabel: 'Official price source',
  checklistEyebrow: 'Shortlist test',
  checklistTitle: 'Ask six questions before you book a demo',
  checklistIntro: 'Get each answer in writing. Your bylaws and local law still control the final workflow.',
  checklist: [
    { text: 'Does the platform run only voting, or registration, questions, broadcast, and attendance too?' },
    { text: 'Can it model your motions, voter groups, voting weights, and result-release rules?' },
    { text: 'How will you establish quorum and combine remote, in-room, and pre-meeting participation?' },
    { text: 'Who checks the eligible voter list and supports participants on meeting day?' },
    {
      text: 'What can voters, observers, and auditors verify after voting closes?',
      links: [
        {
          href: '/voting-verification-checklist',
          label: 'voters, observers, and auditors verify after voting closes',
        },
      ],
    },
    { text: 'What is included in the price, and which support or event services cost more?' },
  ] satisfies LinkedTextContent[],
  fitTitle: 'When Vocdoni is the right fit',
  fitIntro:
    'Vocdoni is a ballot-focused option for organizations that value verifiable results. Review named customer and deployment records before you shortlist it. It does not replace a full AGM meeting suite.',
  fitIntroLinks: [
    { href: '/solutions/companies-agm', label: 'Vocdoni is a ballot-focused option' },
    { href: '/customers-and-deployments', label: 'customer and deployment records' },
  ],
  fitYesTitle: 'Choose Vocdoni when',
  fitYes: [
    'Your existing meeting stack already covers broadcast, discussion, attendance, and minutes.',
    'Your AGM uses single-choice or multiple-choice motions with equal or weighted voting.',
    'You want open-source voting software and results that participants can verify.',
  ],
  fitNoTitle: 'Choose another path when',
  fitNo: [
    'One supplier must run registration, quorum, proxies, live questions, broadcast, and voting together.',
    'Your self-service ballot needs methods beyond the current single-choice and multiple-choice builder.',
    'You need a fully produced AGM before you have confirmed a managed project scope.',
  ],
  methodTitle: 'How this guide was checked',
  methodText:
    "We checked each vendor's official AGM, product, and pricing pages. Published prices can change. Confirm the final quote and service scope before purchase.",
} as const

export const votingPlatforms: AgmPlatform[] = [
  {
    name: 'Vocdoni',
    model: 'Open-source voting layer',
    summary:
      'A self-service voting app for single-choice or multiple-choice motions, equal or weighted voting, and independently verifiable results. Managed election projects are available separately.',
    price:
      'Starts at €0. Paid self-service plans use monthly or yearly pricing. Vocdoni quotes managed projects separately.',
    priceLinks: [
      { href: '/pricing', label: 'Starts at €0.' },
      { href: '/agm-voting/free-vs-paid', label: 'Paid self-service plans use monthly or yearly pricing.' },
    ],
    check:
      'Vocdoni does not provide the broadcast, live question, attendance, or meeting-production layer of a full AGM suite.',
    detailsHref: 'https://vocdoni.io/en/app',
    priceHref: 'https://app.vocdoni.io/en/plans',
  },
  {
    name: 'ElectionBuddy',
    nameHref: '/alternatives/electionbuddy-alternatives',
    model: 'Meeting-vote and election software',
    summary:
      'MeetingVote handles motions during in-person, remote, or hybrid meetings. ElectionBuddy also offers setup review and managed voting support.',
    price:
      'Its official example prices a 150-voter MeetingVote with Voting Groups at US$397. Final price depends on eligible voters and features.',
    check:
      'Confirm the number of included motions, support level, and the separate tools used for the meeting around the vote.',
    detailsHref: 'https://electionbuddy.com/',
    priceHref: 'https://electionbuddy.com/pricing/',
  },
  {
    name: 'POLYAS',
    model: 'Self-service live voting, with service options',
    summary:
      'POLYAS Live Voting opens motions during virtual or on-site meetings. Organizers can run it themselves or add POLYAS service support.',
    price:
      'Live Voting has a €50 base price. The total depends on eligible voters, features, service, and applicable tax.',
    check:
      'POLYAS treats streaming, event production, and other hybrid-event tools as separate parts of the meeting stack.',
    detailsHref: 'https://www.polyas.com/live-voting/hybrid-events',
    priceHref: 'https://www.polyas.com/products/pricing/live-voting',
  },
]

export const meetingSuites: AgmPlatform[] = [
  {
    name: 'Lumi Global',
    model: 'Full AGM meeting suite',
    summary:
      'Lumi combines registration, attendance and quorum controls, proxy and live voting, moderated questions, broadcast, and reporting.',
    price: 'Lumi does not publish an AGM list price. Buyers book a tailored demo and sales discussion.',
    check:
      'Use this category when one platform must run the shareholder meeting and the vote. Confirm local service scope and final pricing.',
    detailsHref: 'https://www.lumiglobal.com/agm',
    priceHref: 'https://www.lumiglobal.com/demo',
  },
  {
    name: 'Vero AGM',
    model: 'Managed AGM meeting suite',
    summary:
      'Vero covers virtual or hybrid meetings with registration, proxy and attendance management, live voting, questions, and integrated video and slides.',
    price: 'Vero uses tailored quotes. Its quote form asks for the meeting type, voter count, and date.',
    check:
      'Vero focuses on managed meeting delivery. Confirm jurisdiction, production support, and the exact audit package in your quote.',
    detailsHref: 'https://www.verovoting.com.au/vero-agm/',
    priceHref: 'https://www.verovoting.com.au/request-a-quote/',
  },
]
