import { CheckIcon, GlobeIcon, MenuIcon, SearchIcon, UserIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

/**
 * Small pieces shared by the Decidim screens, each a copy of one Decidim
 * pattern measured on a live instance: the `.label` chip, the admin `.card`,
 * the `.button` in its filled and outlined forms, the results' `.percent-bar`,
 * and the voting page's trail, choice card and field as `vote.css` draws them.
 * Sized in `em` so they scale with the frame.
 */

type LabelTone = 'success' | 'neutral' | 'warning'

const LABEL_TONE: Record<LabelTone, string> = {
  success: 'bg-decidim-success-fill text-decidim-success',
  neutral: 'bg-decidim-panel text-decidim-ink-soft',
  warning: 'bg-decidim-warning-fill text-decidim-warning',
}

/** Decidim's `.label`: a 4px-radius chip whose text is the AA-safe variant of its fill. */
export function DecidimLabel({
  tone,
  className,
  children,
}: {
  tone: LabelTone
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-[0.3em] px-[0.6em] py-[0.3em] text-[0.8em] leading-none font-semibold whitespace-nowrap',
        LABEL_TONE[tone],
        className
      )}
    >
      {children}
    </span>
  )
}

/** The admin's `.button__sm`: `button__secondary` filled, `button__transparent-secondary` outlined. */
export function DecidimAdminButton({
  variant = 'filled',
  icon,
  className,
  children,
}: {
  variant?: 'filled' | 'outline'
  icon?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'flex h-[2.2em] shrink-0 items-center justify-center gap-[0.4em] rounded-[0.3em] border px-[0.9em] text-[0.8em] font-semibold whitespace-nowrap',
        variant === 'filled'
          ? 'bg-decidim-admin-accent border-decidim-admin-accent text-white'
          : 'bg-decidim-page border-decidim-admin-accent text-decidim-admin-accent',
        className
      )}
    >
      {icon}
      <span className='truncate'>{children}</span>
    </span>
  )
}

type ButtonVariant = 'filled' | 'outline' | 'brand' | 'quiet'

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  /** `.button__secondary` on the election page: the organization's secondary as a fill. */
  filled: 'bg-decidim-secondary border-decidim-secondary text-white',
  outline: 'bg-decidim-page border-decidim-secondary text-decidim-secondary',
  /** The voting page's primary action: the brand as a fill, near-black text on it. */
  brand: 'bg-decidim-primary border-decidim-primary text-decidim-primary-ink',
  /** The voting page's way back: a box, an edge and text. */
  quiet: 'bg-decidim-page border-decidim-edge text-decidim-ink',
}

