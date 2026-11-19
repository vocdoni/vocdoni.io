export type ChangelogCategory = {
  type: 'new' | 'improvements' | 'bugfixes'
  items: string[]
}

export type ChangelogEntry = {
  version: string
  date: string
  title: string
  description: string
  bullets?: string[]
  categories: ChangelogCategory[]
}

export const changelogEntries: ChangelogEntry[] = [
  {
    version: 'v2.5.3',
    date: 'June 3, 2026',
    title: 'Voter list viewer, PDF reports and auto-groups',
    description:
      'This release gives you better visibility into your votes and members - from seeing who has voted to downloading a full audit-ready PDF.',
    categories: [
      {
        type: 'new',
        items: [
          'Voter list viewer - see exactly who is eligible to vote and who has already cast their ballot, in real time',
          'Download a PDF report with the full election results and a complete audit trail - ready to share or archive',
          'All-members group - a built-in group that always includes your full memberbase, automatically kept up to date',
        ],
      },
      {
        type: 'improvements',
        items: [
          'The voter verification screen is now cleaner and easier to complete',
          'Resending a verification code is now simpler for voters who did not receive theirs',
        ],
      },
    ],
  },
  {
    version: 'v2.3.0',
    date: 'February 2026',
    title: 'Weighted voting, Google sign-in and usage dashboard',
    description:
      'One of our biggest feature drops. Weighted voting unlocks new use cases for cooperatives, federations, and shareholder votes. Google sign-in reduces signup friction. And a new usage dashboard keeps you informed before you hit any limits.',
    categories: [
      {
        type: 'new',
        items: [
          'Weighted voting - assign different vote weights per member (ideal for cooperatives, federations, and shareholders)',
          'Sign in with Google for faster, password-free access',
          'Live usage card on the dashboard showing how many members, active votes, and voter verifications you have used vs your plan',
          '80% usage warning so you always know before reaching a plan limit',
          'New drafts section to find and manage all your in-progress vote setups in one place',
          'Italian language support added',
        ],
      },
    ],
  },
  {
    version: 'v2.3.1',
    date: 'February 10, 2026',
    title: 'Admin password recovery fix',
    description: 'A small patch fixing a redirect issue that affected admins recovering their passwords.',
    categories: [
      {
        type: 'bugfixes',
        items: ['Fixed a redirect bug that prevented admins from completing password recovery correctly'],
      },
    ],
  },
  {
    version: 'v2.1.0',
    date: 'December 1, 2025',
    title: 'Draft voting processes with autosave',
    description:
      'Never lose your work again. Voting process setups are now saved automatically as drafts and can be cloned for reuse.',
    categories: [
      {
        type: 'new',
        items: [
          'Save a vote as a draft and come back to finish it whenever you are ready',
          'Your vote setup saves automatically as you work - no more losing progress',
          'Duplicate any past vote to reuse its settings as a starting point',
        ],
      },
    ],
  },
  {
    version: 'v2.0.0',
    date: 'October 3, 2025',
    title: 'First public release',
    description:
      'The first public launch of Vocdoni App - a self-service platform for digital governance. Designed so any organization can go from zero to their first vote without direct assistance.',
    categories: [
      {
        type: 'new',
        items: [
          'Sign in with email and password or with your Google account',
          'Multiple organizations per account with full role management',
          'One-page vote editor - create an election without a step-by-step wizard',
          'Manage your voter list - add, edit, and remove members directly from the dashboard',
          'Import your voter list from a spreadsheet to get started in minutes',
          'Voters verify their identity with a one-time code sent to their phone or email before casting their ballot',
          'Manage your subscription and billing directly inside the app',
          'Interactive onboarding checklist to guide you to your first vote',
          'Multilingual support: Spanish, Catalan, English and Italian',
        ],
      },
    ],
  },
]
