import {
  ChartColumnIcon,
  FileTextIcon,
  HouseIcon,
  MessageSquareTextIcon,
  ShieldIcon,
  UsersRoundIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { AppMockupFrame } from '@/components/solutions/mockups/AppMockupFrame'
import { DecidimCard, DecidimLabel } from '@/components/solutions/mockups/decidim-parts'
import {
  type DecidimMockupCopy,
  type DecidimMockupFigures,
  formatDecidimShort,
  formatPercent,
} from '@/components/solutions/mockups/decidim-types'
import { cn } from '@/lib/utils'

interface DecidimDashboardMockupProps {
  copy?: DecidimMockupCopy
  figures: DecidimMockupFigures
  /** Accessible name of the picture; pass the figure caption. */
  label?: string
  className?: string
}

// Where the figure goes in the census sentence, so the number can be set in
// bold the way Decidim renders its `<strong>`.
const COUNT_MARK = '\u0000'

/**
 * The election's Dashboard tab in Decidim's admin while voting is open, cut for
 * the hero column. Security is the one tab the module adds; the rest is what
 * decidim-elections renders.
 */
export function DecidimDashboardMockup({ copy, figures, label, className }: DecidimDashboardMockupProps) {
  const { t, i18n } = useTranslation()
  if (!copy) return null

  const number = new Intl.NumberFormat(i18n.language)
  const question = copy.questions[0]
  const counts = figures.liveResults[0] ?? []
  const total = counts.reduce((sum, n) => sum + n, 0)
  const censusSentence = t(
    'solutions.mockups.decidim.census_size',
    'There are currently {{people}} people eligible for voting in this election (this might change on a dynamic census).',
    { people: COUNT_MARK }
  ).split(COUNT_MARK)

  return (
    <AppMockupFrame variant='window' product='decidim' label={label} scale='close' className={className}>
      <div className='bg-decidim-admin-bg flex min-w-0 flex-1 flex-col'>
        <div className='bg-decidim-admin-nav flex h-[1.7em] shrink-0 items-center gap-[0.5em] px-[1.1em] text-[0.75em] text-white'>
          <HouseIcon className='size-[1.1em] shrink-0' />
          <Crumb>{t('solutions.mockups.decidim.processes', 'Processes')}</Crumb>
          <Crumb truncate>{copy.process}</Crumb>
          <Crumb>{t('solutions.mockups.decidim.components', 'Components')}</Crumb>
          <Crumb>{t('solutions.mockups.decidim.elections', 'Elections')}</Crumb>
        </div>

        <div className='bg-decidim-page flex min-h-0 flex-1 flex-col gap-[0.6em] overflow-hidden p-[0.9em]'>
          {/* Main, Questions, Census, Security, Dashboard: the four upstream
              tabs and the one the module adds between Census and Dashboard. */}
          <div className='border-decidim-admin-tab text-decidim-ink-soft flex gap-[1.5em] border-b-2 text-[0.78em] leading-snug'>
            <Tab icon={<FileTextIcon className='size-[1em]' />}>{t('solutions.mockups.decidim.tab_main', 'Main')}</Tab>
            <Tab icon={<MessageSquareTextIcon className='size-[1em]' />}>
              {t('solutions.mockups.decidim.tab_questions', 'Questions')}
            </Tab>
            <Tab icon={<UsersRoundIcon className='size-[1em]' />}>
              {t('solutions.mockups.decidim.tab_census', 'Census')}
            </Tab>
            <Tab icon={<ShieldIcon className='size-[1em]' />}>
              {t('solutions.mockups.decidim.tab_security', 'Security')}
            </Tab>
            <Tab icon={<ChartColumnIcon className='size-[1em]' />} current>
              {t('solutions.mockups.decidim.tab_dashboard', 'Dashboard')}
            </Tab>
          </div>

          <div className='grid grid-cols-2 gap-[0.7em]'>
            <DecidimCard title={t('solutions.mockups.decidim.election_status', 'Election status')}>
              <p className='truncate text-[0.9em] leading-snug'>{copy.title}</p>
              <div className='mt-[0.4em] flex flex-wrap gap-[0.4em]'>
                <DecidimLabel tone='success'>{t('solutions.mockups.decidim.status_ongoing', 'Ongoing')}</DecidimLabel>
                <DecidimLabel tone='neutral' truncate>
                  {t('solutions.mockups.decidim.results_real_time', 'Results available in real time')}
                </DecidimLabel>
              </div>
            </DecidimCard>

            <DecidimCard title={t('solutions.mockups.decidim.calendar', 'Calendar')}>
              <div className='flex flex-col gap-[0.2em] text-[0.8em] leading-snug'>
                <Field
                  label={t('solutions.mockups.decidim.start_time', 'Start time:')}
                  value={formatDecidimShort(figures.start)}
                />
                <Field
                  label={t('solutions.mockups.decidim.end_time', 'End time:')}
                  value={formatDecidimShort(figures.end)}
                />
              </div>
            </DecidimCard>
          </div>

          <DecidimCard
            title={t('solutions.mockups.decidim.results', 'Results')}
            className='min-h-0 flex-1 overflow-hidden'
          >
            {question && (
              <div className='border-decidim-admin-border rounded-[0.3em] border px-[0.8em] pt-[0.4em] pb-[0.2em]'>
                <p className='truncate text-[0.9em] font-semibold'>{question.title}</p>
                <table className='mt-[0.3em] w-full text-[0.75em] leading-snug'>
                  <thead>
                    <tr className='text-decidim-ink-soft text-[0.85em]'>
                      <th className='pb-[0.3em] text-left font-semibold'>
                        {t('solutions.mockups.decidim.answers', 'Answers')}
                      </th>
                      <th className='pb-[0.3em] text-right font-semibold'>
                        {t('solutions.mockups.decidim.votes', 'Votes')}
                      </th>
                      <th className='pb-[0.3em] text-right font-semibold'>
                        {t('solutions.mockups.decidim.percentage', 'Percentage')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-decidim-ink-soft'>
                    {question.choices.map((choice, i) => (
                      <tr key={choice} className='border-decidim-admin-table border-t'>
                        <td className='truncate py-[0.3em]'>{choice}</td>
                        <td className='py-[0.3em] text-right tabular-nums'>
                          {t('solutions.mockups.decidim.votes_count', '{{votes}} votes', {
                            votes: number.format(counts[i] ?? 0),
                          })}
                        </td>
                        <td className='py-[0.3em] text-right tabular-nums'>
                          {formatPercent(i18n.language, counts[i] ?? 0, total)}
                        </td>
                      </tr>
                    ))}
                    <tr className='border-decidim-admin-table border-t'>
                      <td className='py-[0.3em]'>{t('solutions.mockups.decidim.total', 'Total')}</td>
                      <td />
                      <td className='py-[0.3em] text-right tabular-nums'>
                        {t('solutions.mockups.decidim.votes_count', '{{votes}} votes', { votes: number.format(total) })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <p className='text-decidim-ink-soft mt-[0.5em] truncate text-[0.75em]'>
              {censusSentence[0]}
              <strong className='text-decidim-ink'>{number.format(figures.census)}</strong>
              {censusSentence[1]}
            </p>
          </DecidimCard>
        </div>
      </div>
    </AppMockupFrame>
  )
}

function Crumb({ truncate = false, children }: { truncate?: boolean; children: ReactNode }) {
  return (
    <>
      <span className='opacity-50'>/</span>
      <span className={cn(truncate ? 'min-w-0 truncate' : 'shrink-0')}>{children}</span>
    </>
  )
}

function Tab({ icon, current = false, children }: { icon: ReactNode; current?: boolean; children: ReactNode }) {
  return (
    <span
      className={cn(
        'flex items-center gap-[0.4em] pb-[0.4em] whitespace-nowrap',
        current && 'text-decidim-admin-accent border-decidim-admin-accent -mb-[2px] border-b-2 font-semibold'
      )}
    >
      {icon}
      {children}
    </span>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <p className='truncate'>
      <span className='font-semibold'>{label}</span> {value}
    </p>
  )
}

export default DecidimDashboardMockup
