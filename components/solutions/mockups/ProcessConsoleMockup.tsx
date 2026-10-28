import {
  CalendarIcon,
  ClockIcon,
  FileDownIcon,
  HouseIcon,
  LifeBuoyIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  VoteIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import Logo from '@/components/illustrations/logo'
import { AppMockupFrame } from '@/components/solutions/mockups/AppMockupFrame'
import {
  AppBox,
  AppChoice,
  AppOutlineButton,
  AppResultRow,
  AppTabs,
  AppTag,
  formatSchedule,
  formatScheduleFields,
} from '@/components/solutions/mockups/parts'
import { type MockupFigures, turnoutPercent, type VerticalMockupCopy } from '@/components/solutions/mockups/types'
import { cn } from '@/lib/utils'

interface ProcessConsoleMockupProps {
  /** `live`: voting day, results hidden. `results`: after close, report ready. */
  state: 'live' | 'results'
  copy?: VerticalMockupCopy
  figures: MockupFigures
  /** Accessible name of the picture; pass the figure caption. */
  label?: string
  /**
   * `close` is for the hero column: no menu rail, no settings block, larger
   * type, so the turnout and the questions read at a glance from half a page.
   */
  density?: 'full' | 'close'
  className?: string
}

/**
 * The electoral board's console: vocdoni-app's `ProcessView`, drawn rather than
 * photographed. Collapsed menu rail on the left (the app's own 48px mode), the
 * process with its "Questions and results" box in the middle, and the right
 * sidebar with "Voting status", the participant lookup and the actions.
 *
 * Nothing here is invented: every card, label and state exists in the app. In
 * particular there is no census hash, because the product does not show one.
 */
export function ProcessConsoleMockup({
  state,
  copy,
  figures,
  label,
  density = 'full',
  className,
}: ProcessConsoleMockupProps) {
  const { t, i18n } = useTranslation()
  if (!copy) return null

  const number = new Intl.NumberFormat(i18n.language)
  const live = state === 'live'
  const close = density === 'close'
  const votes = live ? figures.liveVotes : figures.finalVotes
  const turnout = turnoutPercent(votes, figures.census)
  const schedule = formatSchedule(i18n.language, figures.start, figures.end)
  const dates = formatScheduleFields(i18n.language, figures.start, figures.end)
  const turnoutLabel = new Intl.NumberFormat(i18n.language, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(turnout / 100)

  return (
    <AppMockupFrame variant='window' label={label} scale={close ? 'close' : 'default'} className={className}>
      {/* Menu rail: logo, "New vote", Platform items with Voting processes current, Help, profile. */}
      {!close && (
        <aside className='bg-app-menu border-app-border flex w-[3.4em] shrink-0 flex-col items-center gap-[0.9em] border-r py-[0.9em]'>
          <Logo className='size-[1.5em]' />
          <span className='bg-app-solid text-app-solid-fg flex size-[1.8em] items-center justify-center rounded-[0.4em]'>
            <PlusIcon className='size-[1em]' strokeWidth={2.5} />
          </span>
          <RailItem icon={<HouseIcon className='size-[1em]' />} />
          <RailItem icon={<VoteIcon className='size-[1em]' />} current />
          <RailItem icon={<UsersIcon className='size-[1em]' />} />
          <RailItem icon={<SettingsIcon className='size-[1em]' />} />
          <RailItem icon={<LifeBuoyIcon className='size-[1em]' />} className='mt-[0.6em]' />
          <span className='bg-app-muted border-app-border mt-auto size-[1.7em] rounded-full border' />
        </aside>
      )}

      {/* Main column */}
      <div className='flex min-w-0 flex-1 flex-col gap-[0.9em] overflow-hidden p-[1.2em]'>
        <div className='flex items-center justify-between'>
          <AppTag tone='green'>
            {live
              ? t('solutions.mockups.app.ongoing', 'Ongoing')
              : t('solutions.mockups.app.results_status', 'Results')}
          </AppTag>
          <span className='border-app-border text-app-fg-muted flex size-[1.9em] items-center justify-center rounded-[0.4em] border'>
            <SettingsIcon className='size-[0.9em]' />
          </span>
        </div>
        <div>
          <p className='text-[1.4em] leading-tight font-medium text-balance'>{copy.title}</p>
          <p className='text-app-faint mt-[0.4em] truncate text-[0.75em] font-medium'>
            {t('solutions.mockups.app.schedule_range', 'Voting from {{begin}} to {{end}}', schedule)}
          </p>
        </div>

        {/* The "Schedule" box of the app, with its four icon-tile fields. Only after
            close: on voting day the hero column is too short for it and the
            questions matter more. */}
        {!live && (
          <AppBox className='grid grid-cols-2 gap-x-[1em] gap-y-[0.7em]'>
            <p className='col-span-2 text-[0.95em] font-medium'>{t('solutions.mockups.app.schedule', 'Schedule')}</p>
            <Setting
              icon={<CalendarIcon className='size-[0.9em]' />}
              label={t('solutions.mockups.app.start_date', 'Start date')}
              value={dates.startDate}
            />
            <Setting
              icon={<ClockIcon className='size-[0.9em]' />}
              label={t('solutions.mockups.app.start_time', 'Start time')}
              value={dates.startTime}
            />
            <Setting
              icon={<CalendarIcon className='size-[0.9em]' />}
              label={t('solutions.mockups.app.end_date', 'End date')}
              value={dates.endDate}
            />
            <Setting
              icon={<ClockIcon className='size-[0.9em]' />}
              label={t('solutions.mockups.app.end_time', 'End time')}
              value={dates.endTime}
            />
          </AppBox>
        )}

        <AppBox className='flex min-h-0 flex-1 flex-col gap-[0.8em] overflow-hidden'>
          <div className='flex items-center justify-between gap-[1em]'>
            <p className='truncate text-[0.95em] font-medium'>
              {t('solutions.mockups.app.questions_and_results', 'Questions and results')}
            </p>
            {live ? (
              <AppTag tone='orange'>{t('solutions.mockups.app.awaiting_results', 'Awaiting results')}</AppTag>
            ) : (
              <AppTag tone='green'>{t('solutions.mockups.app.results_available', 'Results available')}</AppTag>
            )}
          </div>
          <AppTabs active={live ? 'questions' : 'results'} />
          <div className='flex flex-col gap-[0.8em]'>
            {copy.questions.map((question, qi) => (
              <div key={question.title} className='flex flex-col gap-[0.5em]'>
                <p className='truncate text-[0.85em] font-medium'>{question.title}</p>
                {live ? (
                  <div className='grid gap-[0.4em]'>
                    {question.choices.map((choice) => (
                      <AppChoice key={choice} label={choice} compact />
                    ))}
                  </div>
                ) : (
                  <div className='grid gap-[0.35em]'>
                    {question.choices.map((choice, ci) => (
                      <AppResultRow
                        key={choice}
                        label={choice}
                        votes={figures.results[qi]?.[ci] ?? 0}
                        total={figures.finalVotes}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AppBox>
      </div>

      {/* Right sidebar: vote information */}
      <aside
        className={cn(
          'border-app-border flex shrink-0 flex-col gap-[0.8em] overflow-hidden border-l p-[1em]',
          close ? 'w-[36%]' : 'w-[33%]'
        )}
      >
        <AppBox className='flex flex-col gap-[0.7em]'>
          <p className='text-[0.8em] font-medium'>{t('solutions.mockups.app.voting_status', 'Voting status')}</p>
          <Row
            icon={<VoteIcon className='size-[0.9em]' />}
            label={t('solutions.mockups.app.total_votes', 'Total votes')}
            value={number.format(votes)}
          />
          <div className='border-app-border flex flex-col gap-[0.35em] border-b pb-[0.7em]'>
            <div className='text-app-fg-muted flex justify-between text-[0.7em]'>
              <span>{t('solutions.mockups.app.turnout', 'Turnout')}</span>
              <span className='tabular-nums'>{turnoutLabel}</span>
            </div>
            <div className='bg-app-track h-[0.5em] overflow-hidden rounded-full'>
              <div className='bg-app-range h-full rounded-full' style={{ width: `${turnout}%` }} />
            </div>
          </div>
          <Row
            icon={<UsersIcon className='size-[0.9em]' />}
            label={t('solutions.mockups.app.census_size', 'Census size')}
            value={number.format(figures.census)}
          />
        </AppBox>

        {live ? (
          <AppBox className='flex flex-col gap-[0.6em]'>
            <p className='text-[0.8em] font-medium'>
              {t('solutions.mockups.app.check_participants', 'Check participants')}
            </p>
            <div className='border-app-border text-app-faint flex h-[1.9em] items-center gap-[0.5em] rounded-[0.4em] border px-[0.6em] text-[0.7em]'>
              <SearchIcon className='size-[1em] shrink-0' />
              <span className='truncate'>{t('solutions.mockups.app.search_census', 'Search census…')}</span>
            </div>
            {copy.participants.map((participant, index) => (
              <div key={participant.name} className='flex items-center justify-between gap-[0.6em]'>
                <div className='min-w-0'>
                  <p className='truncate text-[0.72em] font-medium'>{participant.name}</p>
                  <p className='text-app-fg-muted truncate text-[0.65em]'>{participant.credential}</p>
                </div>
                <AppTag tone={index === 0 ? 'green' : 'gray'}>
                  {index === 0
                    ? t('solutions.mockups.app.voted', 'Voted')
                    : t('solutions.mockups.app.not_voted', 'Not voted')}
                </AppTag>
              </div>
            ))}
          </AppBox>
        ) : (
          <div className='flex flex-col gap-[0.5em]'>
            <p className='text-[0.8em] font-medium'>
              {t('solutions.mockups.app.additional_actions', 'Additional actions')}
            </p>
            <AppOutlineButton icon={<SearchIcon className='size-[1.1em] shrink-0' />}>
              {t('solutions.mockups.app.view_in_explorer', 'View in explorer')}
            </AppOutlineButton>
            <AppOutlineButton icon={<FileDownIcon className='size-[1.1em] shrink-0' />}>
              {t('solutions.mockups.app.election_report', 'Election report (PDF)')}
            </AppOutlineButton>
            <div className='text-app-fg-muted mt-[0.2em] flex items-center justify-between gap-[0.5em] text-[0.65em]'>
              <span>{t('solutions.mockups.app.process_id', 'Process ID')}</span>
              <span className='font-mono'>{figures.processId}</span>
            </div>
          </div>
        )}

        {!close && (
          <div className='flex flex-col gap-[0.5em]'>
            <p className='text-[0.8em] font-medium'>{t('solutions.mockups.app.voting_settings', 'Voting settings')}</p>
            <Setting
              label={t('solutions.mockups.app.results_visibility', 'Results visibility')}
              value={t('solutions.mockups.app.hidden_until_end', 'Hidden until the end')}
            />
            <Setting
              label={t('solutions.mockups.app.voter_anonymity', 'Voter anonymity')}
              value={t('solutions.mockups.app.anonymous', 'Anonymous')}
            />
          </div>
        )}
      </aside>
    </AppMockupFrame>
  )
}

function RailItem({
  icon,
  current = false,
  className,
}: {
  icon: React.ReactNode
  current?: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        'flex size-[1.9em] items-center justify-center rounded-[0.4em]',
        current ? 'bg-app-menu-active text-app-fg' : 'text-app-fg-muted',
        className
      )}
    >
      {icon}
    </span>
  )
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className='flex items-center justify-between gap-[0.5em] text-[0.75em]'>
      <span className='text-app-fg-muted flex min-w-0 items-center gap-[0.5em]'>
        {icon}
        <span className='truncate'>{label}</span>
      </span>
      <span className='font-medium tabular-nums'>{value}</span>
    </div>
  )
}

function Setting({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className='flex items-center gap-[0.6em]'>
      <span className='bg-app-muted text-app-fg-muted flex size-[1.9em] shrink-0 items-center justify-center rounded-[0.4em]'>
        {icon}
      </span>
      <div className='min-w-0'>
        <p className='truncate text-[0.7em] font-medium'>{label}</p>
        <p className='text-app-fg-muted truncate text-[0.65em]'>{value}</p>
      </div>
    </div>
  )
}

export default ProcessConsoleMockup
