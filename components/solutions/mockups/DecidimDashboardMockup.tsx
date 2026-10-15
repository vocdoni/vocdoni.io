import {
  ChartColumnIcon,
  EyeIcon,
  FileTextIcon,
  HouseIcon,
  LayoutGridIcon,
  MessageSquareTextIcon,
  ShieldIcon,
  UsersRoundIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { AppMockupFrame } from '@/components/solutions/mockups/AppMockupFrame'
import {
  DecidimAdminButton,
  DecidimCard,
  DecidimLabel,
  DecidimMark,
} from '@/components/solutions/mockups/decidim-parts'
import {
  type DecidimMockupCopy,
  type DecidimMockupFigures,
  formatDecidimShort,
  formatPercent,
} from '@/components/solutions/mockups/decidim-types'
import { cn } from '@/lib/utils'

interface DecidimDashboardMockupProps {
  /** `live`: voting open, the count updating. `results`: after close, results published. */
  state: 'live' | 'results'
  copy?: DecidimMockupCopy
  figures: DecidimMockupFigures
  /** Accessible name of the picture; pass the figure caption. */
  label?: string
  /** `close` is for the hero column: no sidebar, larger type. */
  density?: 'full' | 'close'
  className?: string
}

// Where the figure goes in the census sentence, so the number can be set in
// bold the way Decidim renders its `<strong>`.
const COUNT_MARK = '\u0000'

/**
 * The election's Dashboard tab in Decidim's admin, drawn rather than
 * photographed: the admin's two bars, "Edit election" with its five tabs
 * (Security is the one the module adds), the Election status and Calendar
 * cards, and the Results card with its per-question table and the census
 * line. Everything here is what decidim-elections renders; the only thing the
 * module changes on this screen is the tab.
 */
export function DecidimDashboardMockup({
  state,
  copy,
  figures,
  label,
  density = 'full',
  className,
}: DecidimDashboardMockupProps) {
  const { t, i18n } = useTranslation()
  if (!copy) return null

  const live = state === 'live'
  const close = density === 'close'
  const number = new Intl.NumberFormat(i18n.language)
  const question = copy.questions[0]
  const counts = (live ? figures.liveResults : figures.results)[0] ?? []
  const total = counts.reduce((sum, n) => sum + n, 0)
  const censusSentence = t(
    'solutions.mockups.decidim.census_size',
    'There are currently {{people}} people eligible for voting in this election (this might change on a dynamic census).',
    { people: COUNT_MARK }
  ).split(COUNT_MARK)

  return (
    <AppMockupFrame
      variant='window'
      product='decidim'
      label={label}
      scale={close ? 'close' : 'default'}
      className={className}
    >
      {/* The admin's sidebar: the mark and the spaces, Processes current. */}
      {!close && (
        <aside className='bg-decidim-admin-nav flex w-[3.6em] shrink-0 flex-col items-center gap-[1.2em] py-[0.9em] text-white'>
          <DecidimMark className='text-[1.1em]' />
          <RailItem icon={<LayoutGridIcon className='size-[1em]' />} current />
          <RailItem icon={<UsersRoundIcon className='size-[1em]' />} />
          <RailItem icon={<MessageSquareTextIcon className='size-[1em]' />} />
          <RailItem icon={<FileTextIcon className='size-[1em]' />} />
        </aside>
      )}

      <div className='bg-decidim-admin-bg flex min-w-0 flex-1 flex-col'>
        {/* The organization bar and the breadcrumb bar. The hero column has
            room for one: the breadcrumb, which names the election's place. */}
        {!close && (
          <div className='bg-decidim-admin-bar text-decidim-ink flex h-[1.7em] shrink-0 items-center justify-between px-[1.1em] text-[0.8em] font-semibold'>
            <span className='truncate'>{copy.organization}</span>
            <span className='flex items-center gap-[0.5em] font-normal'>
              <EyeIcon className='size-[1em]' />
              <span className='bg-decidim-ink/20 size-[1.2em] rounded-full' />
            </span>
          </div>
        )}
        <div className='bg-decidim-admin-nav flex h-[1.7em] shrink-0 items-center gap-[0.5em] px-[1.1em] text-[0.75em] text-white'>
          <HouseIcon className='size-[1.1em] shrink-0' />
          <Crumb>{t('solutions.mockups.decidim.processes', 'Processes')}</Crumb>
          <Crumb className='truncate'>{copy.process}</Crumb>
          <Crumb>{t('solutions.mockups.decidim.components', 'Components')}</Crumb>
          <Crumb>{t('solutions.mockups.decidim.elections', 'Elections')}</Crumb>
        </div>

        <div
          className={cn(
            'bg-decidim-page flex min-h-0 flex-1 flex-col overflow-hidden',
            close ? 'gap-[0.6em] p-[0.9em]' : 'gap-[0.9em] p-[1.2em]'
          )}
        >
          {/* The page title and the way to the public page: the hero column
              is too short for them, and the tabs already name the screen. */}
          {!close && (
            <div className='flex items-center justify-between gap-[1em]'>
              <p className='truncate text-[1.25em] font-bold'>
                {t('solutions.mockups.decidim.edit_election', 'Edit election')}
              </p>
              <DecidimAdminButton variant='outline' icon={<EyeIcon className='size-[1.1em]' />}>
                {t('solutions.mockups.decidim.see_election', 'See election')}
              </DecidimAdminButton>
            </div>
          )}

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

          <div className={cn('grid grid-cols-2', close ? 'gap-[0.7em]' : 'gap-[0.9em]')}>
            <DecidimCard title={t('solutions.mockups.decidim.election_status', 'Election status')}>
              <p className='truncate text-[0.9em] leading-snug'>{copy.title}</p>
              {!close && (
                <p className='mt-[0.3em] truncate text-[0.8em] leading-snug'>
                  <span className='font-semibold'>{t('solutions.mockups.decidim.census_label', 'Census:')}</span>{' '}
                  {t('solutions.mockups.decidim.census_type', 'Registered participants (dynamic)')}
                </p>
              )}
              <div className='mt-[0.4em] flex flex-wrap gap-[0.4em]'>
                <DecidimLabel tone='success'>
                  {live
                    ? t('solutions.mockups.decidim.status_ongoing', 'Ongoing')
                    : t('solutions.mockups.decidim.status_finished', 'Finished')}
                </DecidimLabel>
                <DecidimLabel tone='neutral' className='truncate'>
                  {live
                    ? t('solutions.mockups.decidim.results_real_time', 'Results available in real time')
                    : t('solutions.mockups.decidim.results_after_end', 'Results available after the election ends')}
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
                {!live && (
                  <Field
                    label={t('solutions.mockups.decidim.results_published_at', 'Results published at')}
                    value={formatDecidimShort(figures.end)}
                  />
                )}
              </div>
            </DecidimCard>
          </div>

          <DecidimCard
            title={t('solutions.mockups.decidim.results', 'Results')}
            className='min-h-0 flex-1 overflow-hidden'
          >
            {live && !close && (
              <p className='mb-[0.6em] truncate text-[0.8em]'>
                {t(
                  'solutions.mockups.decidim.results_shown_automatically',
                  'Results are displayed automatically during the election.'
                )}
              </p>
            )}
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

        {/* The sticky action bar: End election while voting is open. Left out
            of the hero column, where the results table needs the height. */}
        {live && !close && (
          <div className='border-decidim-admin-border bg-decidim-page flex shrink-0 justify-end border-t px-[1.2em] py-[0.35em]'>
            <DecidimAdminButton>{t('solutions.mockups.decidim.end_election', 'End election')}</DecidimAdminButton>
          </div>
        )}
      </div>
    </AppMockupFrame>
  )
}

function RailItem({ icon, current = false }: { icon: ReactNode; current?: boolean }) {
  return (
    <span
      className={cn(
        'flex size-[2em] items-center justify-center rounded-[0.3em]',
        current ? 'bg-white/15 text-white' : 'text-white/70'
      )}
    >
      {icon}
    </span>
  )
}

function Crumb({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <>
      <span className='opacity-50'>/</span>
      <span className={cn('shrink-0', className)}>{children}</span>
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