/** A public or voting-page `.button`: `lg` is the election page's "Vote", `sm` a row action. */
export function DecidimButton({
  variant = 'filled',
  size = 'lg',
  className,
  children,
}: {
  variant?: ButtonVariant
  size?: 'lg' | 'sm'
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center gap-[0.5em] rounded-[0.3em] border font-semibold whitespace-nowrap',
        size === 'lg' ? 'h-[2.7em] px-[1.3em] text-[1em]' : 'h-[2.2em] px-[0.9em] text-[0.8em]',
        BUTTON_VARIANT[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

/** The admin `.card`: a 1px border, 4px radius, and a divider carrying the title in bold. */
export function DecidimCard({
  title,
  action,
  className,
  children,
}: {
  title: string
  action?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('border-decidim-admin-border bg-decidim-page flex flex-col rounded-[0.3em] border', className)}>
      <div className='flex shrink-0 items-center justify-between gap-[1em] px-[1em] pt-[0.5em] pb-[0.25em]'>
        <p className='truncate text-[0.95em] leading-snug font-bold'>{title}</p>
        {action}
      </div>
      <div className='min-h-0 px-[1em] pb-[0.5em]'>{children}</div>
    </div>
  )
}

/** The results' `.percent-bar`: a `gray-3` track with the secondary as its fill. */
export function DecidimPercentBar({ share, className }: { share: number; className?: string }) {
  return (
    <div className={cn('bg-decidim-rule h-[0.6em] w-full overflow-hidden rounded-[0.3em]', className)}>
      <div className='bg-decidim-secondary h-full rounded-[0.3em]' style={{ width: `${share}%` }} />
    </div>
  )
}

/** Decidim's `.decorator`: a short bar under the left edge of a title, the most recognisable thing about a Decidim page. */
export function DecidimDecorator({ className }: { className?: string }) {
  return (
    <span className={cn('bg-decidim-primary mt-[0.3em] block h-[0.28em] w-[2.6em] rounded-b-[0.3em]', className)} />
  )
}

/** The voting page's trail: four stages, markers over labels, a rail joining them, everything behind the voter filled in. */
export function DecidimTrail({ current }: { current: number }) {
  const { t } = useTranslation()
  const stages = [
    t('solutions.mockups.decidim.progress_identify', 'Identify'),
    t('solutions.mockups.decidim.progress_choose', 'Choose'),
    t('solutions.mockups.decidim.progress_review', 'Review'),
    t('solutions.mockups.decidim.progress_receipt', 'Receipt'),
  ]
  return (
    <ol className='grid grid-cols-4 text-[0.72em]'>
      {stages.map((stage, i) => {
        const done = i < current
        const active = i === current
        return (
          <li
            key={stage}
            className={cn(
              'relative flex flex-col items-center gap-[0.5em] text-center',
              active ? 'text-decidim-ink font-semibold' : done ? 'text-decidim-ink' : 'text-decidim-ink-soft'
            )}
          >
            {i > 0 && (
              <span
                className={cn(
                  'absolute top-[0.95em] left-[-50%] h-[2px] w-full',
                  done || active ? 'bg-decidim-success' : 'bg-decidim-edge'
                )}
              />
            )}
            <span
              className={cn(
                'relative flex size-[2em] items-center justify-center rounded-full border-2 text-[0.9em] font-semibold tabular-nums',
                active && 'border-decidim-success bg-decidim-success text-decidim-success-fill',
                done && 'border-decidim-success bg-decidim-success-fill text-decidim-success',
                !active && !done && 'border-decidim-edge bg-decidim-page'
              )}
            >
              {i + 1}
            </span>
            <span className='leading-tight'>{stage}</span>
          </li>
        )
      })}
    </ol>
  )
}

/** A choice of the ballot: a card with its radio inside, the brand edge doubled plus a wash when selected. */
export function DecidimChoice({ label, selected = false }: { label: string; selected?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-[0.7em] rounded-[0.5em] border px-[0.9em] py-[0.7em] text-[0.95em]',
        selected
          ? 'border-decidim-primary bg-decidim-primary/8 shadow-[inset_0_0_0_1px_var(--decidim-primary)]'
          : 'border-decidim-edge bg-decidim-page'
      )}
    >
      <span
        className={cn(
          'flex size-[1.1em] shrink-0 items-center justify-center rounded-full border',
          selected ? 'border-decidim-primary' : 'border-decidim-ink-soft'
        )}
      >
        {selected && <span className='bg-decidim-primary size-[0.55em] rounded-full' />}
      </span>
      <span className='truncate'>{label}</span>
    </div>
  )
}

/** A filled-in field of the voting page's forms: a bold label over a bordered box. */
export function DecidimField({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col gap-[0.35em]'>
      <span className='text-[0.9em] font-semibold'>{label}</span>
      <span className='border-decidim-edge bg-decidim-field flex h-[2.5em] items-center truncate rounded-[0.3em] border px-[0.8em] text-[0.95em]'>
        {value}
      </span>
    </div>
  )
}

