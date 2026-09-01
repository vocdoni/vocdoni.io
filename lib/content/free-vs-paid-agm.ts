export const AGM_PLAN_SOURCE = 'https://app.vocdoni.io/en/plans'

export const agmGuideContent = {
  eyebrow: 'AGM plan guide',
  title: 'Free or paid AGM voting? Start with your election size',
  intro: 'Vocdoni Free covers up to 100 members, five counted votes each year, and one administrator.',
  primaryCta: 'Start a free test vote',
  primaryCtaAria: 'Start a free test vote in a new tab',
  imageCaption: 'A real AGM ballot in the Vocdoni builder',
  imageAlt: 'Vocdoni election builder with a ballot question and voting choices',
  plansEyebrow: 'Current self-service plans',
  plansTitle: 'Compare the limits that change your AGM plan',
  plansLede: 'Use your eligible member count, yearly vote count, and administrator count. Prices below exclude VAT.',
  mobileTableHint: 'Swipe across the table to see every limit.',
  tableHeaders: {
    plan: 'Plan',
    price: 'Price',
    members: 'Members',
    votes: 'Counted votes',
    admins: 'Administrators',
    codes: 'Included access codes',
  },
  testVoteNote: 'Votes with fewer than 10 participants are test votes. They do not count toward the yearly vote limit.',
  reviewed: 'Plans reviewed 1 September 2026',
  upgradeEyebrow: 'Upgrade test',
  upgradeTitle: 'Move to paid when one limit becomes real',
  upgradeLede: 'Do not upgrade for a future possibility. Upgrade when your AGM crosses a limit you can count.',
  managedEyebrow: 'Separate service',
  managedTitle: 'Managed elections are not a paid plan tier',
  managedText:
    "The prices above cover Vocdoni's self-service app. If you want Vocdoni's team to help run a complex election, ask about a managed project. Vocdoni scopes and quotes that work separately.",
  managedCta: 'Ask about a managed election',
  chooseEyebrow: 'Before you choose',
  chooseTitle: 'Three counts settle most plan decisions',
  chooseLede: 'Write these numbers down before you open the election builder.',
  relatedTitle: 'Plan the AGM before you build the ballot',
  relatedLede: 'Use these guides to confirm your meeting rules, voting workflow, and evidence needs.',
  buyingPathLead: 'Compare',
  buyingPathLinks: [
    { href: '/pricing', label: 'Vocdoni pricing' },
    { href: '/compare/online-voting-software', label: 'online voting software' },
    { href: '/compare/agm-voting-platforms', label: 'AGM voting platforms' },
    { href: '/alternatives/electionbuddy-alternatives', label: 'ElectionBuddy alternatives' },
  ],
  buyingPathEnd: 'before you choose.',
  relatedLinks: {
    validAgm: 'Run a legally valid AGM online',
    companies: 'AGM voting for companies',
    caseStudy: 'See an AGM voting case study',
  },
} as const

export const agmPlans = [
  {
    name: 'Free',
    price: '€0',
    members: '100',
    votes: '5 per year',
    admins: '1',
    codes: '100 email',
  },
  {
    name: 'Essential',
    price: '€69 monthly or €590 yearly',
    members: '1,000',
    votes: '20 per year',
    admins: '2',
    codes: '1,000 email + 1,000 SMS',
  },
  {
    name: 'Premium',
    price: '€199 monthly or €1,890 yearly',
    members: '5,000',
    votes: '50 per year',
    admins: '5',
    codes: '5,000 email + 5,000 SMS',
  },
] as const

export const paidTriggers = [
  {
    title: 'Your member list passes 100',
    text: 'Essential raises the member limit to 1,000. Premium raises it to 5,000.',
  },
  {
    title: 'You need more than five counted votes',
    text: 'Essential includes 20 counted votes each year. Premium includes 50.',
  },
  {
    title: 'More than one person must administer voting',
    text: 'Essential includes two administrators. Premium includes five.',
  },
  {
    title: 'You need SMS access codes',
    text: 'The Free plan includes email codes only. Essential and Premium include email and SMS codes.',
  },
] as const

export const choiceSteps = [
  'Count every member who can vote, not only the turnout you expect.',
  'Count the AGM resolutions and other real votes you plan to run this year.',
  'Count the people who need administrator access before setup begins.',
] as const
