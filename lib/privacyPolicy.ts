/**
 * Revision date of the privacy policy currently published, as an ISO calendar
 * date (`YYYY-MM-DD`).
 *
 * This is the single source of truth for two values that must never drift
 * apart:
 *
 * - the revision date the three policy pages display, which section 10 promises
 *   every version of the policy carries;
 * - the cut-off a stored cookie consent is measured against. Section 10 states
 *   that a consent given before this date no longer covers the processing the
 *   policy describes, so `lib/cookieConsent.ts` treats a record carrying an
 *   older revision as invalid and the banner asks again.
 *
 * Publishing a new revision is therefore a one-line change here: the pages
 * start showing the new date, and everyone who consented under the previous
 * text is asked again on their next visit.
 */
export const PRIVACY_POLICY_REVISION_DATE = '2026-08-28'

/** The languages the policy is published in, each with its own page. */
export type PolicyLanguage = 'ca' | 'en' | 'es'

const MONTH_NAME_LOCALE: Record<PolicyLanguage, string> = {
  ca: 'ca-ES',
  en: 'en-GB',
  es: 'es-ES',
}

/**
 * Catalan elides the preposition before a month starting with a vowel:
 * `d'agost`, but `de gener`.
 */
function catalanMonthPreposition(monthName: string): string {
  return /^[aeiou]/i.test(monthName) ? "d'" : 'de '
}

/**
 * Render {@link PRIVACY_POLICY_REVISION_DATE} the way the policy page in that
 * language writes dates: `28 August 2026`, `28 de agosto de 2026`,
 * `28 d'agost de 2026`.
 *
 * Deriving all three from the one constant is the point: a revision that
 * updated the English date and left the Catalan one behind would leave the
 * pages disagreeing about which consents section 10 invalidates.
 */
export function formatPolicyRevisionDate(
  language: PolicyLanguage,
  isoDate: string = PRIVACY_POLICY_REVISION_DATE
): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  const monthName = new Intl.DateTimeFormat(MONTH_NAME_LOCALE[language], { month: 'long', timeZone: 'UTC' }).format(
    Date.UTC(year, month - 1, day)
  )

  if (language === 'en') return `${day} ${monthName} ${year}`
  if (language === 'es') return `${day} de ${monthName} de ${year}`
  return `${day} ${catalanMonthPreposition(monthName)}${monthName} de ${year}`
}
