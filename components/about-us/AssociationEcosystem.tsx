import { AppWindow, Handshake, Landmark, Layers, Puzzle, Users, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

interface TierProps {
  icon: LucideIcon
  title: string
  description?: string
  emphasis?: boolean
  className?: string
}

/** One box in the diagram: icon, name, and an optional one-line role. */
const Tier = ({ icon: Icon, title, description, emphasis = false, className }: TierProps) => (
  <div
    className={cn(
      'flex items-center gap-4 rounded-card border p-5 text-left',
      emphasis ? 'border-primary/25 bg-primary/5' : 'bg-background shadow-sm',
      className
    )}
  >
    <span className='bg-primary/10 text-primary inline-flex size-11 shrink-0 items-center justify-center rounded-lg'>
      <Icon className='size-5' aria-hidden='true' />
    </span>
    <span className='flex flex-col gap-1'>
      <span className='font-semibold leading-snug'>{title}</span>
      {description && <span className='text-muted-foreground text-sm leading-relaxed'>{description}</span>}
    </span>
  </div>
)

/** Vertical hairline between tiers. Decorative: the list order already carries the meaning. */
const Connector = ({ className }: { className?: string }) => (
  <span aria-hidden='true' className={cn('mx-auto block h-8 w-px bg-foreground/20', className)} />
)

const RAIL = 'absolute right-[16.67%] left-[16.67%] hidden h-px bg-foreground/20 sm:block'
const STUB = 'absolute left-1/2 hidden h-6 w-px bg-foreground/20 sm:block'

/**
 * Conceptual map of who does what around the protocol: the Association safeguards it, the
 * ecosystem builds on it, organizations use what the ecosystem builds. Plain cards and
 * hairlines, so it stacks on a phone and needs no diagramming dependency. The caption says
 * outright that it is not a technical architecture.
 */
export function AssociationEcosystem() {
  const { t } = useTranslation()

  const branches = [
    {
      icon: AppWindow,
      title: t('about_us.association.ecosystem.diagram.applications', 'Applications'),
      description: t(
        'about_us.association.ecosystem.diagram.applications_description',
        'Voting tools built on the protocol'
      ),
    },
    {
      icon: Puzzle,
      title: t('about_us.association.ecosystem.diagram.integrations', 'Integrations'),
      description: t(
        'about_us.association.ecosystem.diagram.integrations_description',
        'Voting inside existing platforms'
      ),
    },
    {
      icon: Handshake,
      title: t('about_us.association.ecosystem.diagram.services', 'Services'),
      description: t(
        'about_us.association.ecosystem.diagram.services_description',
        'Managed elections and professional support'
      ),
    },
  ]

  return (
    <figure className='mx-auto w-full max-w-3xl'>
      <ol className='flex flex-col'>
        <li>
          <Tier
            icon={Landmark}
            title={t('about_us.association.ecosystem.diagram.association_title', 'Vocdoni Association')}
            description={t(
              'about_us.association.ecosystem.diagram.association_description',
              "Looks after the protocol's mission"
            )}
            className='mx-auto max-w-md'
          />
          <Connector />
        </li>
        <li>
          <Tier
            emphasis
            icon={Layers}
            title={t('about_us.association.ecosystem.diagram.protocol_title', 'Open Vocdoni protocol')}
            description={t(
              'about_us.association.ecosystem.diagram.protocol_description',
              'Shared, open technical foundations'
            )}
            className='mx-auto max-w-md'
          />
          <Connector />
        </li>
        <li>
          {/* Two horizontal rails fan the protocol out to the three branches and gather them
              back, from the first centre to the last. On a phone the branches stack instead,
              joined by the same vertical connector as the other tiers. */}
          <div className='relative'>
            <span aria-hidden='true' className={cn(RAIL, 'top-0')} />
            <span aria-hidden='true' className={cn(RAIL, 'bottom-0')} />
            <ul className='grid sm:grid-cols-3 sm:gap-4 sm:py-6'>
              {branches.map((branch, index) => (
                <li key={branch.title} className='relative'>
                  {index > 0 && <Connector className='sm:hidden' />}
                  <span aria-hidden='true' className={cn(STUB, '-top-6')} />
                  <span aria-hidden='true' className={cn(STUB, '-bottom-6')} />
                  <Tier
                    icon={branch.icon}
                    title={branch.title}
                    description={branch.description}
                    className='sm:h-full sm:flex-col sm:items-start sm:gap-3'
                  />
                </li>
              ))}
            </ul>
          </div>
          <Connector />
        </li>
        <li>
          <Tier
            icon={Users}
            title={t('about_us.association.ecosystem.diagram.communities', 'Organizations and communities')}
            description={t(
              'about_us.association.ecosystem.diagram.communities_description',
              'Run their votes on what the ecosystem builds'
            )}
            className='mx-auto max-w-md'
          />
        </li>
      </ol>
      <figcaption className='text-muted-foreground mt-6 text-center text-sm'>
        {t(
          'about_us.association.ecosystem.diagram.caption',
          'A conceptual view of roles around the protocol, not a diagram of its technical architecture.'
        )}
      </figcaption>
    </figure>
  )
}

export default AssociationEcosystem
