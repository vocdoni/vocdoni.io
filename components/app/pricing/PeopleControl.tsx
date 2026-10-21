'use client'

import { MinusIcon, PlusIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { QUOTE_REQUIRED_ABOVE } from '@/lib/pricing/constants'
import { formatCurrency, formatPeople } from '@/lib/pricing/format'
import { LADDER, bandEdgeIndexes, nextBandEdgeIndex, votersAtLadderIndex } from '@/lib/pricing/ladder'

import type { PricingEstimateState } from './usePricingEstimate'

interface PeopleControlProps {
  state: PricingEstimateState
  locale: string
}

/**
 * Voter values shown as tick marks. These are the band-edge stops from LADDER.
 * The last entry (50000) renders as "50,000+" at the right end.
 */
const TICK_VOTER_VALUES = [50, 100, 500, 1000, 5000, 15000, 50000] as const
/** Voter values visible only on sm and above (others are hidden below sm). */
const TICK_VISIBLE_MOBILE = new Set([50, 1000, 15000, 50000])

export function PeopleControl({ state, locale }: PeopleControlProps) {
  const { t } = useTranslation()
  const { estimate, ladderIndex, setVoters, setLadderIndex, stepUp, stepDown } = state
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState(() => formatPeople(state.voters, locale))

  // Sync the displayed value when voters change from outside (slider / stepper), but not while the
  // user is actively typing.
  useEffect(() => {
    if (!isFocused) {
      setInputValue(formatPeople(state.voters, locale))
    }
  }, [state.voters, locale, isFocused])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setInputValue(raw)
    setVoters(raw, 'input')
  }

  const handleInputBlur = () => {
    setIsFocused(false)
    // Re-render the formatted count from the current (possibly unchanged) voters value.
    setInputValue(formatPeople(state.voters, locale))
  }

  const handleInputFocus = () => {
    setIsFocused(true)
  }

  // aria-valuetext from the current estimate.
  const ariaValueText =
    estimate.zone === 'quote'
      ? t('pricing.calculator.slider_value_quote', 'More than {{limit}} people, on request', {
          limit: formatPeople(QUOTE_REQUIRED_ABOVE, locale),
        })
      : estimate.totalThisVoteCents === 0
        ? t('pricing.calculator.slider_value_free', '{{people}} people, free', {
            people: formatPeople(state.voters, locale),
          })
        : t('pricing.calculator.slider_value', '{{people}} people, {{total}} plus VAT', {
            people: formatPeople(state.voters, locale),
            total: formatCurrency(estimate.totalThisVoteCents, locale),
          })

  const inputId = 'pricing-people-input'

  return (
    <div>
      {/* Label + input row */}
      <Label htmlFor={inputId} className='block text-base font-medium'>
        {t('pricing.calculator.people_label', 'How many people can vote?')}
      </Label>

      <div className='mt-3 flex items-center gap-3'>
        <Button
          variant='outline'
          size='icon'
          aria-label={t('pricing.calculator.decrease', 'Fewer people')}
          className='press-scale shrink-0'
          onClick={stepDown}
        >
          <MinusIcon size={16} />
        </Button>

        <input
          ref={inputRef}
          id={inputId}
          type='text'
          inputMode='numeric'
          autoComplete='off'
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className='h-11 w-[8.5rem] rounded-md border border-input bg-background text-center text-xl font-medium tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        />

        <Button
          variant='outline'
          size='icon'
          aria-label={t('pricing.calculator.increase', 'More people')}
          className='press-scale shrink-0'
          onClick={stepUp}
        >
          <PlusIcon size={16} />
        </Button>
      </div>

      {/* Slider */}
      <div className='mt-5'>
        <Slider
          min={0}
          max={LADDER.length - 1}
          step={1}
          value={[ladderIndex]}
          onValueChange={([i]) => setLadderIndex(i)}
          aria-label={t('pricing.calculator.slider_label', 'How many people can vote')}
          aria-valuetext={ariaValueText}
          trackClassName='h-2 rounded-full bg-accent'
          rangeClassName='bg-primary'
          thumbClassName='size-5 rounded-full border border-border bg-background shadow-md transition-[box-shadow] duration-150 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'PageUp') {
              e.preventDefault()
              setLadderIndex(nextBandEdgeIndex(ladderIndex, 1))
            } else if (e.key === 'PageDown') {
              e.preventDefault()
              setLadderIndex(nextBandEdgeIndex(ladderIndex, -1))
            }
          }}
        />

        {/* Tick marks */}
        <div className='relative mt-2 h-4'>
          {bandEdgeIndexes.map((tickIndex, i) => {
            const voters = votersAtLadderIndex(tickIndex)
            const isLast = i === bandEdgeIndexes.length - 1
            const leftPercent = (tickIndex / (LADDER.length - 1)) * 100
            const mobileHidden = !TICK_VISIBLE_MOBILE.has(TICK_VOTER_VALUES[i])

            return (
              <div
                key={voters}
                className='absolute flex flex-col items-center'
                style={{ left: `${leftPercent}%`, transform: 'translateX(-50%)' }}
              >
                <div className='h-1 w-px bg-border' />
                <span
                  className={[
                    'mt-0.5 text-[11px] font-semibold uppercase tracking-wider tabular-nums text-faint',
                    mobileHidden ? 'hidden sm:block' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {isLast
                    ? t('pricing.calculator.tick_more', '{{limit}}+', {
                        limit: formatPeople(50000, locale),
                      })
                    : formatPeople(voters, locale)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Helper text */}
      <p className='mt-3 text-sm text-muted-foreground'>
        {t(
          'pricing.calculator.helper',
          'Might you add people to your list later? Count a few extra now, just in case.'
        )}
      </p>
    </div>
  )
}
