export type VerificationSource = {
  label: string
  href: string
  supports: string
}

export type VerificationInlineLink = {
  label: string
  href: string
}

export type VerificationLinkedText = {
  text: string
  links?: VerificationInlineLink[]
}

export type VerificationRole = {
  id: 'voter' | 'observer' | 'tally' | 'auditor'
  number: string
  role: string
  question: string
  answer: string
  checks: string[]
  sources: VerificationSource[]
}

export type VotingVerificationChecklistContent = {
  eyebrow: string
  title: string
  lede: string
  reviewed: string
  primaryCta: string
  panelLabel: string
  panelFooter: string
  answerEyebrow: string
  answerTitle: string
  answerParagraphs: VerificationLinkedText[]
  answerSources: VerificationSource[]
  rolesEyebrow: string
  rolesTitle: string
  rolesLede: string
  checkLabel: string
  sourceLabel: string
  resultEyebrow: string
  resultTitle: string
  resultLede: string
  resultFields: Array<{ field: string; meaning: string }>
  resultImageAlt: string
  resultCaption: string
  boundaryEyebrow: string
  boundaryTitle: string
  boundaryText: string
  boundaryChecks: string[]
  boundarySource: VerificationSource
  roles: VerificationRole[]
}

export const votingVerificationChecklistContent = {
  eyebrow: 'Voting verification checklist',
  title: 'What voters, observers, and auditors can verify',
  lede: 'Use this checklist to inspect a Vocdoni vote. Each check links to the public record, current documentation, or source code that supports it.',
  reviewed: 'Evidence reviewed 5 September 2026',
  primaryCta: 'Open the public vote explorer',
  panelLabel: 'Four verification roles',
  panelFooter: 'One result. Four independent checks.',
  answerEyebrow: 'Direct answer',
  answerTitle: 'What does the public audit trail prove?',
  answerParagraphs: [
    {
      text: 'A voter can use a receipt to check whether the chain recorded their vote. An observer can read a published process and its results without an administrator account.',
    },
    {
      text: 'A tally reviewer can inspect vote counts, eligibility totals, result matrices, and the live or final state for each question.',
    },
    {
      text: "A technical auditor can repeat those public reads and inspect the open-source implementation. These checks cover the recorded result, not every administrative action. Use the online voting software guide when you compare this proof with each vendor's scope.",
      links: [{ href: '/compare/online-voting-software', label: 'online voting software guide' }],
    },
  ],
  answerSources: [
    {
      label: 'Vote receipt verification',
      href: '/developers/docs/casting-votes#verifying-a-vote-on-chain',
      supports: 'Public receipt verification and returned record fields',
    },
    {
      label: 'Published process reads',
      href: '/developers/docs/voting-processes#reading-a-process',
      supports: 'Public process, question, status, and result reads',
    },
    {
      label: 'Result fields and states',
      href: '/developers/docs/results',
      supports: 'Public tally fields, raw matrices, and live or final state',
    },
    {
      label: 'Open-source implementation',
      href: 'https://github.com/vocdoni',
      supports: 'Public protocol and product repositories',
    },
  ],
  rolesEyebrow: 'Role-by-role proof',
  rolesTitle: 'Run the check that matches your responsibility',
  rolesLede:
    'Each role starts with a different question. Save the identifiers and records you inspect so another reviewer can repeat the check.',
  checkLabel: 'Checks',
  sourceLabel: 'Evidence',
  resultEyebrow: 'Tally record',
  resultTitle: 'Read the fields before you read the winner',
  resultLede:
    'The public results response gives one record per published question. Use its identifiers, counts, matrix, and state together.',
  resultFields: [
    { field: 'questionId', meaning: 'Connects the tally to the published question.' },
    { field: 'voteCount', meaning: 'Shows ballots recorded for that question.' },
    { field: 'maxVoters', meaning: 'Shows the eligible-voter total for that question.' },
    { field: 'results', meaning: 'Contains the raw tally matrix for the voting type.' },
    { field: 'finalResults', meaning: 'Separates a live tally from a final result.' },
  ],
  resultImageAlt: 'Example Vocdoni voting interface showing a result for four options',
  resultCaption:
    'Vocdoni result interface example. The public API documentation defines the evidence fields used for verification.',
  boundaryEyebrow: 'Evidence boundary',
  boundaryTitle: 'Public result proof is not a complete admin log',
  boundaryText:
    'The public evidence covers vote inclusion, published process data, result fields, and reviewable code. It does not document every login, configuration change, permission change, message, or export.',
  boundaryChecks: [
    'Ask which administrator actions are recorded.',
    'Ask how long each record is retained.',
    'Request a sample evidence export before the vote opens.',
  ],
  boundarySource: {
    label: 'Review the audit-trail evidence register',
    href: '/security-accessibility',
    supports: 'Published result evidence and the current administrative evidence gap',
  },
  roles: [
    {
      id: 'voter',
      number: '01',
      role: 'Voter',
      question: 'Did my vote reach the public record?',
      answer: 'Keep the nullifier returned after voting. It is the receipt used by the public verification endpoint.',
      checks: [
        'Keep the receipt for each question after voting.',
        'Submit the nullifier to the public vote-verification endpoint.',
        'For a verified vote, save the process ID, transaction hash, block height, and date.',
      ],
      sources: [
        {
          label: 'Casting votes: verify a vote on chain',
          href: '/developers/docs/casting-votes#verifying-a-vote-on-chain',
          supports: 'Receipt, public endpoint, verified state, and returned record fields',
        },
      ],
    },
    {
      id: 'observer',
      number: '02',
      role: 'Observer',
      question: 'Is this the published process and result?',
      answer:
        'Published process and question reads are public. They expose the setup, status, identifiers, and available results.',
      checks: [
        'Match the process title, dates, questions, and question status.',
        'Record each question ID and its upstream election ID.',
        'Compare the public result with the process and question reads.',
      ],
      sources: [
        {
          label: 'Voting processes: read a process',
          href: '/developers/docs/voting-processes#reading-a-process',
          supports: 'Public process and question fields, status, identifiers, and inline results',
        },
        {
          label: 'Open the public vote explorer',
          href: 'https://explorer.vote',
          supports: 'Public election records and published results',
        },
      ],
    },
    {
      id: 'tally',
      number: '03',
      role: 'Tally reviewer',
      question: 'Do the published numbers resolve correctly?',
      answer:
        'The public results response reports each question separately. Its state shows whether the tally is live or final.',
      checks: [
        'Record the vote count and eligible-voter total for each question.',
        'Interpret the raw result matrix using that question’s voting type.',
        'Treat the tally as final only when finalResults is true.',
      ],
      sources: [
        {
          label: 'Results: fields, states, and interpretation',
          href: '/developers/docs/results',
          supports: 'Question-level counts, raw result matrix, and finalResults state',
        },
        {
          label: 'Voting types',
          href: '/developers/docs/voting-types',
          supports: 'How each ballot type maps to its result matrix',
        },
      ],
    },
    {
      id: 'auditor',
      number: '04',
      role: 'Technical auditor',
      question: 'Can I repeat the public checks?',
      answer: 'A technical reviewer can call the public endpoints and inspect Vocdoni’s public repositories.',
      checks: [
        'Repeat the process, question, result, and sampled receipt reads.',
        'Save the request, response, identifiers, and review time.',
        'Inspect the relevant public implementation before accepting a broader claim.',
      ],
      sources: [
        {
          label: 'Developer documentation',
          href: 'https://developer.vocdoni.io',
          supports: 'Current public API and protocol documentation',
        },
        {
          label: 'Vocdoni on GitHub',
          href: 'https://github.com/vocdoni',
          supports: 'Public protocol and product repositories',
        },
      ],
    },
  ],
} satisfies VotingVerificationChecklistContent
