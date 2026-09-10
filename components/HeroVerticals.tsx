import { ArrowRight } from 'lucide-react'
import type { TFunction } from 'i18next'
import { useId } from 'react'
import { useTranslation } from 'react-i18next'

import { Link } from '@/components/Link'
import { getSolutionVertical, type SolutionVerticalSlug } from '@/lib/solution-verticals'

/* The four verticals we lead with in the hero. Labels reuse the /solutions hub copy so the
   pills and the hub cards never drift apart (the navbar and footer still keep their own
   `navbar.solution_links.*` / `footer.solutions.*` keys). Keys stay literal on purpose:
   the dynamic-key guardrail rejects computed ones. */
const buildHeroVerticals = (t: TFunction): { slug: SolutionVerticalSlug; label: string }[] => [
  {
    slug: 'professional_associations',
    label: t('solutions_index.cards.professional_associations.title', 'Professional associations'),
  },
  { slug: 'associations', label: t('solutions_index.cards.associations.title', 'Associations & federations') },
  { slug: 'political_parties', label: t('solutions_index.cards.political_parties.title', 'Political parties') },
  { slug: 'municipalities', label: t('solutions_index.cards.municipalities.title', 'City councils') },
]

const HeroVerticals = () => {
  const { t } = useTranslation()
  const labelId = useId()

  return (
    <nav aria-labelledby={labelId} className='w-full'>
      <p id={labelId} className='mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
        {t('hero.verticals_label', 'Built for')}
      </p>
      <ul className='flex flex-wrap items-center gap-2'>
        {buildHeroVerticals(t).map(({ slug, label }) => {
          const vertical = getSolutionVertical(slug)
          const Icon = vertical.icon

          return (
            <li key={slug}>
              <Link href={vertical.href} variant='pill'>
                <Icon className='size-3.5 text-muted-foreground' aria-hidden='true' />
                {label}
              </Link>
            </li>
          )
        })}
        <li>
          <Link
            href='/solutions'
            variant='unstyled'
            className='group inline-flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            {t('hero.all_solutions', 'All solutions')}
            <ArrowRight
              className='size-3.5 transition-transform duration-200 group-hover:translate-x-0.5'
              aria-hidden='true'
            />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default HeroVerticals
