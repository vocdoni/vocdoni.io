import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

/**
 * Small pieces shared by the console and the phone, each a copy of one Chakra
 * recipe in vocdoni-app: the status `Tag`, the pill `Tabs`, the results
 * `Progress`, the custom radio of `QuestionChoice`. Sized in `em` so they scale
 * with the frame.
 */

type Tone = 'green' | 'yellow' | 'blue' | 'orange' | 'gray'

const TONE_CLASS: Record<Tone, string> = {
  green: 'bg-app-green-bg text-app-green-fg',
  yellow: 'bg-app-yellow-bg text-app-yellow-fg',
  blue: 'bg-app-blue-bg text-app-blue-fg',
  orange: 'bg-app-orange-bg text-app-orange-fg',
  gray: 'bg-app-muted text-app-fg-muted',
}

/** `ElectionStatusBadge` / `ResultsStateBadge`: a 6px-radius tag in a status palette. */
export function AppTag({ tone, className, children }: { tone: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-[0.4em] px-[0.7em] py-[0.3em] text-[0.75em] leading-none font-medium whitespace-nowrap',
        TONE_CLASS[tone],
        className
      )}
    >
      {children}
    </span>
  )
}

/** The app's segmented `Tabs` (variant `settings`): a muted pill with the active trigger raised. */
export function AppTabs({ active, className }: { active: 'questions' | 'results'; className?: string }) {
  const { t } = useTranslation()
  const tabs = [
    { id: 'questions', label: t('solutions.mockups.app.questions', 'Questions') },
    { id: 'results', label: t('solutions.mockups.app.results', 'Results') },
  ] as const
  return (
    <div className={cn('bg-app-muted inline-flex rounded-[0.5em] p-[0.25em]', className)}>
      {tabs.map((tab) => (
        <span
          key={tab.id}
          className={cn(
            'rounded-[0.4em] px-[1em] py-[0.4em] text-[0.8em] leading-none font-medium',
            tab.id === active ? 'bg-app-bg text-app-fg shadow-xs' : 'text-app-fg-muted'
          )}
        >
          {tab.label}
        </span>
      ))}
    </div>
  )
}

/** One choice of a question, the way the public ballot renders it: bordered card, custom radio. */
export function AppChoice({
  label,
  selected = false,
  compact = false,
}: {
  label: string
  selected?: boolean
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-[0.7em] rounded-[0.5em] border',
        compact ? 'px-[0.7em] py-[0.5em]' : 'p-[0.8em]',
        selected ? 'border-app-fg' : 'border-app-border'
      )}
    >
      <span
        className={cn(
          'flex size-[1.1em] shrink-0 items-center justify-center rounded-full border-2',
          selected ? 'border-app-fg' : 'border-app-faint'
        )}
      >
        {selected && <span className='bg-app-fg size-[0.5em] rounded-full' />}
      </span>
      <span className={cn('truncate text-[0.8em]', selected && 'font-medium')}>{label}</span>
    </div>
  )
}

/** A result row: the bar sits behind the text, title left, "N votes (x%)" right. */
export function AppResultRow({ label, votes, total }: { label: string; votes: number; total: number }) {
  const { t, i18n } = useTranslation()
  const share = total > 0 ? (votes / total) * 100 : 0
  const percent = new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }).format(share) + '%'
  return (
    <div className='bg-app-track relative h-[2em] overflow-hidden rounded-[0.4em]'>
      <div className='bg-app-range absolute inset-y-0 left-0' style={{ width: `${share}%` }} />
      <div className='relative flex h-full items-center justify-between gap-[1em] px-[0.7em] text-[0.75em]'>
        <span className='truncate font-medium'>{label}</span>
        <span className='text-app-fg-muted shrink-0 tabular-nums'>
          {t('solutions.mockups.app.votes_row', '{{votes}} votes ({{percent}})', {
            votes: new Intl.NumberFormat(i18n.language).format(votes),
            percent,
          })}
        </span>
      </div>
    </div>
  )
}

/** `DashboardBox`: the bordered, 8px-radius container every dashboard card uses. */
export function AppBox({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('border-app-border rounded-[0.6em] border p-[0.9em]', className)}>{children}</div>
}

/** An outline button with a leading icon, as in "Control panel" and "Additional actions". */
export function AppOutlineButton({
  icon,
  children,
  className,
}: {
  icon: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'border-app-border flex h-[2.2em] items-center justify-center gap-[0.5em] rounded-[0.4em] border px-[0.8em] text-[0.75em] font-medium whitespace-nowrap',
        className
      )}
    >
      {icon}
      <span className='truncate'>{children}</span>
    </span>
  )
}

export const formatSchedule = (lang: string, start: Date, end: Date) => {
  const fmt = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  return { begin: fmt.format(start), end: fmt.format(end) }
}

export const formatScheduleFields = (lang: string, start: Date, end: Date) => {
  const date = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'long', year: 'numeric' })
  const time = new Intl.DateTimeFormat(lang, { hour: '2-digit', minute: '2-digit' })
  return {
    startDate: date.format(start),
    startTime: time.format(start),
    endDate: date.format(end),
    endTime: time.format(end),
  }
}
