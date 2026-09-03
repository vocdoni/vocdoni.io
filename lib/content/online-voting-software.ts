import type { OnlineVotingSoftwareContent } from '@/components/comparisons/OnlineVotingSoftwareGuide'

export const onlineVotingSoftwareContent = {
  eyebrow: 'Voting software guide',
  title: 'How to choose online voting software',
  intro:
    'Choose the service model before you compare feature lists. This guide separates self-service voting tools, managed election services, and full meeting suites by buyer need.',
  reviewed: 'Vendor facts reviewed 30 August 2026',
  primary_cta: 'Try Vocdoni with a test vote',
  primary_cta_aria: 'Try Vocdoni with a test vote in a new tab',
  image_alt: 'Vocdoni election builder showing a ballot question and voting choices',
  image_caption: 'A real self-service election builder',
  models_eyebrow: 'Start with the operating model',
  models_title: 'Three products can all be called voting software',
  models_intro:
    'The right category depends on who will configure the ballot, support voters, and run the meeting around it.',
  models: [
    {
      title: 'Self-service voting tool',
      text: 'Your team builds the ballot, imports eligible voters, sends access, and closes the vote. This usually gives you the most control and the lowest service cost.',
    },
    {
      title: 'Managed election service',
      text: 'The vendor helps design or operate the election. Choose this when internal capacity, governance risk, or a complex voter roll makes expert support worth the added cost.',
    },
    {
      title: 'Full meeting suite',
      text: 'Voting sits beside registration, live broadcast, questions, and meeting access. Choose this when one platform must run the whole AGM, not only the ballot.',
    },
  ],
  shortlist_eyebrow: 'Compare by fit, not rank',
  shortlist_title: 'A practical four-vendor shortlist',
  shortlist_intro:
    'Each option serves a different job. Confirm the exact ballot method, voter count, support scope, and final price with the vendor before purchase.',
  vendors: [
    {
      name: 'Vocdoni',
      model: 'Open-source self-service software, with managed projects',
      best_for:
        'Associations and organizations that need verifiable single-choice or multiple-choice ballots, equal or weighted voting, and results that participants can check.',
      check:
        'The current self-service builder does not offer ranked ballots. It also does not replace an AGM broadcast and question platform.',
    },
    {
      name: 'ElectionBuddy',
      model: 'Per-election software, from do-it-yourself to managed',
      best_for:
        'Teams that want many published ballot methods, including first-past-the-post, cumulative, preferential, scored, approval, and single transferable vote.',
      check:
        'Its published pricing changes with eligible voter count and feature tier. Decide the support level before comparing the total cost.',
    },
    {
      name: 'Simply Voting',
      model: 'Self-administered software or managed service',
      best_for:
        'Organizations that need preferential ballots, voter segmentation, weighted votes, or integration with an existing authentication system.',
      check:
        'Its pricing is based on eligible voters. Ask whether your election needs self-service or a managed quote before budgeting.',
    },
    {
      name: 'OpaVote',
      model: 'Pay-as-you-go self-service software',
      best_for:
        'Smaller or technical teams that prioritize ranked-choice methods, single transferable vote, Condorcet methods, or an election API.',
      check:
        'Compare identity controls, organizer support, and the operating workflow against your governance needs, not only the ballot methods.',
    },
  ],
  vendor_fit_label: 'Best for',
  vendor_check_label: 'Verify before buying',
  official_details: 'Product details',
  official_scope: 'Pricing or current scope',
  meeting_title: 'A ballot tool is not a full AGM suite',
  meeting_text:
    "Lumi is an example of a meeting suite. Its AGM product combines registration, controlled access, live voting, structured questions, and broadcast. Vocdoni's self-service app focuses on the election itself. If your event needs every meeting function in one contract, compare meeting suites separately.",
  meeting_source: "See Lumi's official AGM page",
  checklist_title: 'Ask these six questions before a demo',
  checklist_intro: 'A short written answer to each question makes vendor calls easier to compare.',
  checklist: [
    'Which ballot methods do our bylaws require?',
    'Do votes have equal weight, or does each voter carry a different weight?',
    'Who imports and checks the eligible voter list?',
    'Who supports voters before and during the election?',
    'What evidence can voters, observers, and auditors verify after the result?',
    'Do we need only the ballot, or registration, broadcast, questions, and minutes too?',
  ],
  fit_title: 'When Vocdoni is the right path',
  fit_intro:
    'Vocdoni is a strong option for transparent organizational voting. It is not the answer to every election format or meeting workflow.',
  fit_yes_title: 'Strong fit',
  fit_yes: [
    'Your organization runs single-choice or multiple-choice votes with equal or weighted voting.',
    'You want open-source software and a result that participants can verify independently.',
    'Your team can run a self-service election, or you can scope a managed election project with Vocdoni.',
  ],
  fit_no_title: 'Choose another path when',
  fit_no: [
    'Your bylaws require ranked-choice, Condorcet, or single transferable vote in the self-service builder today.',
    'One supplier must provide the live AGM broadcast, structured questions, and the ballot in one meeting suite.',
    'You need a vendor to operate every election step, but have not confirmed that managed scope and price.',
  ],
  method_title: 'How this guide was checked',
  method_text:
    'We reviewed official product, feature, method, and pricing pages from each vendor. We also checked the current Vocdoni self-service question settings. This is a buyer-fit guide, not a performance ranking. We did not independently operate competitor elections.',
  source_note: 'Sources reviewed 30 August 2026. Product scope and pricing can change.',
  related_links: {
    home: 'Vocdoni homepage',
    agm: 'AGM voting for companies',
    pricing: 'Vocdoni pricing',
    electionbuddy_alternatives: 'ElectionBuddy alternatives',
  },
} satisfies OnlineVotingSoftwareContent
