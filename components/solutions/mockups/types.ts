/**
 * Translated content of a vertical's product mockups: the one election the
 * pages pretend is running, in the buyer's own words. Everything a reader
 * reads is here; everything that is a number or a date is in `MockupFigures`,
 * so the locale files never carry formatted figures.
 */
export interface VerticalMockupCopy {
  /** Organization name shown where the app shows the organization. */
  organization: string
  /** Process title, e.g. "Governing board election 2026". */
  title: string
  /** The questions on the ballot, in order. The first one is what the phone shows. */
  questions: { title: string; choices: string[] }[]
  /** Two rows for the participant lookup: the first has voted, the second has not. */
  participants: { name: string; credential: string }[]
}

/**
 * The figures behind one mocked election. Kept in code and formatted with
 * `Intl` at render time, so a locale changes digits and separators without
 * owning a copy of each number.
 */
export interface MockupFigures {
  /** Eligible voters. */
  census: number
  /** Ballots received at the moment the live console is pictured. */
  liveVotes: number
  /** Ballots received at close. */
  finalVotes: number
  start: Date
  end: Date
  /** Final votes per choice, per question, matching `VerticalMockupCopy.questions`. */
  results: number[][]
  /** Which choice of the first question the member has picked on the phone. */
  selectedChoice: number
  /** The six digits of the one-time code. */
  code: string
  /** Shortened identifiers, as the app abbreviates them. */
  processId: string
  voteId: string
  /** The voting link in the notice, shortened. */
  noticeLink: string
}

export const turnoutPercent = (votes: number, census: number) => Math.round((votes / census) * 10000) / 100
