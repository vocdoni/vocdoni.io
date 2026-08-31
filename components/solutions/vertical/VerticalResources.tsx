import { ArrowRightIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { SectionHeader } from '@/components/SectionHeader'
import { VerticalPanel } from '@/components/solutions/vertical/VerticalPanel'
import { VerticalSection } from '@/components/solutions/vertical/VerticalSection'
import {
  asArray,
  type VerticalContent,
  type VerticalResourceItem,
  type VerticalResourceLink,
} from '@/components/solutions/vertical/types'

interface VerticalResourcesProps {
  resources: VerticalContent['resources']
  pageId: string
  /** Destinations, matched to `resources.items` by index. */
  links: VerticalResourceLink[]
}

/**
 * Deliberately below the closing CTA. Placed above it, a wall of outbound links
 * is an exit ramp built immediately before the ask; placed here it catches the
 * readers who were never going to convert on this visit, and still carries the
 * internal linking the segment needs.
 */
export function VerticalResources({ resources, pageId, links }: VerticalResourcesProps) {
  const items = asArray<VerticalResourceItem>(resources?.items)

  return (
    <VerticalSection sectionId='resources' pageId={pageId}>
      <Container className='max-w-5xl'>
        <SectionHeader size='section' eyebrow={resources?.eyebrow} title={resources?.title} lede={resources?.intro} />
        <ul className='mt-12 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3'>
          {items.map((item, index) => {
            const href = links[index]?.href
            if (!href) return null

            return (
              <li key={item.title}>
                <Link
                  href={href}
                  variant='unstyled'
                  className='group focus-visible:ring-ring rounded-card block h-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                >
                  <VerticalPanel
                    as='article'
                    surface='outline'
                    padding='md'
                    interactive
                    className='flex h-full flex-col gap-2'
                  >
                    <p className='text-primary text-xs font-semibold tracking-wider uppercase'>{item.kind}</p>
                    <h3 className='font-semibold text-balance'>{item.title}</h3>
                    <p className='text-muted-foreground text-sm leading-relaxed'>{item.description}</p>
                    <ArrowRightIcon
                      className='text-muted-foreground group-hover:text-primary mt-auto ml-auto size-4 transition-[color,transform] duration-200 group-hover:translate-x-0.5'
                      aria-hidden='true'
                    />
                  </VerticalPanel>
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </VerticalSection>
  )
}

export default VerticalResources
