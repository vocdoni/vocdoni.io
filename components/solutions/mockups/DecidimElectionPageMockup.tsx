import { ChartColumnIcon, ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, CircleHelpIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { AppMockupFrame } from '@/components/solutions/mockups/AppMockupFrame'
import {
  DecidimButton,
  DecidimDecorator,
  DecidimFlash,
  DecidimHeader,
  DecidimMenuBar,
  DecidimPercentBar,
} from '@/components/solutions/mockups/decidim-parts'
import {
  type DecidimMockupCopy,
  type DecidimMockupFigures,
  formatDecidimShort,
  formatPercent,
} from '@/components/solutions/mockups/decidim-types'
import { cn } from '@/lib/utils'

interface DecidimElectionPageMockupProps {
  /** `live`: voting open, the Vote button in the aside. `results`: after close, the count published. */
  state: 'live' | 'results'
  copy?: DecidimMockupCopy
  figures: DecidimMockupFigures
  /** Accessible name of the picture; pass the figure caption. */
  label?: string
  className?: string
}

/**
 * The election's own page in the organization's Decidim, as a member or an
 * auditor sees it: the site's header and breadcrumb bar, the voting window
 * flash, the title with its decorator, the questions, and after close the
 * Results section with its percent bars, the one place the count is readable
 * without touching the admin. The Vote button sits in the aside while voting
 * is open, as decidim-elections places it.
 */
export function DecidimElectionPageMockup({ state, copy, figures, label, className }: DecidimElectionPageMockupProps) {
  const { t, i18n } = useTranslation()
  if (!copy) return null

  const live = state === 'live'
  const number = new Intl.NumberFormat(i18n.language)
  const question = copy.questions[0]
  const counts = (live ? figures.liveResults : figures.results)[0] ?? []
  const total = counts.reduce((sum, n) => sum + n, 0)

  return (
    <AppMockupFrame variant='window' product='decidim' label={label} className={className}>
      <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
        <DecidimHeader organization={copy.organization} />
        <DecidimMenuBar>
          <span>{t('solutions.mockups.decidim.home', 'Home')}</span>
          <Sep />
          <span>{t('solutions.mockups.decidim.processes', 'Processes')}</span>
          <Sep />
          <span className='truncate'>{copy.process}</span>
          <Sep />
          <span>{t('solutions.mockups.decidim.elections', 'Elections')}</span>
          <Sep />
          <span className='truncate font-normal'>{copy.title}</span>
        </DecidimMenuBar>

        <div className='flex min-h-0 flex-1 gap-[2.5em] overflow-hidden px-[7%] pt-[1.6em]'>
          <div className='flex min-w-0 flex-[3] flex-col gap-[0.85em] [&>*]:shrink-0'>
            <DecidimFlash
              lines={[
                t('solutions.mockups.decidim.voting_began', 'Voting began on: {{start_date}}', {
                  start_date: formatDecidimShort(figures.start),
                }),
                t('solutions.mockups.decidim.active_voting_until', 'Active voting until: {{end_date}}', {
                  end_date: formatDecidimShort(figures.end),
                }),
              ]}
            />
            <div>
              <p className='text-[1.9em] leading-tight font-bold text-balance'>{copy.title}</p>
              <DecidimDecorator />
            </div>
            <p className='text-decidim-ink-soft truncate text-[1em]'>{copy.description}</p>

            {/* While voting is open, the questions; after close, the results
                take their place, as the page scrolls to them. */}
            {live ? (
              <>
                <SectionTitle icon={<CircleHelpIcon className='text-decidim-primary size-[1em]' />}>
                  {t('solutions.mockups.decidim.election_questions', 'Election questions')}
                </SectionTitle>
                {copy.questions.map((item) => (
                  <Accordion key={item.title} title={item.title} open={false} />
                ))}
              </>
            ) : (
              <>
                <SectionTitle icon={<ChartColumnIcon className='text-decidim-primary size-[1em]' />}>
                  {t('solutions.mockups.decidim.results', 'Results')}
                </SectionTitle>
                <p className='-mt-[0.5em] truncate text-[0.85em]'>
                  {t(
                    'solutions.mockups.decidim.results_subtitle_after_end',
                    'The election has ended. You can now see the results.'
                  )}
                </p>
                {question && (
                  <Accordion title={question.title} open>
                    {question.choices.map((choice, i) => (
                      <div key={choice} className='flex flex-col gap-[0.3em]'>
                        <p className='truncate text-[0.9em] font-semibold'>{choice}</p>
                        <div className='flex items-center gap-[1em]'>
                          <DecidimPercentBar share={total > 0 ? ((counts[i] ?? 0) / total) * 100 : 0} />
                          <span className='text-decidim-ink-soft w-[5em] shrink-0 text-right text-[0.75em] leading-tight tabular-nums'>
                            {formatPercent(i18n.language, counts[i] ?? 0, total)}
                            <br />
                            {t('solutions.mockups.decidim.votes_count', '{{votes}} votes', {
                              votes: number.format(counts[i] ?? 0),
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className='flex items-center justify-between text-[0.85em]'>
                      <span>{t('solutions.mockups.decidim.total_label', 'TOTAL:')}</span>
                      <span className='tabular-nums'>
                        {t('solutions.mockups.decidim.votes_count', '{{votes}} votes', { votes: number.format(total) })}
                      </span>
                    </div>
                  </Accordion>
                )}
                {copy.questions[1] && <Accordion title={copy.questions[1].title} open={false} />}
              </>
            )}
          </div>

          {/* The aside: the way to vote while voting is open, nothing after. */}
          <div className='flex w-[26%] shrink-0 flex-col gap-[0.8em] pt-[0.2em]'>
            {live && (
              <DecidimButton variant='filled' className='w-full'>
                {t('solutions.mockups.decidim.vote', 'Vote')}
              </DecidimButton>
            )}
          </div>
        </div>
      </div>
    </AppMockupFrame>
  )
}

function Sep() {
  return <ChevronRightIcon className='size-[1em] shrink-0 opacity-80' />
}

function SectionTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <p className='flex items-center gap-[0.5em] text-[1.3em] font-semibold'>
      {icon}
      <span className='truncate'>{children}</span>
    </p>
  )
}

/** Decidim's `.card-accordion`: an 8px-radius card whose title is a link in the secondary. */
function Accordion({ title, open, children }: { title: string; open: boolean; children?: ReactNode }) {
  return (
    <div className={cn('border-decidim-edge rounded-[0.5em] border', open && 'flex min-h-0 flex-col')}>
      <div
        className={cn(
          'text-decidim-secondary flex items-center justify-between gap-[1em] px-[1em] py-[0.8em] text-[0.95em] font-semibold',
          open && 'border-decidim-rule border-b'
        )}
      >
        <span className='truncate'>{title}</span>
        {open ? (
          <ChevronUpIcon className='size-[1.1em] shrink-0' />
        ) : (
          <ChevronDownIcon className='size-[1.1em] shrink-0' />
        )}
      </div>
      {open && <div className='flex flex-col gap-[0.8em] px-[1em] py-[0.8em]'>{children}</div>}
    </div>
  )
}

export default DecidimElectionPageMockup
