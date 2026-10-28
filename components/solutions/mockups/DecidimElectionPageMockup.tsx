import { ChartColumnIcon, ChevronRightIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AppMockupFrame } from '@/components/solutions/mockups/AppMockupFrame'
import {
  DecidimAccordion,
  DecidimDecorator,
  DecidimHeader,
  DecidimMenuBar,
  DecidimPercentBar,
  DecidimSectionTitle,
  DecidimVotingWindow,
} from '@/components/solutions/mockups/decidim-parts'
import {
  type DecidimMockupCopy,
  type DecidimMockupFigures,
  formatPercent,
} from '@/components/solutions/mockups/decidim-types'

interface DecidimElectionPageMockupProps {
  copy?: DecidimMockupCopy
  figures: DecidimMockupFigures
  /** Accessible name of the picture; pass the figure caption. */
  label?: string
  className?: string
}

/**
 * The election's own page in the organization's Decidim, as a member or an
 * auditor sees it after close: the site's header and breadcrumb bar, the voting
 * window flash, the title with its decorator, and the Results section with its
 * percent bars, the one place the count is readable without touching the admin.
 */
export function DecidimElectionPageMockup({ copy, figures, label, className }: DecidimElectionPageMockupProps) {
  const { t, i18n } = useTranslation()
  if (!copy) return null

  const number = new Intl.NumberFormat(i18n.language)
  const question = copy.questions[0]
  const counts = figures.results[0] ?? []
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
            <DecidimVotingWindow start={figures.start} end={figures.end} />
            <div>
              <p className='text-[1.9em] leading-tight font-bold text-balance'>{copy.title}</p>
              <DecidimDecorator />
            </div>
            <p className='text-decidim-ink-soft truncate text-[1em]'>{copy.description}</p>

            <DecidimSectionTitle icon={ChartColumnIcon}>
              {t('solutions.mockups.decidim.results', 'Results')}
            </DecidimSectionTitle>
            <p className='-mt-[0.5em] truncate text-[0.85em]'>
              {t(
                'solutions.mockups.decidim.results_subtitle_after_end',
                'The election has ended. You can now see the results.'
              )}
            </p>
            {question && (
              <DecidimAccordion title={question.title} open>
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
              </DecidimAccordion>
            )}
            {copy.questions[1] && <DecidimAccordion title={copy.questions[1].title} open={false} />}
          </div>

          {/* The Vote column of the voting-open page, left empty: the results keep the
              width the questions have while voting is open. */}
          <div aria-hidden className='w-[26%] shrink-0' />
        </div>
      </div>
    </AppMockupFrame>
  )
}

function Sep() {
  return <ChevronRightIcon className='size-[1em] shrink-0 opacity-80' />
}

export default DecidimElectionPageMockup
