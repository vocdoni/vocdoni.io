/**
 * Translated content of the Decidim mockups: the one election the page
 * pretends is running inside an organization's Decidim, in the buyer's own
 * words. Everything a reader reads is here; every number and date is in
 * `DecidimMockupFigures`, so the locale files never carry formatted figures.
 */
export interface DecidimMockupCopy {
  /** The organization's Decidim, as its own header names it. */
  organization: string
  /** The participatory space the election lives in, as the breadcrumb shows it. */
  process: string
  /** Election title, e.g. "Governing council election 2026". */
  title: string
  /** The election's description, the line under the title. */
  description: string
  /** The questions on the ballot, in order. The first one is what the phone shows. */
  questions: { title: string; choices: string[] }[]
}

/**
 * The figures behind one mocked Decidim election. Kept in code and formatted
 * with `Intl` at render time, as `MockupFigures` does for the app.
 */
export interface DecidimMockupFigures {
  /** People on the census. */
  census: number
  /** Ballots received at the moment the live dashboard is pictured. */
  liveVotes: number
  /** Ballots received at close. */
  finalVotes: number
  start: Date
  end: Date
  /** Votes per choice, per question, while voting is open. Sums to `liveVotes`. */
  liveResults: number[][]
  /** Final votes per choice, per question. Sums to `finalVotes`. */
  results: number[][]
  /** Which choice of the first question the member has picked on the phone. */
  selectedChoice: number
  /** The credential the member types in, as the census holds it. */
  memberNumber: string
  /** Where the one-time code goes. */
  email: string
  /** The receipt code the voting page hands back: a nullifier, `0x` and 64 hex digits. */
  receipt: string
}

const pad = (n: number) => String(n).padStart(2, '0')

/** Decidim's `decidim_short` date format, `%d/%m/%Y %H:%M`, as its locales write it. */
export const formatDecidimShort = (date: Date) =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`

/** `number_to_percentage(precision: 1)`: one decimal, in the locale's digits. */
export const formatPercent = (lang: string, votes: number, total: number) =>
  new Intl.NumberFormat(lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(
    total > 0 ? (votes / total) * 100 : 0
  ) + '%'