/** The voting page's top bar: the way back to the election, and the theme switch. */
export function DecidimVoteTopbar() {
  const { t } = useTranslation()
  return (
    <div className='border-decidim-rule flex items-center justify-between gap-[1em] border-b px-[1.1em] py-[0.6em] text-[0.78em]'>
      <span className='truncate'>{t('solutions.mockups.decidim.back_to_election', 'Back to the election')}</span>
      <span className='text-decidim-ink-soft flex shrink-0 items-center gap-[0.5em] font-semibold'>
        {t('solutions.mockups.decidim.dark_theme', 'Dark theme')}
        <span className='bg-decidim-muted shadow-[inset_0_0_0_1px_var(--decidim-edge)] relative inline-block h-[1.3em] w-[2.3em] rounded-full'>
          <span className='bg-decidim-ink-soft absolute top-[0.2em] left-[0.2em] size-[0.9em] rounded-full' />
        </span>
      </span>
    </div>
  )
}

/** The voting page's `.vocdoni-note`: a quiet reassurance, the brand on a bar over a grey fill. */
export function DecidimNote({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn(
        'bg-decidim-panel border-decidim-primary text-decidim-ink-soft border-l-[0.3em] px-[0.8em] py-[0.6em] text-[0.75em] leading-snug',
        className
      )}
    >
      {children}
    </p>
  )
}

/** The success mark over the receipt: Decidim's `.label.success` pair, as a seal. */
export function DecidimSeal() {
  return (
    <span className='bg-decidim-success-fill text-decidim-success flex size-[2.2em] shrink-0 items-center justify-center rounded-full'>
      <CheckIcon className='size-[1.2em]' strokeWidth={3} />
    </span>
  )
}

/** Decidim's mark, as its admin sidebar draws it: two bars and a dot. */
export function DecidimMark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-end gap-[0.16em]', className)}>
      <span className='h-[0.75em] w-[0.38em] rounded-[0.12em] bg-current' />
      <span className='h-[1.15em] w-[0.38em] rounded-[0.12em] bg-current' />
      <span className='size-[0.38em] rounded-full bg-current' />
    </span>
  )
}

/**
 * The public site's header: the organization's name on the left and, on a
 * desktop, the search box, the language chooser, the account and the menu.
 * On a phone, the name and the menu.
 */
export function DecidimHeader({ organization, compact = false }: { organization: string; compact?: boolean }) {
  const { i18n } = useTranslation()
  return (
    <div className='flex shrink-0 items-center justify-between gap-[1em] px-[1.1em] py-[0.7em]'>
      <span className='truncate text-[0.95em] font-semibold underline underline-offset-2'>{organization}</span>
      <span className='text-decidim-secondary flex shrink-0 items-center gap-[1em]'>
        {!compact && (
          <>
            <span className='bg-decidim-panel border-decidim-rule text-decidim-ink-soft flex h-[2em] w-[9em] items-center justify-between rounded-[0.3em] border px-[0.7em]'>
              <span className='bg-decidim-rule h-[0.5em] w-[3em] rounded-full' />
              <SearchIcon className='size-[1em]' />
            </span>
            <span className='border-decidim-rule text-decidim-ink flex h-[2em] items-center gap-[0.4em] rounded-[0.3em] border px-[0.7em] text-[0.8em] uppercase'>
              <GlobeIcon className='size-[1.1em]' />
              {i18n.language.slice(0, 2)}
            </span>
            <UserIcon className='size-[1.2em]' />
          </>
        )}
        <MenuIcon className='size-[1.3em]' />
      </span>
    </div>
  )
}

/** The bar under the header, in the organization's primary colour, holding the breadcrumb. */
export function DecidimMenuBar({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'bg-decidim-primary flex shrink-0 items-center gap-[0.6em] px-[1.1em] py-[0.6em] text-[0.8em] font-semibold text-white',
        className
      )}
    >
      {children}
    </div>
  )
}

/** The neutral `.flash` of the election page: a left bar in the secondary over a faint wash of it. */
export function DecidimFlash({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div
      className={cn(
        'bg-decidim-secondary/5 border-decidim-secondary flex flex-col gap-[0.2em] border-l-[0.3em] px-[1.1em] py-[0.7em] text-[0.85em]',
        className
      )}
    >
      {lines.map((line) => (
        <span key={line} className='truncate'>
          {line}
        </span>
      ))}
    </div>
  )
}
